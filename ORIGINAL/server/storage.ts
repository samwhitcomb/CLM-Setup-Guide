import { users, devices, type User, type InsertUser, type Device, type InsertDevice } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

// Storage interface
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser & { trialStartDate?: Date; trialEndDate?: Date; trialActive?: boolean }): Promise<User>;
  updateUserStep(userId: number, currentStep: number): Promise<User>;
  updateUserSubscription(userId: number, paymentAdded: boolean): Promise<User>;
  
  // Device operations
  createDevice(device: InsertDevice): Promise<Device>;
  getDevice(id: number): Promise<Device | undefined>;
  getDevicesByUserId(userId: number): Promise<Device[]>;
  updateDevice(id: number, updates: Partial<Device>): Promise<Device>;
  
  // Session store
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private devices: Map<number, Device>;
  currentUserId: number;
  currentDeviceId: number;
  sessionStore: session.SessionStore;

  constructor() {
    this.users = new Map();
    this.devices = new Map();
    this.currentUserId = 1;
    this.currentDeviceId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // 24 hours
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser & { trialStartDate?: Date; trialEndDate?: Date; trialActive?: boolean }): Promise<User> {
    const id = this.currentUserId++;
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id, 
      currentStep: 1,
      trialActive: insertUser.trialActive ?? true,
      trialStartDate: insertUser.trialStartDate ?? now,
      trialEndDate: insertUser.trialEndDate ?? new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
      paymentAdded: false,
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserStep(userId: number, currentStep: number): Promise<User> {
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error("User not found");
    }
    
    const updatedUser = { ...user, currentStep };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  async updateUserSubscription(userId: number, paymentAdded: boolean): Promise<User> {
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error("User not found");
    }
    
    const updatedUser = { ...user, paymentAdded };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  // Device methods
  async createDevice(insertDevice: InsertDevice): Promise<Device> {
    const id = this.currentDeviceId++;
    const device: Device = { 
      ...insertDevice, 
      id,
      connected: false,
      calibrated: false,
    };
    this.devices.set(id, device);
    return device;
  }

  async getDevice(id: number): Promise<Device | undefined> {
    return this.devices.get(id);
  }

  async getDevicesByUserId(userId: number): Promise<Device[]> {
    return Array.from(this.devices.values()).filter(
      (device) => device.userId === userId,
    );
  }

  async updateDevice(id: number, updates: Partial<Device>): Promise<Device> {
    const device = await this.getDevice(id);
    if (!device) {
      throw new Error("Device not found");
    }
    
    const updatedDevice = { ...device, ...updates };
    this.devices.set(id, updatedDevice);
    return updatedDevice;
  }
}

export const storage = new MemStorage();

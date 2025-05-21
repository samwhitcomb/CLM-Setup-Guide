import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name"),
  receiveUpdates: boolean("receive_updates").default(false),
  currentStep: integer("current_step").default(1),
  trialActive: boolean("trial_active").default(true),
  trialStartDate: timestamp("trial_start_date"),
  trialEndDate: timestamp("trial_end_date"),
  paymentAdded: boolean("payment_added").default(false),
});

export const devices = pgTable("devices", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  deviceName: text("device_name"),
  deviceId: text("device_id").notNull().unique(),
  firmwareVersion: text("firmware_version"),
  connected: boolean("connected").default(false),
  calibrated: boolean("calibrated").default(false),
  ceilingHeight: text("ceiling_height"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
  receiveUpdates: true,
});

export const loginUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const insertDeviceSchema = createInsertSchema(devices).pick({
  userId: true,
  deviceName: true,
  deviceId: true,
  firmwareVersion: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginUser = z.infer<typeof loginUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertDevice = z.infer<typeof insertDeviceSchema>;
export type Device = typeof devices.$inferSelect;

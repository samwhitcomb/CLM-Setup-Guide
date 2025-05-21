import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes (/api/register, /api/login, /api/logout, /api/user)
  setupAuth(app);

  // Device routes
  app.post("/api/devices", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const device = await storage.createDevice({
        ...req.body,
        userId: req.user.id,
      });
      res.status(201).json(device);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  });

  app.get("/api/devices", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const devices = await storage.getDevicesByUserId(req.user.id);
      res.json(devices);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  });

  app.put("/api/devices/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const deviceId = parseInt(req.params.id);
      const device = await storage.updateDevice(deviceId, req.body);
      res.json(device);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  });

  // User progress/onboarding routes
  app.put("/api/user/step", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const { currentStep } = req.body;
      const user = await storage.updateUserStep(req.user.id, currentStep);
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  });

  app.put("/api/user/subscription", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const { paymentAdded } = req.body;
      const user = await storage.updateUserSubscription(req.user.id, paymentAdded);
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

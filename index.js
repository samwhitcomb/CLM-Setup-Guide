// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/auth.ts
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session2 from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";

// server/storage.ts
import session from "express-session";
import createMemoryStore from "memorystore";
var MemoryStore = createMemoryStore(session);
var MemStorage = class {
  users;
  devices;
  currentUserId;
  currentDeviceId;
  sessionStore;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.devices = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentDeviceId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 864e5
      // 24 hours
    });
  }
  // User methods
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async getUserByEmail(email) {
    return Array.from(this.users.values()).find(
      (user) => user.email === email
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const now = /* @__PURE__ */ new Date();
    const user = {
      ...insertUser,
      id,
      currentStep: 1,
      trialActive: insertUser.trialActive ?? true,
      trialStartDate: insertUser.trialStartDate ?? now,
      trialEndDate: insertUser.trialEndDate ?? new Date(now.getTime() + 30 * 24 * 60 * 60 * 1e3),
      paymentAdded: false
    };
    this.users.set(id, user);
    return user;
  }
  async updateUserStep(userId, currentStep) {
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const updatedUser = { ...user, currentStep };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }
  async updateUserSubscription(userId, paymentAdded) {
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const updatedUser = { ...user, paymentAdded };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }
  // Device methods
  async createDevice(insertDevice) {
    const id = this.currentDeviceId++;
    const device = {
      ...insertDevice,
      id,
      connected: false,
      calibrated: false
    };
    this.devices.set(id, device);
    return device;
  }
  async getDevice(id) {
    return this.devices.get(id);
  }
  async getDevicesByUserId(userId) {
    return Array.from(this.devices.values()).filter(
      (device) => device.userId === userId
    );
  }
  async updateDevice(id, updates) {
    const device = await this.getDevice(id);
    if (!device) {
      throw new Error("Device not found");
    }
    const updatedDevice = { ...device, ...updates };
    this.devices.set(id, updatedDevice);
    return updatedDevice;
  }
};
var storage = new MemStorage();

// server/auth.ts
var scryptAsync = promisify(scrypt);
async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}
async function comparePasswords(supplied, stored) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = await scryptAsync(supplied, salt, 64);
  return timingSafeEqual(hashedBuf, suppliedBuf);
}
function setupAuth(app2) {
  const sessionSettings = {
    secret: process.env.SESSION_SECRET || "golf-track-pro-secret",
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1e3
      // 30 days
    }
  };
  app2.set("trust proxy", 1);
  app2.use(session2(sessionSettings));
  app2.use(passport.initialize());
  app2.use(passport.session());
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !await comparePasswords(password, user.password)) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    })
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
  app2.post("/api/register", async (req, res, next) => {
    try {
      const existingUser = await storage.getUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      const emailUser = await storage.getUserByEmail(req.body.email);
      if (emailUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
      const now = /* @__PURE__ */ new Date();
      const trialEndDate = new Date(now);
      trialEndDate.setDate(now.getDate() + 30);
      const user = await storage.createUser({
        ...req.body,
        password: await hashPassword(req.body.password),
        trialStartDate: now,
        trialEndDate,
        trialActive: true
      });
      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json(user);
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app2.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: "Invalid username or password" });
      req.login(user, (err2) => {
        if (err2) return next(err2);
        return res.status(200).json(user);
      });
    })(req, res, next);
  });
  app2.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });
  app2.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json(req.user);
  });
}

// server/routes.ts
async function registerRoutes(app2) {
  setupAuth(app2);
  app2.post("/api/devices", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const device = await storage.createDevice({
        ...req.body,
        userId: req.user.id
      });
      res.status(201).json(device);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  app2.get("/api/devices", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const devices = await storage.getDevicesByUserId(req.user.id);
      res.json(devices);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app2.put("/api/devices/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const deviceId = parseInt(req.params.id);
      const device = await storage.updateDevice(deviceId, req.body);
      res.json(device);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  app2.put("/api/user/step", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const { currentStep } = req.body;
      const user = await storage.updateUserStep(req.user.id, currentStep);
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  app2.put("/api/user/subscription", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const { paymentAdded } = req.body;
      const user = await storage.updateUserSubscription(req.user.id, paymentAdded);
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __dirname = path.dirname(fileURLToPath(import.meta.url));
var vite_config_default = defineConfig({
  base: "/CLM-Setup-Guide/",
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    host: "0.0.0.0",
    port: 3e3,
    strictPort: true,
    cors: true,
    hmr: {
      clientPort: 443
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
import { fileURLToPath as fileURLToPath2 } from "url";
var __dirname2 = path2.dirname(fileURLToPath2(import.meta.url));
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 3e3;
  server.listen(port, () => {
    log(`serving on port ${port}`);
  });
})();

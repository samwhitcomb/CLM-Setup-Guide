import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Mock login function
const mockLogin = async (credentials) => {
  console.log('Mock login with credentials:', credentials);
  // Simulate a successful login response
  return {
    user: {
      username: credentials.username,
      fullName: 'Mock User',
    },
    token: 'mock-token',
  };
};

// Mock register function
const mockRegister = async (credentials) => {
  console.log('Mock register with credentials:', credentials);
  // Simulate a successful registration response
  return {
    user: {
      username: credentials.username,
      fullName: credentials.fullName,
    },
    token: 'mock-token',
  };
};

// Usage in your application
const login = async (credentials) => {
  return mockLogin(credentials);
};

const register = async (credentials) => {
  return mockRegister(credentials);
};

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  base: "/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      input: path.resolve(__dirname, 'client/index.html'),
      output: {
        manualChunks: undefined,
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash].[ext]",
      },
    },
  },
  server: {
    port: 3000,
    host: true,
    cors: true,
    hmr: {
      clientPort: 443,
    }
  }
});

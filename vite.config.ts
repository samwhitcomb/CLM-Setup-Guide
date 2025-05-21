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
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  base: '/CLM-Setup-Guide/',
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    cors: true,
    hmr: {
      clientPort: 443,
    }
  }
});

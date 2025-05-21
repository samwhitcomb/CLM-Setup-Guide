import { createContext, useContext, useState, ReactNode } from "react";
import { User, login as mockLogin, register as mockRegister } from "@/lib/mockAuth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: { username: string; password: string; fullName?: string; email?: string }) => Promise<void>;
  register: (credentials: { username: string; email: string; password: string; fullName: string; receiveUpdates?: boolean }) => Promise<void>;
  logout: () => void;
  loginMutation: (credentials: { username: string; password: string; fullName?: string; email?: string }) => Promise<void>;
  registerMutation: (credentials: { username: string; email: string; password: string; fullName: string; receiveUpdates?: boolean }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials: { username: string; password: string; fullName?: string; email?: string }) => {
    setIsLoading(true);
    try {
      // Add a default email if not provided
      const loginData = {
        ...credentials,
        email: credentials.email || `${credentials.username}@example.com`, // Default email if not provided
        fullName: credentials.fullName || 'User' // Default fullName if not provided
      };
      
      // Use the mock login function from mockAuth.ts
      const result = await mockLogin(loginData);
      setUser(result.user);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: { username: string; email: string; password: string; fullName: string; receiveUpdates?: boolean }) => {
    setIsLoading(true);
    try {
      // Use the mock register function from mockAuth.ts
      const result = await mockRegister(credentials);
      setUser(result.user);
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  // Alias methods for compatibility with existing code
  const loginMutation = login;
  const registerMutation = register;

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, loginMutation, registerMutation }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

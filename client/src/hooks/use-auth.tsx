import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  currentStep?: number;
  paymentAdded?: boolean;
  trialActive?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: { username: string; password: string; fullName: string }) => Promise<void>;
  register: (credentials: { username: string; password: string; fullName: string }) => Promise<void>;
  logout: () => void;
  loginMutation: (credentials: { username: string; password: string; fullName: string }) => Promise<void>;
  registerMutation: (credentials: { username: string; password: string; fullName: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials: { username: string; password: string; fullName: string }) => {
    setIsLoading(true);
    try {
      // Mock login - in a real app, this would make an API call
      setUser({
        id: Math.random().toString(36).substr(2, 9),
        username: credentials.username,
        email: `${credentials.username}@example.com`,
        fullName: credentials.fullName,
        currentStep: 0,
        paymentAdded: false,
        trialActive: true
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: { username: string; password: string; fullName: string }) => {
    setIsLoading(true);
    try {
      // Mock registration - in a real app, this would make an API call
      setUser({
        id: Math.random().toString(36).substr(2, 9),
        username: credentials.username,
        email: `${credentials.username}@example.com`,
        fullName: credentials.fullName,
        currentStep: 0,
        paymentAdded: false,
        trialActive: true
      });
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

import { createContext, ReactNode, useContext, useState } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { mockLogin, mockRegister, mockLogout, type User, type LoginCredentials, type RegisterCredentials } from "@/lib/mockAuth";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: {
    mutate: (credentials: LoginCredentials) => void;
    isLoading: boolean;
  };
  logoutMutation: {
    mutate: () => void;
    isLoading: boolean;
  };
  registerMutation: {
    mutate: (credentials: RegisterCredentials) => void;
    isLoading: boolean;
  };
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loginMutation = {
    mutate: async (credentials: LoginCredentials) => {
      setIsLoading(true);
      try {
        const user = await mockLogin(credentials);
        setUser(user);
        toast({
          title: "Login successful",
          description: `Welcome back, ${user.fullName || user.username}!`,
        });
        navigate("/onboarding");
      } catch (error) {
        toast({
          title: "Login failed",
          description: error instanceof Error ? error.message : "An error occurred",
          variant: "destructive",
        });
        setError(error instanceof Error ? error : new Error("An error occurred"));
      } finally {
        setIsLoading(false);
      }
    },
    isLoading: false,
  };

  const registerMutation = {
    mutate: async (credentials: RegisterCredentials) => {
      setIsLoading(true);
      try {
        const user = await mockRegister(credentials);
        setUser(user);
        toast({
          title: "Registration successful",
          description: `Welcome, ${user.fullName || user.username}!`,
        });
        navigate("/onboarding");
      } catch (error) {
        toast({
          title: "Registration failed",
          description: error instanceof Error ? error.message : "An error occurred",
          variant: "destructive",
        });
        setError(error instanceof Error ? error : new Error("An error occurred"));
      } finally {
        setIsLoading(false);
      }
    },
    isLoading: false,
  };

  const logoutMutation = {
    mutate: async () => {
      setIsLoading(true);
      try {
        await mockLogout();
        setUser(null);
        navigate("/auth");
      } catch (error) {
        toast({
          title: "Logout failed",
          description: error instanceof Error ? error.message : "An error occurred",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    isLoading: false,
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        loginMutation,
        logoutMutation,
        registerMutation,
      }}
    >
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

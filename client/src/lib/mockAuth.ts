// Types for authentication
export type LoginCredentials = {
  username: string;
  password: string;
  fullName?: string;
};

export type RegisterCredentials = {
  username: string;
  password: string;
  fullName: string;
  email: string;
  receiveUpdates?: boolean;
};

export type User = {
  id: string;
  username: string;
  fullName: string;
  email: string;
  currentStep?: number;
  paymentAdded?: boolean;
  trialActive?: boolean;
};

// Mock user data
const mockUser: User = {
  id: '1',
  username: 'demo_user',
  fullName: 'Demo User',
  email: 'demo@example.com',
  currentStep: 0,
  paymentAdded: false,
  trialActive: true,
};

// Mock authentication functions
export const mockLogin = async (credentials: LoginCredentials): Promise<{user: User, token: string}> => {
  console.log('Mock login with credentials:', credentials);
  return {
    user: {
      ...mockUser,
      username: credentials.username,
      fullName: credentials.fullName || 'Demo User',
    },
    token: 'mock-token',
  };
};

export const mockRegister = async (credentials: RegisterCredentials): Promise<{user: User, token: string}> => {
  console.log('Mock register with credentials:', credentials);
  return {
    user: {
      ...mockUser,
      username: credentials.username,
      fullName: credentials.fullName,
      email: credentials.email,
    },
    token: 'mock-token',
  };
};

// Simplified exports that can be used directly in components
export const login = async (credentials: LoginCredentials) => {
  return mockLogin(credentials);
};

export const register = async (credentials: RegisterCredentials) => {
  return mockRegister(credentials);
};

export const mockLogout = async (): Promise<void> => {
  console.log('Mock logout');
  return Promise.resolve();
}; 
// Types for authentication
export type LoginCredentials = {
  username: string;
  password: string;
};

export type RegisterCredentials = {
  username: string;
  password: string;
  email: string;
  fullName: string;
  receiveUpdates?: boolean;
};

export type User = {
  id: string;
  username: string;
  fullName: string;
  email: string;
  currentStep: number;
};

// Mock user data
const mockUser: User = {
  id: '1',
  username: 'demo_user',
  fullName: 'Demo User',
  email: 'demo@example.com',
  currentStep: 0,
};

// Mock authentication functions
export const mockLogin = async (credentials: LoginCredentials): Promise<User> => {
  console.log('Mock login with credentials:', credentials);
  return mockUser;
};

export const mockRegister = async (credentials: RegisterCredentials): Promise<User> => {
  console.log('Mock register with credentials:', credentials);
  return {
    ...mockUser,
    username: credentials.username,
    fullName: credentials.fullName,
    email: credentials.email,
  };
};

export const mockLogout = async (): Promise<void> => {
  console.log('Mock logout');
  return Promise.resolve();
}; 
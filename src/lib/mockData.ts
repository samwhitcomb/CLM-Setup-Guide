export const mockUser = {
  id: "1",
  email: "demo@example.com",
  name: "Demo User",
  role: "admin",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

export const mockAuth = {
  isAuthenticated: true,
  user: mockUser
};

// Add any other mock data needed for your application here 
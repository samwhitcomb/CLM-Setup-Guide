import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { mockUser, mockAuth } from './mockData';

// Base URL for API requests
const API_BASE_URL = window.location.hostname.includes('github.io')
  ? 'https://your-backend-url.com' // Replace with your actual backend URL
  : window.location.hostname.includes('ngrok-free.app')
    ? window.location.origin
    : '';

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Return mock data for API requests
  if (url === '/api/user') {
    return new Response(JSON.stringify(mockUser), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // For other API requests, return appropriate mock responses
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T = unknown>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const url = queryKey[0] as string;
    
    // Return mock data for user-related queries
    if (url === '/api/user') {
      return mockUser as T;
    }
    
    // For other queries, return appropriate mock data
    return { success: true } as T;
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

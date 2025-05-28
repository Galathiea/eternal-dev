// src/services/auth.ts

// Assuming your `api` is an axios instance configured with your base URL
// and potentially interceptors. If `api` is just `axios`, consider renaming
// it to `axiosInstance` or configuring a global interceptor for `axios`.
import { api } from '../config/api'; // This is your custom axios instance
import axios from 'axios'; // Only if needed for specific calls not using 'api'
import { API_URL } from '../config/api'; // Your base API URL

// --- Refined UserData Interface ---
// Ensure this matches the structure your Django backend sends for a user
export interface UserData {
  id: number;
  username: string;
  email: string;
  first_name?: string; // Add if your user model has these
  last_name?: string;  // Add if your user model has these
  profile_image?: string | null; // Use snake_case to match Django
  // Add any other user-specific fields that come from /api/users/me/ or login/register responses
}

// --- Combined AuthResponse Interface (remove duplicates) ---
// This defines what you expect back from /api/token/ and /api/users/register/
export interface AuthResponse {
  access: string;
  refresh: string;
  user: UserData; // Ensure the 'user' key exists and matches UserData
}

// --- Credentials Interfaces (keep as is, they look good) ---
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignupCredentials {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export const authService = {
  // --- LOGIN ---
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      console.log('Attempting login with credentials:', credentials);
      // Use your `api` instance as it should be configured for your backend
      const response = await api.post<AuthResponse>('/api/token/', credentials);
      console.log('Login response:', response.data);

      // --- FIX 1: Store access and refresh token ---
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      // --- FIX 2: Store the entire user object in localStorage ---
      localStorage.setItem('user_data', JSON.stringify(response.data.user)); // Store user data

      return response.data; // Return the full response data
    } catch (error: any) {
      console.error('Login error:', error);
      // Propagate the error so the calling component (AuthForm) can handle it
      throw error;
    }
  },

  // --- SIGNUP ---
  signup: async (credentials: SignupCredentials): Promise<AuthResponse> => {
    try {
      // It's usually better to use your configured `api` instance if possible
      // to ensure consistent base URL and interceptors.
      // Assuming your `/api/users/register/` endpoint returns a token upon successful registration
      const response = await api.post<AuthResponse>('/api/users/register/', credentials);
      
      // --- FIX 3: Store access and refresh token after signup ---
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      // --- FIX 4: Store the entire user object in localStorage after signup ---
      localStorage.setItem('user_data', JSON.stringify(response.data.user));

      return response.data;
    } catch (error: any) {
      console.error('Signup error:', error);
      // Propagate the error with a more specific message if available
      if (error.response && error.response.data && typeof error.response.data === 'object') {
          // If backend sends validation errors (e.g., {"username": ["exists"]})
          const errorMessages = Object.values(error.response.data).flat().join(' ');
          throw new Error(errorMessages || 'Registration failed');
      }
      throw new Error('Registration failed');
    }
  },

  // --- CHECK USER EXISTS (Looks fine as is) ---
  checkUserExists: async (email: string): Promise<boolean> => {
    try {
      // Use `api` for consistency if it's configured for authenticated requests
      // This endpoint probably needs authentication if it returns user data.
      const response = await api.get(`/api/users/`, {
        params: { email },
        // If `api` has an interceptor for tokens, you don't need this header here.
        // If not, keep it.
        // headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      return response.data.length > 0;
    } catch (error) {
      console.error('Check user error:', error);
      return false;
    }
  },

  // --- LOGOUT ---
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data'); // --- FIX 5: Remove stored user data on logout ---
    // Optional: Make an API call to blacklist tokens if your backend supports it
    // api.post('/api/token/blacklist/', { refresh: localStorage.getItem('refresh_token') });
  },

  // --- GET CURRENT USER ---
  getCurrentUser: async (): Promise<UserData | null> => {
    try {
      // This endpoint needs authentication. `api` should handle adding the token.
      const response = await api.get<UserData>('/api/users/me/');
      return response.data;
    } catch (error: any) {
      console.error('Failed to fetch current user (token likely invalid/expired):', error);
      // --- FIX 6: Call logout if getCurrentUser fails due to authentication issues ---
      // This will clear invalid tokens from localStorage and reset the frontend.
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        authService.logout(); // Clear tokens on error
      }
      return null;
    }
  },
};

// --- GLOBAL AXIOS INTERCEPTOR SETUP (CRUCIAL if `api` isn't already doing this) ---
// If `api` is just a simple `axios` import, and you don't have this interceptor
// configured elsewhere (e.g., in `../config/api.ts`), you need it.
// This ensures ALL requests made via `api` (or `axios` if you swap) have the token.

/*
// Example: If `api` is defined like this in `../config/api.ts`
// const api = axios.create({ baseURL: 'http://127.0.0.1:8000' });
// Then put the interceptor there:
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Response interceptor for automatic logout on 401/403
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Check for 401 (Unauthorized) or 403 (Forbidden)
    if (error.response && (error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loops
      // If you have refresh token logic, implement it here.
      // Otherwise, simply log out the user.
      console.warn("Authentication error (401/403). Logging out...");
      authService.logout();
      // Redirect to login page
      window.location.href = '/login'; // Or use navigate if this isn't top-level
    }
    return Promise.reject(error);
  }
);
*/

// **IMPORTANT:** Double-check your `../config/api.ts` to see if your `api` instance
// already has these interceptors. If it does, you don't need to put them here.
// If it doesn't, add them to `../config/api.ts` where `api` is created.
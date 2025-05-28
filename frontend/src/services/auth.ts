import { api } from '../config/api';

// --- User Data Interface ---
export interface UserData {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  profile_image?: string | null;
}

// --- Auth Response Interface ---
export interface AuthResponse {
  access: string;
  refresh: string;
  user: UserData;
}

// --- Credentials Interfaces ---
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

// --- Auth Service ---
export const authService = {
  // LOGIN
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/api/token/', credentials);
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      localStorage.setItem('user_data', JSON.stringify(response.data.user));
      return response.data;
    } catch (error: any) {
      // Provide a consistent error shape for AuthContext
      if (error.response && error.response.data && typeof error.response.data === 'object') {
        const detail = error.response.data.detail || Object.values(error.response.data).flat().join(' ');
        throw new Error(detail || 'Login failed');
      }
      throw new Error(error.message || 'Login failed');
    }
  },

  // SIGNUP
  signup: async (credentials: SignupCredentials): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/api/users/register/', credentials);
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      localStorage.setItem('user_data', JSON.stringify(response.data.user));
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data && typeof error.response.data === 'object') {
        const errorMessages = Object.values(error.response.data).flat().join(' ');
        throw new Error(errorMessages || 'Registration failed');
      }
      throw new Error('Registration failed');
    }
  },

  // CHECK USER EXISTS
  checkUserExists: async (email: string): Promise<boolean> => {
    try {
      const response = await api.get(`/api/users/`, { params: { email } });
      return response.data.length > 0;
    } catch (error) {
      return false;
    }
  },

  // LOGOUT
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('cart');
    // Optionally: api.post('/api/token/blacklist/', { refresh: localStorage.getItem('refresh_token') });
  },

  // GET CURRENT USER
  getCurrentUser: async (): Promise<UserData | null> => {
    try {
      const response = await api.get<UserData>('/api/users/me/');
      return response.data;
    } catch (error: any) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        authService.logout();
      }
      return null;
    }
  },
};
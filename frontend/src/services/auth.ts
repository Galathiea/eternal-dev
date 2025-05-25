import { api } from '../config/api';
import axios from 'axios';
import { API_URL } from '../config/api';

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

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      console.log('Attempting login with credentials:', credentials);
      const response = await api.post('/api/token/', credentials);
      console.log('Login response:', response.data);
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  },

  signup: async (credentials: SignupCredentials): Promise<AuthResponse> => {
    try {
      // Use raw axios for signup to avoid token auth
      const response = await axios.post(`${API_URL}/api/users/register/`, credentials);
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      return response.data;
    } catch (error: any) {
      console.error('Signup error:', error);
      if (error.response && error.response.data) {
        throw new Error(error.response.data.detail || 'Registration failed');
      }
      throw new Error('Registration failed');
    }
  },

  // Add a separate method for checking if a user exists
  checkUserExists: async (email: string): Promise<boolean> => {
    try {
      const response = await axios.get(`${API_URL}/api/users/`, {
        params: { email },
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      return response.data.length > 0;
    } catch (error) {
      console.error('Check user error:', error);
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
  },

  getCurrentUser: async (): Promise<any> => {
    try {
      const response = await api.get('/api/users/me/');
      return response.data;
    } catch (error) {
      return null;
    }
  },
};

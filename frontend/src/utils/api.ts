// C:\Users\Galathiea\Downloads\frontend-backup-main\src\utils\api.ts
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in authenticated requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authApi = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/users',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Export API endpoints
export const endpoints = {
  auth: {
    register: '/users/register/', // <-- CHANGE THIS LINE!
    login: '/login/',
  },
  users: '/users/',
  categories: '/categories/',
  recipes: '/recipes/',
  reviews: '/reviews/',
  cart: '/cart/',
};
// src/context/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'; // Add useCallback
import { authService, UserData, LoginCredentials, SignupCredentials } from '../services/auth';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface AuthContextType {
  user: UserData | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => void;
  loading: boolean;
  updateUser: (userData: UserData) => void;
  cart: CartItem[];
  cartCount: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateCartItem: (id: number, quantity: number) => void;
  clearCart: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Memoize checkAuth to prevent unnecessary re-creations
  const checkAuth = useCallback(async () => {
    setLoading(true); // Indicate that authentication check is in progress
    try {
      const storedUserData = localStorage.getItem('user_data');
      const storedToken = localStorage.getItem('token');

      let fetchedUser: UserData | null = null;

      if (storedToken) {
        // Essential: A small delay to ensure localStorage write from login is complete.
        // This addresses potential race conditions where interceptor reads before token is fully committed.
        await new Promise(resolve => setTimeout(resolve, 50));

        try {
          fetchedUser = await authService.getCurrentUser(); // This calls /api/users/me/
          if (fetchedUser) {
            setUser(fetchedUser);
            // If getCurrentUser succeeded, ensure user_data is updated in localStorage
            if (JSON.stringify(fetchedUser) !== storedUserData) {
                localStorage.setItem('user_data', JSON.stringify(fetchedUser));
            }
          } else {
            // Token likely invalid or expired, proceed to clear it
            authService.logout();
            setUser(null);
          }
        } catch (error) {
          console.error("Error fetching current user during initial auth check:", error);
          authService.logout(); // Clear tokens on fetch error
          setUser(null);
        }
      } else {
        // No token found, user is not authenticated
        setUser(null);
      }

      // Load cart from localStorage
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (e) {
          console.error("Failed to parse cart from localStorage:", e);
          localStorage.removeItem('cart'); // Clear corrupted cart data
          setCart([]);
        }
      }

    } catch (error) {
      console.error("Unexpected error in AuthProvider's checkAuth:", error);
      authService.logout(); // Ensure cleanup on any unexpected error
      setUser(null);
    } finally {
      setLoading(false); // Authentication check is complete
    }
  }, []); // Empty dependency array means this function is created once

  // Run checkAuth on component mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]); // Depend on memoized checkAuth

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!loading) { // Only save cart after initial loading is done
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, loading]);

  // Cart methods (no changes needed)
  const addToCart = useCallback((item: CartItem) => {
    setCart(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      if (existingItem) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i
        );
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateCartItem = useCallback((id: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Authentication methods
  const login = useCallback(async (credentials: LoginCredentials) => {
    const response = await authService.login(credentials);
    setUser(response.user); // Update user state immediately on successful login
    // The checkAuth useEffect will re-validate /api/users/me/ on subsequent renders/nav
    // or you could explicitly re-run checkAuth here if you prefer
    // checkAuth(); // Optional: Re-run checkAuth after login, but careful with loops
  }, []);

  const signup = useCallback(async (credentials: SignupCredentials) => {
    const response = await authService.signup(credentials);
    setUser(response.user); // Update user state immediately on successful signup
    // checkAuth(); // Optional: Re-run checkAuth after signup
  }, []);

  const logout = useCallback(() => {
    authService.logout(); // Clear tokens and user_data from localStorage
    setUser(null);        // Reset user state
    clearCart();          // Clear cart on logout
  }, [clearCart]);

  const updateUser = useCallback((userData: UserData) => {
    setUser(userData);
    localStorage.setItem('user_data', JSON.stringify(userData));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        loading,
        updateUser,
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart
      }}
    >
      {/* Show a loading indicator while authentication status is being determined */}
      {loading ? <div>Loading application...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
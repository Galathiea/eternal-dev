import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface AuthContextType {
  user: any | null;
  isAuthenticated: boolean;
  login: (credentials: any) => Promise<void>;
  signup: (credentials: any) => Promise<void>;
  logout: () => void;
  loading: boolean;
  updateUser: (userData: any) => void;
  // Cart functionality
  cart: CartItem[];
  cartCount: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateCartItem: (id: number, quantity: number) => void;
  clearCart: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Calculate cart count
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Initialize auth state
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First check if we have a token
        const token = localStorage.getItem('token');
        if (!token) {
          setUser(null);
          return;
        }

        // Try to get user info
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          // Load cart from localStorage or backend if needed
          const savedCart = localStorage.getItem('cart');
          if (savedCart) {
            setCart(JSON.parse(savedCart));
          }
        } else {
          // If we can't get user info, clear the token
          authService.logout();
          setUser(null);
        }
      } catch (error) {
        // Clear tokens on error
        authService.logout();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Cart methods
  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      if (existingItem) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateCartItem = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Authentication methods
  const authMethods = {
    login: async (credentials: any) => {
      const response = await authService.login(credentials);
      setUser(response.user);
    },

    signup: async (credentials: any) => {
      const response = await authService.signup(credentials);
      setUser(response.user);
    },

    logout: () => {
      authService.logout();
      setUser(null);
      // Optionally clear cart on logout
      // clearCart();
    },

    updateUser: async (userData: any) => {
      setUser(userData);
    }
  };

  // Return context provider
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login: authMethods.login,
        signup: authMethods.signup,
        logout: authMethods.logout,
        loading,
        updateUser: authMethods.updateUser,
        // Cart functionality
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart
      }}
    >
      {children}
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
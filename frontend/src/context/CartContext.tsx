import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { cartAPI, CartAPI, CartItemAPI, AddToCartRequest } from '../services/cart';
import { useAuth } from './AuthContext';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  time?: string;
  servings?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  updateCart: (items: CartItem[]) => void;
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  restoreCart: (items: CartItem[]) => void;
  getItemQuantity: (id: string) => number;
  cartTotal: number;
  itemCount: number;
  isLoading: boolean;
  error: string | null;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  updateCart: () => {},
  addToCart: async () => {},
  removeFromCart: async () => {},
  updateQuantity: async () => {},
  clearCart: async () => {},
  restoreCart: () => {},
  getItemQuantity: () => 0,
  cartTotal: 0,
  itemCount: 0,
  isLoading: false,
  error: null,
  refreshCart: async () => {},
});

// Convert API cart item to frontend cart item
const convertAPIItemToFrontend = (apiItem: CartItemAPI): CartItem => ({
  id: apiItem.recipe.id.toString(),
  name: apiItem.recipe.title,
  price: parseFloat(apiItem.price_at_time_of_addition),
  quantity: apiItem.quantity,
  image: apiItem.recipe.image || '',
  time: apiItem.recipe.time || '',
  servings: apiItem.recipe.servings?.toString() || '',
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  
  // Item mapping for API integration (maps frontend IDs to backend item IDs)
  const [itemMapping, setItemMapping] = useState<Record<string, number>>({});

  // Memoized cart calculations
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity), 0
  );

  // Persist cart to localStorage for offline support
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Load cart from API when user is authenticated
  const refreshCart = useCallback(async () => {
    if (!isAuthenticated) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const cartData = await cartAPI.getCart();
      const frontendItems = cartData.items.map(convertAPIItemToFrontend);
      
      // Create mapping for backend item IDs
      const mapping: Record<string, number> = {};
      cartData.items.forEach(item => {
        mapping[item.recipe.id.toString()] = item.id;
      });
      
      setCartItems(frontendItems);
      setItemMapping(mapping);
    } catch (err) {
      console.warn('Failed to load cart from API, using local storage:', err);
      setError('Failed to sync cart with server');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  // Load cart on auth change
  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const updateCart = useCallback((items: CartItem[]) => {
    setCartItems(items);
  }, []);

  const getItemQuantity = useCallback((id: string) => {
    return cartItems.find(item => item.id === id)?.quantity || 0;
  }, [cartItems]);

  const addToCart = useCallback(async (item: CartItem) => {
    setError(null);
    
    // Optimistic update
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prev, item];
    });

    // If authenticated, sync with API
    if (isAuthenticated) {
      try {
        const addRequest: AddToCartRequest = {
          recipe_id: parseInt(item.id),
          quantity: item.quantity,
        };
        
        const apiItem = await cartAPI.addToCart(addRequest);
        
        // Update mapping
        setItemMapping(prev => ({
          ...prev,
          [item.id]: apiItem.id,
        }));
        
      } catch (err) {
        console.error('Failed to sync cart addition with API:', err);
        setError('Failed to sync with server');
        // Note: We keep the optimistic update even if API fails
      }
    }
  }, [isAuthenticated]);

  const removeFromCart = useCallback(async (id: string) => {
    setError(null);
    
    // Optimistic update
    setCartItems(prev => prev.filter(item => item.id !== id));

    // If authenticated, sync with API
    if (isAuthenticated && itemMapping[id]) {
      try {
        await cartAPI.removeFromCart(itemMapping[id]);
        
        // Remove from mapping
        setItemMapping(prev => {
          const newMapping = { ...prev };
          delete newMapping[id];
          return newMapping;
        });
        
      } catch (err) {
        console.error('Failed to sync cart removal with API:', err);
        setError('Failed to sync with server');
        // Note: We keep the optimistic update even if API fails
      }
    }
  }, [isAuthenticated, itemMapping]);

  const updateQuantity = useCallback(async (id: string, quantity: number) => {
    setError(null);
    
    if (quantity <= 0) {
      await removeFromCart(id);
      return;
    }
    
    // Optimistic update
    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );

    // If authenticated, sync with API
    if (isAuthenticated && itemMapping[id]) {
      try {
        await cartAPI.updateCartItem(itemMapping[id], { quantity });
      } catch (err) {
        console.error('Failed to sync quantity update with API:', err);
        setError('Failed to sync with server');
        // Note: We keep the optimistic update even if API fails
      }
    }
  }, [isAuthenticated, itemMapping, removeFromCart]);

  const clearCart = useCallback(async () => {
    setError(null);
    
    // Optimistic update
    setCartItems([]);
    setItemMapping({});

    // If authenticated, sync with API
    if (isAuthenticated) {
      try {
        await cartAPI.clearCart();
      } catch (err) {
        console.error('Failed to sync cart clear with API:', err);
        setError('Failed to sync with server');
        // Note: We keep the optimistic update even if API fails
      }
    }
  }, [isAuthenticated]);

  const restoreCart = useCallback((items: CartItem[]) => {
    setCartItems(items);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        updateCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        restoreCart,
        getItemQuantity,
        cartTotal,
        itemCount,
        isLoading,
        error,
        refreshCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
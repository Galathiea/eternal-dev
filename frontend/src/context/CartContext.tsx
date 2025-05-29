import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';

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
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  restoreCart: (items: CartItem[]) => void;
  getItemQuantity: (id: string) => number;
  cartTotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  updateCart: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  restoreCart: () => {},
  getItemQuantity: () => 0,
  cartTotal: 0,
  itemCount: 0,
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // Memoized cart calculations
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity), 0
  );

  // Persist cart to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const updateCart = useCallback((items: CartItem[]) => {
    setCartItems(items);
  }, []);

  const getItemQuantity = useCallback((id: string) => {
    return cartItems.find(item => item.id === id)?.quantity || 0;
  }, [cartItems]);

  const addToCart = useCallback((item: CartItem) => {
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
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

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
        itemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
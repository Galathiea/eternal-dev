import { api, API_URL } from '../config/api';

export interface CartItemAPI {
  id: number;
  recipe: {
    id: number;
    title: string;
    price: string;
    image?: string;
    time?: string;
    servings?: number;
  };
  quantity: number;
  price_at_time_of_addition: string;
  added_at: string;
}

export interface CartAPI {
  id: number;
  user: number;
  items: CartItemAPI[];
  total_price: string;
  created_at: string;
  updated_at: string;
}

export interface AddToCartRequest {
  recipe_id: number;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

export const cartAPI = {
  // Get user's cart
  getCart: async (): Promise<CartAPI> => {
    try {
      const response = await api.get('/api/cart/');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      throw error;
    }
  },

  // Add item to cart
  addToCart: async (data: AddToCartRequest): Promise<CartItemAPI> => {
    try {
      const response = await api.post('/api/cart/items/', data);
      return response.data;
    } catch (error) {
      console.error('Failed to add to cart:', error);
      throw error;
    }
  },

  // Update cart item quantity
  updateCartItem: async (itemId: number, data: UpdateCartItemRequest): Promise<CartItemAPI> => {
    try {
      const response = await api.patch(`/api/cart/items/${itemId}/`, data);
      return response.data;
    } catch (error) {
      console.error('Failed to update cart item:', error);
      throw error;
    }
  },

  // Remove item from cart
  removeFromCart: async (itemId: number): Promise<void> => {
    try {
      await api.delete(`/api/cart/items/${itemId}/`);
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      throw error;
    }
  },

  // Clear entire cart
  clearCart: async (): Promise<void> => {
    try {
      await api.delete('/api/cart/clear/');
    } catch (error) {
      console.error('Failed to clear cart:', error);
      throw error;
    }
  },
};
import { useState, useEffect } from 'react';
import { api, endpoints } from '../utils/api';
import { Button } from '../components/ui/button';
import { CartItem } from './CartItem';

interface CartItem {
  id: number;
  recipe: {
    id: number;
    title: string;
    description: string;
    price: number;
  };
  quantity: number;
}

interface Cart {
  id: number;
  items: CartItem[];
}

interface CartProps {
  recipeId: number;
  recipePrice: number;
  onAddToCart: () => void;
}

export default function Cart({ recipeId, recipePrice, onAddToCart }: CartProps) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await api.get(endpoints.cart);
      setCart(response.data[0]);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async () => {
    try {
      setLoading(true);
      await api.post(`${endpoints.cart}${cart?.id}/items/`, {
        recipe: recipeId,
        quantity: 1,
        price: recipePrice
      });
      onAddToCart();
      fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateCart = () => {
    fetchCart();
  };

  const getTotal = () => {
    if (!cart) return 0;
    return cart.items.reduce((total: number, item: CartItem) => {
      return total + (item.quantity * item.recipe.price);
    }, 0);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setShowCart(!showCart)}
      >
        Cart ({cart?.items?.length || 0})
      </Button>

      {showCart && (
        <div className="fixed right-0 top-16 w-96 bg-white rounded-lg shadow-lg p-4 z-50">
          <h2 className="text-lg font-semibold mb-4">Shopping Cart</h2>
          
          {cart?.items?.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            <div>
              {cart?.items?.map((item: CartItem) => (
                <CartItem
                  key={item.id}
                  item={item}
                  cartId={cart.id}
                  onUpdate={updateCart}
                />
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
                <Button className="w-full mt-4">
                  Checkout
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      <Button
        variant="default"
        onClick={addToCart}
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add to Cart'}
      </Button>
    </div>
  );
}

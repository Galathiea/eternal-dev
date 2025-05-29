import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

interface CartProps {
  recipeId?: number;
  recipePrice?: number;
  onAddToCart?: () => void;
}

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

const Cart = ({ recipeId, recipePrice, onAddToCart }: CartProps) => {
  const navigate = useNavigate();
  const { cartItems, updateCart } = useCart();
  const [isClient, setIsClient] = useState(false);

  // Handle the simple case where we just need to add to cart
  if (recipeId && recipePrice && onAddToCart) {
    return (
      <button 
        onClick={onAddToCart}
        className="px-4 py-2 text-white bg-orange-600 rounded-md hover:bg-orange-700"
      >
        Add to Cart (${recipePrice.toFixed(2)})
      </button>
    );
  }

  // Ensure we're on the client side before accessing localStorage
  useEffect(() => {
    setIsClient(true);
  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    const updatedItems = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    updateCart(updatedItems);
  };

  const removeItem = (id: string) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    updateCart(updatedItems);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateShipping = () => {
    return cartItems.length > 0 ? 5.99 : 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { cartItems } });
  };

  // Don't render on server side
  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-gray-800">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-lg shadow">
            <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="mt-4 text-lg font-medium text-gray-800">Your cart is empty</h2>
            <Link
              to="/recipes"
              className="inline-flex items-center px-4 py-2 mt-6 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-md shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Browse Recipes
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden bg-white rounded-lg shadow">
            <div className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <div key={item.id} className="flex p-4 sm:p-6">
                  <div className="flex-shrink-0">
                    <img 
                      className="object-cover w-24 h-24 rounded-md" 
                      src={item.image} 
                      alt={item.name}
                      width={96}
                      height={96}
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-1 ml-4 sm:flex-row">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                      <p className="mt-1 text-gray-600">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center mt-4 sm:mt-0">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-gray-600 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-gray-800">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-gray-600 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 ml-4 text-gray-500 rounded-md hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        aria-label="Remove item"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200 sm:p-6">
              <h2 className="mb-4 text-lg font-medium text-gray-800">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span className="text-gray-800">${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-800">${calculateShipping().toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <span className="text-lg font-bold text-orange-600">${calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <button
                  onClick={handleCheckout}
                  className="w-full px-6 py-3 text-base font-medium text-white bg-orange-600 border border-transparent rounded-md shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Proceed to Checkout
                </button>
                <Link
                  to="/recipes"
                  className="flex items-center justify-center w-full px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
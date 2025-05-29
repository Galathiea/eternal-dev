import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  stock?: number;
};

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
        toast.error('Failed to load your cart');
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    const saveCart = () => {
      try {
        localStorage.setItem('cart', JSON.stringify(cartItems));
      } catch (error) {
        console.error('Failed to save cart to localStorage:', error);
      }
    };

    saveCart();
  }, [cartItems]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    
    // Check stock if available
    const item = cartItems.find(item => item.id === id);
    if (item?.stock && newQuantity > item.stock) {
      toast.warn(`Only ${item.stock} available in stock`);
      return;
    }

    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
    toast.success('Quantity updated');
  };

  const removeItem = (id: string) => {
    const itemName = cartItems.find(item => item.id === id)?.name;
    setCartItems(cartItems.filter(item => item.id !== id));
    toast.success(`${itemName} removed from cart`);
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success('Cart cleared');
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
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    navigate('/checkout', { state: { cartItems } });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-orange-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Your Shopping Cart</h1>
          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-800"
            >
              <FaTrash className="mr-1" /> Clear Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-lg shadow">
            <div className="flex justify-center">
              {FaShoppingCart && <FaShoppingCart className="w-12 h-12 text-gray-400" />}
            </div>
            <h2 className="mt-4 text-lg font-medium text-gray-800">Your cart is empty</h2>
            <p className="mt-1 text-gray-600">Looks like you haven't added anything to your cart yet</p>
            <Link
              to="/recipes"
              className="inline-flex items-center px-4 py-2 mt-6 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-md shadow-sm hover:bg-orange-700"
            >
              <FaArrowLeft className="mr-2" /> Browse Recipes
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden bg-white rounded-lg shadow">
            <div className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-col p-4 sm:flex-row sm:p-6">
                  <div className="flex-shrink-0">
                    <img 
                      className="object-cover w-24 h-24 rounded-md" 
                      src={item.image} 
                      alt={item.name}
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-1 mt-4 sm:mt-0 sm:ml-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                      <p className="mt-1 text-gray-600">${item.price.toFixed(2)}</p>
                      {item.stock && (
                        <p className="mt-1 text-sm text-gray-500">
                          {item.stock > 5 ? 'In stock' : `Only ${item.stock} left`}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center mt-4">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-gray-600 hover:text-orange-600"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-gray-800">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-gray-600 hover:text-orange-600"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-4 text-gray-500 hover:text-orange-600"
                        aria-label="Remove item"
                      >
                        <FaTrash className="w-5 h-5" />
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
                  className="flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-orange-600 border border-transparent rounded-md shadow-sm hover:bg-orange-700"
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </button>
                <Link
                  to="/recipes"
                  className="flex items-center justify-center w-full px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
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
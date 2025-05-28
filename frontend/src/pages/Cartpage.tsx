import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaArrowLeft, FaCreditCard, FaMoneyBillWave, FaPaypal } from "react-icons/fa";

import { api, endpoints } from '../utils/api';
import axios from 'axios'; // ⭐ Import only axios ⭐

// ⭐ Define interfaces for your fetched data based on Django serializers ⭐
interface RecipeInCart {
  id: number;
  title: string;
  image: string | null;
  price: number;
}

interface CartItem {
  id: number;
  recipe: RecipeInCart;
  quantity: number;
  price: number;
  total_price: number;
}

interface Cart {
  id: number;
  user: number;
  items: CartItem[];
  total_price: number;
  created_at: string;
  updated_at: string;
}

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedPayment, setSelectedPayment] = useState<string>("");

  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<Cart>(endpoints.cart);
      setCart(response.data);
    } catch (err: unknown) { // ⭐ Type err as unknown initially ⭐
      console.error('Error fetching cart:', err);

      // ⭐ Use a type guard to check if err is an AxiosError ⭐
      if (axios.isAxiosError(err)) {
        // Now TypeScript knows err is an AxiosError, so err.response is safe to access
        if (err.response && err.response.status === 401) {
          setError('Please log in to view your cart.');
        } else {
          setError('Failed to load cart. Please try again.');
        }
      } else {
        // Handle non-Axios errors (e.g., network issues before request is sent)
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      await api.put(`${endpoints.cart}update/${itemId}/`, { quantity: newQuantity });
      fetchCart();
    } catch (err: unknown) { // ⭐ Type err as unknown ⭐
      console.error('Error updating quantity:', err);
      if (axios.isAxiosError(err)) { // ⭐ Type guard ⭐
        setError('Failed to update item quantity: ' + (err.response?.data?.detail || err.message));
      } else {
        setError('An unexpected error occurred while updating quantity.');
      }
    }
  };

  const removeItem = async (itemId: number) => {
    if (!window.confirm('Are you sure you want to remove this item from your cart?')) {
      return;
    }
    try {
      await api.delete(`${endpoints.cart}remove/${itemId}/`);
      fetchCart();
    } catch (err: unknown) { // ⭐ Type err as unknown ⭐
      console.error('Error removing item:', err);
      if (axios.isAxiosError(err)) { // ⭐ Type guard ⭐
        setError('Failed to remove item from cart: ' + (err.response?.data?.detail || err.message));
      } else {
        setError('An unexpected error occurred while removing item.');
      }
    }
  };

  const handleCheckout = () => {
    if (!selectedPayment) {
      alert("Please select a payment method");
      return;
    }
    alert(`Order placed successfully with ${selectedPayment} payment!`);
  };

  if (loading) {
    return <div className="text-center p-8 text-lg">Loading your cart...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-lg text-red-600">{error}</div>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="flex items-center mb-6">
          <Link to="/recipes" className="flex items-center text-orange-500 hover:text-orange-700">
            <FaArrowLeft className="mr-2" />
            Continue Shopping
          </Link>
          <h1 className="ml-6 text-3xl font-bold">Your Cart</h1>
        </div>
        <div className="p-8 text-center bg-white rounded-lg shadow">
          <p className="text-lg">Your cart is empty</p>
          <Link to="/recipes" className="mt-4 inline-block px-6 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600">
            Browse Recipes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex items-center mb-6">
        <Link to="/recipes" className="flex items-center text-orange-500 hover:text-orange-700">
          <FaArrowLeft className="mr-2" />
          Continue Shopping
        </Link>
        <h1 className="ml-6 text-3xl font-bold">Your Cart</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Cart Items */}
        <div className="md:col-span-2">
          <div className="space-y-4">
            {cart.items.map(item => (
              <div key={item.id} className="flex p-4 bg-white rounded-lg shadow">
                {item.recipe.image && (
                  <img src={item.recipe.image} alt={item.recipe.title} className="w-24 h-24 object-cover rounded-md" />
                )}
                <div className="flex flex-col flex-grow ml-4">
                  <h3 className="text-lg font-semibold">{item.recipe.title}</h3>
                  <p className="text-gray-600">₱{item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 bg-gray-200 rounded-l"
                    >
                        -
                    </button>
                    <span className="px-4 py-1 bg-gray-100">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 bg-gray-200 rounded-r"
                    >
                        +
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <p className="font-semibold">₱{item.total_price.toFixed(2)}</p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="p-6 bg-white rounded-lg shadow h-fit">
          <h2 className="mb-4 text-xl font-bold">Order Summary</h2>

          <div className="mb-6 space-y-3">
            {cart.items.map(item => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.recipe.title} × {item.quantity}
                </span>
                <span>₱{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="py-4 border-t border-b border-gray-200">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₱{cart.total_price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Delivery Fee</span>
              <span>₱2.99</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>₱{(cart.total_price + 2.99).toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="my-6">
            <h3 className="mb-3 font-semibold">Payment Method</h3>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedPayment("credit")}
                className={`flex items-center w-full p-3 border rounded-lg ${selectedPayment === "credit" ? "border-orange-500 bg-orange-50" : "border-gray-300"}`}
              >
                <FaCreditCard className="mr-3" />
                Credit/Debit Card
              </button>
              <button
                onClick={() => setSelectedPayment("paypal")}
                className={`flex items-center w-full p-3 border rounded-lg ${selectedPayment === "paypal" ? "border-orange-500 bg-orange-50" : "border-gray-300"}`}
              >
                <FaPaypal className="mr-3" />
                PayPal
              </button>
              <button
                onClick={() => setSelectedPayment("cash")}
                className={`flex items-center w-full p-3 border rounded-lg ${selectedPayment === "cash" ? "border-orange-500 bg-orange-50" : "border-gray-300"}`}
              >
                <FaMoneyBillWave className="mr-3" />
                Cash on Delivery
              </button>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full py-3 font-bold text-white bg-orange-500 rounded-lg hover:bg-orange-600"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
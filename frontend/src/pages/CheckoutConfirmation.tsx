import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartItem } from '../Types';
import { FaCheckCircle, FaClock, FaTruck } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
}

const CheckoutConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { cartItems, subtotal, shipping, total, paymentMethod, shippingAddress } = location.state as {
    cartItems: CartItem[];
    subtotal: number;
    shipping: number;
    total: number;
    paymentMethod: string;
    shippingAddress: ShippingAddress;
  };

  React.useEffect(() => {
    // Clear cart after confirmation
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="overflow-hidden bg-white rounded-lg shadow">
          <div className="px-6 py-8 sm:p-10">
            <div className="mb-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <FaCheckCircle className="text-4xl text-green-500" />
              </div>
              <h1 className="mb-2 text-3xl font-bold text-green-600">Payment Successful!</h1>
              <p className="text-gray-600">Thank you for your purchase!</p>
            </div>

            <div className="pb-6 border-b">
              <h2 className="mb-4 text-xl font-semibold">Shipping Information</h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <FaTruck className="mr-2" />
                  <span>{shippingAddress.fullName}</span>
                </div>
                <div>{shippingAddress.address}</div>
                <div>{`${shippingAddress.city}, ${shippingAddress.zip}`}</div>
                <div>{shippingAddress.phone}</div>
              </div>
            </div>

            <div className="pb-6 border-b">
              <h2 className="mb-4 text-xl font-semibold">Order Items</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pb-6 border-b">
              <h2 className="mb-4 text-xl font-semibold">Order Details</h2>
              <div className="space-y-4">
                <div className="flex items-center text-green-600">
                  <FaClock className="mr-2" />
                  <span>Order Date: {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method</span>
                  <span className="text-green-600">{paymentMethod}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold text-green-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={() => {
                  clearCart();
                  navigate('/profile/orders');
                }}
                className="px-6 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                View My Orders
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutConfirmation;

import React from 'react';
import { useLocation } from 'react-router-dom';
import { CartItem } from '../Types';
import { Link } from 'react-router-dom';

const CheckoutConfirmation = () => {
  const location = useLocation();
  const { cartItems, subtotal, shipping, total } = location.state as {
    cartItems: CartItem[];
    subtotal: number;
    shipping: number;
    total: number;
  };

  React.useEffect(() => {
    localStorage.removeItem('cart');
  }, []);

  return (
    <div className="min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="overflow-hidden bg-white rounded-lg shadow">
          <div className="px-6 py-8 sm:p-10">
            <div className="text-center">
              <svg className="w-12 h-12 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h1 className="mt-3 text-2xl font-bold text-gray-800">Order Confirmed!</h1>
              <p className="mt-2 text-gray-600">Thank you for your purchase. Your order has been received and is being processed.</p>
            </div>

            <div className="pt-8 mt-10 border-t border-gray-200">
              <h2 className="mb-4 text-lg font-medium text-gray-800">Order Summary</h2>
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <div className="flex">
                      <img className="object-cover w-16 h-16 rounded-md" src={item.image} alt={item.name} />
                      <div className="ml-4">
                        <h3 className="text-gray-800">{item.name}</h3>
                        <p className="text-gray-600">{item.quantity} × ${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <span className="text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-800">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-800">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <span className="text-lg font-bold text-orange-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <Link
                to="/recipes"
                className="flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-orange-600 border border-transparent rounded-md shadow-sm hover:bg-orange-700"
              >
                Back to Recipes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutConfirmation;
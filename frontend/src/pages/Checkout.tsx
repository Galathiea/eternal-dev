
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartItem } from '../Types';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = location.state as { cartItems: CartItem[] };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateShipping = () => {
    return cartItems.length > 0 ? 5.99 : 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    navigate('/checkout/confirmation', {
      state: {
        cartItems,
        subtotal: calculateSubtotal(),
        shipping: calculateShipping(),
        total: calculateTotal()
      }
    });
  };

  return (
    <div className="min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="overflow-hidden bg-white rounded-lg shadow">
          <div className="px-6 py-8 sm:p-10">
            <h1 className="mb-8 text-2xl font-bold text-gray-800">Checkout</h1>
            
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <h2 className="mb-4 text-lg font-medium text-gray-800">Shipping Information</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Shipping form fields */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" id="name" className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" required />
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <input type="text" id="address" className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                      <input type="text" id="city" className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" required />
                    </div>
                    <div>
                      <label htmlFor="zip" className="block text-sm font-medium text-gray-700">ZIP Code</label>
                      <input type="text" id="zip" className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" required />
                    </div>
                  </div>
                  
                  <h2 className="mt-8 mb-4 text-lg font-medium text-gray-800">Payment Information</h2>
                  <div>
                    <label htmlFor="card" className="block text-sm font-medium text-gray-700">Card Number</label>
                    <input type="text" id="card" className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                      <input type="text" id="expiry" placeholder="MM/YY" className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" required />
                    </div>
                    <div>
                      <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">CVC</label>
                      <input type="text" id="cvc" className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" required />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full px-6 py-3 mt-6 text-base font-medium text-white bg-orange-600 border border-transparent rounded-md shadow-sm hover:bg-orange-700"
                  >
                    Complete Order
                  </button>
                </form>
              </div>
              
              <div>
                <h2 className="mb-4 text-lg font-medium text-gray-800">Order Summary</h2>
                <div className="p-4 rounded-lg bg-gray-50">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between py-3 border-b border-gray-200">
                      <div className="flex items-center">
                        <img className="object-cover w-12 h-12 rounded-md" src={item.image} alt={item.name} />
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Subtotal</span>
                      <span className="text-sm text-gray-800">${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Shipping</span>
                      <span className="text-sm text-gray-800">${calculateShipping().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                      <span className="text-base font-medium text-gray-800">Total</span>
                      <span className="text-base font-medium text-orange-600">${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
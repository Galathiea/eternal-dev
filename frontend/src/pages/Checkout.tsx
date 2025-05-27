
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: ''
  });

  const shippingFee = 100; // Fixed shipping fee
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + shippingFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Here you would typically make an API call to process the payment
      // For now, we'll just navigate to confirmation page
      navigate('/checkout-confirmation', {
        state: {
          cartItems,
          subtotal,
          shipping: shippingFee,
          total,
          paymentMethod,
          shippingAddress
        }
      });
    } catch (error) {
      console.error('Payment processing error:', error);
      alert('Payment processing failed. Please try again.');
    }
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Shipping Information */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      value={shippingAddress.fullName}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                      className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={shippingAddress.email}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                      className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                      className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <textarea
                      id="address"
                      value={shippingAddress.address}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                      rows={3}
                      className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                      <input
                        type="text"
                        id="city"
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="zip" className="block text-sm font-medium text-gray-700">ZIP Code</label>
                      <input
                        type="text"
                        id="zip"
                        value={shippingAddress.zip}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, zip: e.target.value })}
                        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Payment Method Selection */}
                  <h2 className="mt-8 mb-4 text-lg font-medium text-gray-800">Payment Method</h2>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        id="credit-card"
                        name="payment-method"
                        type="radio"
                        value="credit-card"
                        checked={paymentMethod === 'credit-card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                      />
                      <label htmlFor="credit-card" className="block ml-3 text-sm font-medium text-gray-700">
                        Credit Card
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="gcash"
                        name="payment-method"
                        type="radio"
                        value="gcash"
                        checked={paymentMethod === 'gcash'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                      />
                      <label htmlFor="gcash" className="block ml-3 text-sm font-medium text-gray-700">
                        GCash
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="paypal"
                        name="payment-method"
                        type="radio"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                      />
                      <label htmlFor="paypal" className="block ml-3 text-sm font-medium text-gray-700">
                        PayPal
                      </label>
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
                      <span className="text-sm text-gray-800">₱{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Subtotal</span>
                      <span className="text-sm text-gray-800">₱{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Shipping</span>
                      <span className="text-sm text-gray-800">₱{shippingFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                      <span className="text-base font-medium text-gray-800">Total</span>
                      <span className="text-base font-medium text-orange-600">₱{total.toFixed(2)}</span>
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
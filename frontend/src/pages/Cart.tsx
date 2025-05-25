import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

const Cart: React.FC = () => {
  const { 
    cartItems, 
    removeFromCart, 
    clearCart, 
    getCartTotal 
  } = useCart();

  return (
    <div className="min-h-screen bg-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-orange-800 mb-8">Your Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-orange-600 mb-4">Your cart is empty</p>
            <Link 
              to="/recipes" 
              className="inline-block px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
            >
              Browse Recipes
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map(item => (
              <div key={item.id} className="bg-white p-6 rounded-lg shadow-md flex justify-between">
                <div className="flex items-center space-x-4">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-bold">{item.name}</h3>
                    <p>${item.price.toFixed(2)} × {item.quantity}</p>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-orange-600 hover:text-orange-800"
                >
                  <X />
                </button>
              </div>
            ))}
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between text-lg font-bold mb-4">
                <span>Total:</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={clearCart}
                  className="px-4 py-2 border border-orange-600 text-orange-600 rounded-lg"
                >
                  Clear Cart
                </button>
                <Link
                  to="/checkout"
                  className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-center"
                >
                  Proceed to Checkout
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
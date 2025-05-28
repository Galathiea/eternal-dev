// src/pages/Cartpage.tsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

const CartPage: React.FC = () => {
  const { cart, cartCount, removeFromCart, updateCartItem, loading } = useAuth(); // Destructure loading

  if (loading) {
    return <div>Loading cart data...</div>; // Show a loading indicator
  }

  // Now, 'cart' should be correctly initialized (at least as an empty array)
  // because the loading state ensures AuthProvider has completed its initialization.
  return (
    <div className="cart-page">
      <h1>Your Shopping Cart ({cartCount} items)</h1>

      {/* This check should now be safe */}
      {cart && cart.length > 0 ? (
        <div className="cart-items">
          {/* ... render cart items ... */}
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaArrowLeft, FaCreditCard, FaMoneyBillWave, FaPaypal } from "react-icons/fa";

const CartPage: React.FC = () => {
  // Sample cart data - in a real app, this would come from state management
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Spaghetti Carbonara",
      price: 12.99,
      quantity: 2,
      image: "https://via.placeholder.com/100"
    },
    {
      id: 2,
      name: "Margherita Pizza",
      price: 14.99,
      quantity: 1,
      image: "https://via.placeholder.com/100"
    },
    {
      id: 3,
      name: "Caesar Salad",
      price: 8.99,
      quantity: 1,
      image: "https://via.placeholder.com/100"
    }
  ]);

  const [selectedPayment, setSelectedPayment] = useState<string>("");

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (!selectedPayment) {
      alert("Please select a payment method");
      return;
    }
    // In a real app, you would process the payment here
    alert(`Order placed successfully with ${selectedPayment} payment!`);
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex items-center mb-6">
        <Link to="/" className="flex items-center text-orange-500 hover:text-orange-700">
          <FaArrowLeft className="mr-2" />
          Continue Shopping
        </Link>
        <h1 className="ml-6 text-3xl font-bold">Your Cart</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Cart Items */}
        <div className="md:col-span-2">
          {cartItems.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-lg shadow">
              <p className="text-lg">Your cart is empty</p>
              <Link to="/recipes" className="mt-4 inline-block px-6 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600">
                Browse Recipes
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex p-4 bg-white rounded-lg shadow">
                  <img src={item.image} alt={item.name} className="w-24 h-24 rounded-md" />
                  <div className="flex flex-col flex-grow ml-4">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
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
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
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
          )}
        </div>

        {/* Order Summary */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-white rounded-lg shadow h-fit">
            <h2 className="mb-4 text-xl font-bold">Order Summary</h2>
            
            <div className="mb-6 space-y-3">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="py-4 border-t border-b border-gray-200">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Delivery Fee</span>
                <span>$2.99</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${(calculateTotal() + 2.99).toFixed(2)}</span>
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
        )}
      </div>
    </div>
  );
};

export default CartPage;
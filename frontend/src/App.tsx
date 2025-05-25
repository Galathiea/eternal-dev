import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import Home from "./pages/home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import CartPage from "./pages/Cartpage";
import Checkout from "./pages/Checkout";
import CategoryPage from "./pages/CategoryPage";
import OrderConfirmation from "./pages/CheckoutConfirmation";
import OurStory from "./pages/OurStory";
import Recipes from "./pages/recipes";
import ProductDetail from "./pages/productdetail";
import RecipeDetail from "./pages/RecipeDetail";
import { Profile } from "./pages/profile";
import Dashboard from "./components/Dashboard";
import BackendTest from "./components/BackendTest";
import Footer from "./components/Footer";
import  ProtectedRoute from "./components/ProtectedRoute";
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    document.documentElement.style.display = 'block';
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-orange-600">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/cart" element={<Cart />} />
              <Route path="/cart-page" element={<CartPage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/checkout-confirmation" element={<OrderConfirmation />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipes/:id" element={<RecipeDetail />} />
            <Route path="/categories" element={<CategoryPage />} />
            <Route path="/categories/:slug" element={<CategoryPage />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/backend-test" element={<BackendTest />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
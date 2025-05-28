import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

// Core Layout Components
import Navbar from "./components/ui/Navbar";
import Footer from "./components/Footer";

// Context Providers
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

// Page Components
import Home from "./pages/home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CartPage from "./pages/Cartpage"; // ⭐ Confirmed: Use CartPage.tsx (or Cartpage.tsx) ⭐
// import Cart from "./pages/Cart"; // ⭐ REMOVE THIS LINE if not in use ⭐

import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/CheckoutConfirmation";
import CategoryPage from "./pages/CategoryPage";
import OurStory from "./pages/OurStory";
import Recipes from "./pages/recipes";
import ProductDetail from "./pages/productdetail";
import RecipeDetail from "./pages/RecipeDetail";
import { Profile } from "./pages/profile";
import Dashboard from "./components/Dashboard";
import BackendTest from "./components/BackendTest";
import ProtectedRoute from "./components/ProtectedRoute"; // Ensure this path is correct and case-sensitive

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  // This useEffect ensures the page is displayed only after initial load, preventing FOUC (Flash of Unstyled Content)
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
            {/* Public Routes - accessible to everyone */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipes/:id" element={<RecipeDetail />} />
            <Route path="/categories" element={<CategoryPage />} />
            <Route path="/categories/:slug" element={<CategoryPage />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/backend-test" element={<BackendTest />} />

            {/* ⭐ Cart Page - DECIDE if it should be protected or public ⭐
                 For most e-commerce, the cart itself is public, but checkout requires login.
                 I'll place it here as public for now, as it's common.
                 If you want it protected, move it inside <ProtectedRoute> below.
            */}
            <Route path="/cart" element={<CartPage />} />

            {/* Protected Routes - require authentication */}
            <Route element={<ProtectedRoute />}>
              {/* If you moved /cart above, remove it from here: */}
              {/* <Route path="/cart" element={<CartPage />} /> */}
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/checkout-confirmation" element={<OrderConfirmation />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            {/* Catch-all route for unmatched paths */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
          {/* ⭐ ToastContainer for react-toastify notifications ⭐ */}
          <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
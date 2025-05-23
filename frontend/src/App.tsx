import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import Home from "./pages/home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/CheckoutConfirmation";
import OurStory from "./pages/OurStory";
import Recipes from "./pages/recipes";
import ProductDetail from "./pages/productdetail";
import RecipesDetailes from "./pages/RecipesDetailes";
import ProfilePage from "./pages/profile";
import Dashboard from "./components/Dashboard";
import BackendTest from "./components/BackendTest";
import Footer from "./components/Footer";


export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout-confirmation" element={<OrderConfirmation />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/recipes-detailes/:id" element={<RecipesDetailes />} />
        <Route path="/backend-test" element={<BackendTest />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </Router>
  );
}
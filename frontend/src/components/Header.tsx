import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, ChevronDown } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItemsCount, setCartItemsCount] = useState(0);

  // Sample user data - replace with your actual user data
  const userData = {
    firstName: "Logical",
    profileImage: "/default-profile.png" // replace with your default profile image path
  };

  // Load cart items count from localStorage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItemsCount(cart.length);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement your search functionality here
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container flex items-center justify-between px-6 py-4 mx-auto">
        <Link to="/" className="text-2xl font-bold text-orange-600">
          EternalHavenKitchen
        </Link>

        <nav className="items-center hidden space-x-6 md:flex">
          <Link to="/" className="hover:text-orange-600">Home</Link>
          <Link to="/recipes" className="hover:text-orange-600">Recipes</Link>
          <Link to="/categories" className="hover:text-orange-600">Categories</Link>
          <Link to="/about" className="hover:text-orange-600">About</Link>
          <Link to="/contact" className="hover:text-orange-600">Contact</Link>
          
          <form onSubmit={handleSearch} className="flex items-center ml-4">
            <input
              type="text"
              placeholder="Search recipes..."
              className="px-3 py-1 border rounded-l focus:outline-none focus:ring-1 focus:ring-orange-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit"
              className="px-3 py-1 text-white bg-orange-600 rounded-r hover:bg-orange-700"
            >
              🔍
            </button>
          </form>
        </nav>

        <div className="flex items-center space-x-4">
          {/* Cart Button with Badge */}
          <Link 
            to="/cart" 
            className="relative p-2 text-orange-600 rounded-full hover:bg-orange-50"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartItemsCount > 0 && (
              <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-1 -right-1">
                {cartItemsCount}
              </span>
            )}
          </Link>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              className="flex items-center space-x-2"
              onClick={() => navigate("/profile")} // Directly navigate to profile page
            >
              <img 
                src={userData.profileImage} 
                alt="Profile" 
                className="object-cover w-8 h-8 rounded-full"
              />
              <span className="hidden font-medium text-orange-600 sm:inline">
                {userData.firstName}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
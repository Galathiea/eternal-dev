import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSignOutAlt } from "react-icons/fa"; 
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container flex items-center justify-between px-4 py-4 mx-auto">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-orange-500">
          EternalHavenKitchen
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
          </li>
          <li>
            <Link to="/recipes" className="text-gray-700 hover:text-gray-900">
              Recipes
            </Link>
          </li>
          <li>
            <Link to="/categories" className="text-gray-700 hover:text-gray-900">
              Categories
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-gray-700 hover:text-gray-900">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-gray-700 hover:text-gray-900">
              Contact
            </Link>
          </li>
        </ul>

        {/* Search, Auth Buttons, and Icons */}
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search recipes..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <Link 
                to="/profile" 
                className="flex items-center text-gray-700 hover:text-orange-600 transition-colors"
              >
                <div className="flex items-center">
                  {user?.profile_image ? (
                    <img 
                      src={user.profile_image} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full object-cover border border-orange-200"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-500">
                      <FaUser className="text-lg" />
                    </div>
                  )}
                  <span className="ml-2 font-medium hidden md:inline-block">
                    {user?.username || 'Profile'}
                  </span>
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors"
              >
                <FaSignOutAlt className="mr-2" />
                <span className="hidden md:inline-block">Logout</span>
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-gray-700 hover:text-gray-900">
              <button className="px-6 py-2 border rounded-lg text-orange-500 border-gray-300 hover:bg-orange-50 transition-colors">
                Log in
              </button>
            </Link>
          )}

          <Link to="/cart" className="text-gray-700 hover:text-orange-600">
            <div className="relative p-2">
              <FaShoppingCart className="text-2xl" />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 px-1 text-xs text-white bg-red-400 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
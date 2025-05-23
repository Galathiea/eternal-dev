import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa"; 

const Navbar: React.FC = () => {
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
          <Link to="/login" className="text-gray-700 hover:text-gray-900">
            <button className="px-6 py-2 border rounded-lg text-orange border-grey hover:bg-white hover:text-orange-600">
              Log in
            </button>
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 text-white bg-orange-600 rounded-lg hover:bg-orange-700"
          >
            Sign Up
          </Link>
          
          {}
          <Link to="/profile" className="text-gray-700 hover:text-orange-600">
            <div className="relative p-2">
              <FaUser className="text-2xl" />
            </div>
          </Link>
          
          {}
          <Link to="/cart" className="text-gray-700 hover:text-orange-600">
            <div className="relative p-2">
              <FaShoppingCart className="text-2xl" />
              {}
              <span className="absolute top-0 right-0 px-1 text-xs text-white bg-red-400 rounded-full">
                3 {}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
// src/components/Header.tsx
"use client"

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '@/context/AuthContext'
import { FaUser, FaSignOutAlt, FaShoppingCart } from "react-icons/fa";
import { useEffect } from "react";

export default function Header() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  // Redirect to home if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/")
    }
  }, [isAuthenticated, navigate])

  return (
    <header className="bg-white shadow-sm">
      <div className="container flex items-center justify-between px-4 py-4 mx-auto">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-bold text-amber-800">
            EternalHavenKitchen
          </Link>
          <nav className="hidden space-x-6 md:flex">
            <Link to="/" className="hover:text-amber-600">Home</Link>
            <Link to="/recipes" className="hover:text-amber-600">Recipes</Link>
            <Link to="/categories" className="hover:text-amber-600">Categories</Link>
            <Link to="/about" className="hover:text-amber-600">About</Link>
            <Link to="/contact" className="hover:text-amber-600">Contact</Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search recipes..."
              className="px-4 py-2 border rounded-full border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
          </div>

          {/* Show profile, logout, and cart only if authenticated */}
          {isAuthenticated && (
            <>
              <Link to="/profile" className="p-2 text-amber-800 hover:text-amber-600">
                <FaUser className="text-xl" />
              </Link>
              <button 
                onClick={() => {
                  logout()
                  navigate("/")
                }} 
                className="p-2 text-amber-800 hover:text-amber-600"
              >
                <FaSignOutAlt className="text-xl" />
              </button>
              <Link to="/cart" className="p-2 text-amber-800 hover:text-amber-600">
                <FaShoppingCart className="text-xl" />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
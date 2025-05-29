// src/contexts/AuthContext.tsx
"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

// Extended AuthContextType interface
export interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  user?: {
    name?: string; // <-- Add this line to support user.name in Navbar
    profileImage?: string;
    // add other user properties as needed
  };
  // ...other properties
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ name?: string; profileImage?: string } | undefined>(undefined)

  useEffect(() => {
    // Check if user is logged in on initial load
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsAuthenticated(loggedIn)
    // Optionally load user from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = () => {
    localStorage.setItem("isLoggedIn", "true")
    setIsAuthenticated(true)
    // Example: set user info here if available
    // setUser({ name: "John Doe", profileImage: "/profile.jpg" })
  }

  const logout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("user")
    setIsAuthenticated(false)
    setUser(undefined)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
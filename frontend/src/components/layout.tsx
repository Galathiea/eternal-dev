"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Link, useNavigate, Outlet } from "react-router-dom"
import { Menu, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ShoppingCartButton } from "@/components/shopping-cart"
import { ProfileButton } from "@/components/profile-button"
import { Logo } from "@/components/logo"

export function Layout() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    // This is a simple example - in a real app, you would check auth state
    const checkLoginStatus = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
      setIsLoggedIn(isLoggedIn)
    }

    checkLoginStatus()

    // Listen for storage events (for when login state changes in another tab)
    window.addEventListener("storage", checkLoginStatus)

    return () => {
      window.removeEventListener("storage", checkLoginStatus)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Redirect to recipes page with search query
      navigate(`/recipes?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-[#e63946] focus:text-white"
      >
        Skip to main content
      </a>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden border-amber-200 hover:bg-amber-50 hover:text-amber-800"
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-white">
                <div className="mt-2 mb-8">
                  <Logo />
                </div>
                <nav className="flex flex-col gap-4">
                  <Link to="/" className="text-lg font-medium hover:text-amber-600">
                    Home
                  </Link>
                  <Link to="/recipes" className="text-lg font-medium hover:text-amber-600">
                    Recipes
                  </Link>
                  <Link to="/categories" className="text-lg font-medium hover:text-amber-600">
                    Categories
                  </Link>
                  <Link to="/about" className="text-lg font-medium hover:text-amber-600">
                    About
                  </Link>
                  <Link to="/contact" className="text-lg font-medium hover:text-amber-600">
                    Contact
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <Logo />
          </div>
          <nav className="hidden gap-6 md:flex" aria-label="Main Navigation">
            <Link
              to="/"
              className="text-sm font-medium hover:text-amber-600 focus:outline-none focus:underline focus:underline-offset-4"
            >
              Home
            </Link>
            <Link
              to="/recipes"
              className="text-sm font-medium hover:text-amber-600 focus:outline-none focus:underline focus:underline-offset-4"
            >
              Recipes
            </Link>
            <Link
              to="/categories"
              className="text-sm font-medium hover:text-amber-600 focus:outline-none focus:underline focus:underline-offset-4"
            >
              Categories
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium hover:text-amber-600 focus:outline-none focus:underline focus:underline-offset-4"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium hover:text-amber-600 focus:outline-none focus:underline focus:underline-offset-4"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <form className="relative hidden md:flex" role="search" onSubmit={handleSearch}>
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <Input
                type="search"
                placeholder="Search recipes..."
                className="w-[200px] pl-8 md:w-[250px] rounded-full bg-white border-amber-200"
                aria-label="Search recipes"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <ShoppingCartButton />
            <ProfileButton isLoggedIn={isLoggedIn} userName="John Doe" />
            {!isLoggedIn && (
              <div className="hidden gap-2 sm:flex">
                <Link to="/login">
                  <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="text-white bg-amber-600 hover:bg-amber-700">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="container flex justify-center py-1 font-serif text-sm bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 text-amber-800">
          Heavenly Bites, Eternal Delights
        </div>
      </header>

      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      <footer className="w-full border-t py-6 md:py-0 bg-[#6b4226] text-white">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-sm leading-loose text-center md:text-left">
            © {new Date().getFullYear()} Eternal Haven Kitchen. All rights reserved.
          </p>
          <nav aria-label="Footer Navigation">
            <ul className="flex gap-4">
              <li>
                <Link
                  to="/terms"
                  className="text-sm font-medium hover:text-amber-300 focus:outline-none focus:underline focus:underline-offset-4"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-sm font-medium hover:text-amber-300 focus:outline-none focus:underline focus:underline-offset-4"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm font-medium hover:text-amber-300 focus:outline-none focus:underline focus:underline-offset-4"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  )
}


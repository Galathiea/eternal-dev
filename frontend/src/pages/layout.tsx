"use client"

import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "@fontsource/playfair-display";
import { Menu, Search } from "lucide-react";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCartButton } from "@/components/shopping-cart";
import Logo from "@/components/ui/logo";
import { Dialog, DialogTrigger, DialogContent } from "@radix-ui/react-dialog";

const inter = { className: "font-inter" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {

    const checkLoginStatus = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(isLoggedIn);
    };

    checkLoginStatus();


    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {

      navigate(`/recipes?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <html>
      <head>
        <title>Eternal Haven Kitchen - Heavenly Bites, Eternal Delights</title>
        <meta
          name="description"
          content="Discover delicious recipes, cooking tips, and meal ideas for the whole family."
        />
      </head>
      <body className={`${inter.className} bg-gradient-to-b from-amber-50 to-white`}>
        <ThemeProvider>
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="md:hidden border-amber-200 hover:bg-amber-50 hover:text-amber-800"
                        aria-label="Open menu"
                      >
                        <Menu className="w-5 h-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                      <div className="mt-2 mb-8">
                        <Logo />
                      </div>
                      <nav className="flex flex-col gap-4">
                        <Button variant="link" onClick={() => navigate("/")} className="text-lg font-medium hover:text-amber-600">
                          Home
                        </Button>
                        <Button variant="link" onClick={() => navigate("/recipes")} className="text-lg font-medium hover:text-amber-600">
                          Recipes
                        </Button>
                        <Button variant="link" onClick={() => navigate("/categories")} className="text-lg font-medium hover:text-amber-600">
                          Categories
                        </Button>
                        <Button variant="link" onClick={() => navigate("/about")} className="text-lg font-medium hover:text-amber-600">
                          About
                        </Button>
                        <Button variant="link" onClick={() => navigate("/contact")} className="text-lg font-medium hover:text-amber-600">
                          Contact
                        </Button>
                      </nav>
                    </DialogContent>
                  </Dialog>
                  <Logo />
                </div>
                <nav className="hidden gap-6 md:flex" aria-label="Main Navigation">
                  <Button variant="link" onClick={() => navigate("/")} className="text-sm font-medium hover:text-amber-600 focus:outline-none focus:underline focus:underline-offset-4">
                    Home
                  </Button>
                  <Button variant="link" onClick={() => navigate("/recipes")} className="text-sm font-medium hover:text-amber-600 focus:outline-none focus:underline focus:underline-offset-4">
                    Recipes
                  </Button>
                  <Button variant="link" onClick={() => navigate("/categories")} className="text-sm font-medium hover:text-amber-600 focus:outline-none focus:underline focus:underline-offset-4">
                    Categories
                  </Button>
                  <Button variant="link" onClick={() => navigate("/about")} className="text-sm font-medium hover:text-amber-600 focus:outline-none focus:underline focus:underline-offset-4">
                    About
                  </Button>
                  <Button variant="link" onClick={() => navigate("/contact")} className="text-sm font-medium hover:text-amber-600 focus:outline-none focus:underline focus:underline-offset-4">
                    Contact
                  </Button>
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
                  {!isLoggedIn && (
                    <div className="hidden gap-2 sm:flex">
                      <Button variant="outline" onClick={() => navigate("/login")} className="border-amber-600 text-amber-600 hover:bg-amber-50">
                        Log In
                      </Button>
                      <Button onClick={() => navigate("/signup")} className="text-white bg-amber-600 hover:bg-amber-700">
                        Sign Up
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <div className="container flex justify-center py-1 font-serif text-sm bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 text-amber-800">
                Heavenly Bites, Eternal Delights
              </div>
            </header>
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <footer className="w-full border-t py-6 md:py-0 bg-[#6b4226] text-white">
              <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-sm leading-loose text-center md:text-left">
                  © {new Date().getFullYear()} Eternal Haven Kitchen. All rights reserved.
                </p>
                <nav aria-label="Footer Navigation">
                  <ul className="flex gap-4">
                    <li>
                      <Button variant="link" onClick={() => navigate("/terms")} className="text-sm font-medium hover:text-amber-300 focus:outline-none focus:underline focus:underline-offset-4">
                        Terms
                      </Button>
                    </li>
                    <li>
                      <Button variant="link" onClick={() => navigate("/privacy")} className="text-sm font-medium hover:text-amber-300 focus:outline-none focus:underline focus:underline-offset-4">
                        Privacy
                      </Button>
                    </li>
                    <li>
                      <Button variant="link" onClick={() => navigate("/contact")} className="text-sm font-medium hover:text-amber-300 focus:outline-none focus:underline focus:underline-offset-4">
                        Contact
                      </Button>
                    </li>
                  </ul>
                </nav>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
// C:\Users\Galathiea\Downloads\frontend-backup-main\src\pages\Login.tsx
"use client"

import type React from "react"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ChromeIcon as Google, Facebook } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"

// Import your API client and endpoints
import { authApi, endpoints } from '../utils/api'; // Adjust path if necessary

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(''); // State to display error messages
  const [showSocialConfirm, setShowSocialConfirm] = useState<{ show: boolean; provider: string }>({
    show: false,
    provider: "",
  })

  const handleSubmit = async (e: React.FormEvent) => { // Make this function async
    e.preventDefault();
    setIsLoading(true);
    setError(''); // Clear previous errors

    try {
      const response = await authApi.post(endpoints.auth.login, {
        email: email,
        username: email, // <--- CRITICAL FIX: Send email as username for JWT authentication
        password: password,
      });

      console.log('Login successful:', response.data);
      localStorage.setItem('token', response.data.access); // Save access token
      localStorage.setItem('refresh_token', response.data.refresh); // Save refresh token

      // You can remove this dummy flag, it's not truly needed if you rely on 'token'
      localStorage.setItem("isLoggedIn", "true"); // Optional: for immediate UI updates, but token is primary

      navigate('/'); // Redirect to home page after successful login
    } catch (err: any) { // Catch actual API errors
      setIsLoading(false); // Ensure loading state is reset on error
      console.error('Login failed:', err);

      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (err.response.status === 401) {
          setError('No active account found with the given credentials. Please check your email and password.'); // Covers "No active account"
        } else if (err.response.status === 405) {
          setError('Method "POST" not allowed for this endpoint. Please check backend URL configuration.'); // Covers "Method POST not allowed"
        } else if (err.response.data) {
          // Attempt to display specific backend validation errors
          if (err.response.data.detail) {
            setError(err.response.data.detail);
          } else if (err.response.data.username) {
            setError(`Username: ${err.response.data.username.join(', ')}`); // Catches "username is required"
          } else if (err.response.data.non_field_errors) {
            setError(err.response.data.non_field_errors.join(', '));
          } else {
            setError('Login failed. Please check your inputs or try again.'); // General fallback for other 4xx errors
          }
        } else {
          setError('An unexpected error occurred from the server. Please try again.');
        }
      } else if (err.request) {
        // The request was made but no response was received
        setError('No response from server. Please check your internet connection or server status.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false); // Ensure loading state is always reset
    }
  };

  // --- IMPORTANT: Social login needs similar API integration if you implement it ---
  const handleSocialLogin = (provider: string) => {
    // For now, keep simulation or integrate actual social login APIs later
    setShowSocialConfirm({ show: true, provider })
  }

  const confirmSocialLogin = () => {
    setIsLoading(true)
    setShowSocialConfirm({ show: false, provider: "" })

    // Simulate social login process - replace this with actual API call if applicable
    setTimeout(() => {
      setIsLoading(false)
      // Set login state
      localStorage.setItem("isLoggedIn", "true")
      // Redirect to home page after successful login
      navigate("/")
    }, 1500)
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-[#fffaf5]">
      <Card className="w-full max-w-md bg-white border-amber-200">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-[#2b2b2b]">Log in</CardTitle>
          <CardDescription className="text-[#6b6b6b]">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>} {/* Display error message */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#2b2b2b]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
                autoComplete="email"
                className="border-amber-200"
                value={email} // Controlled component
                onChange={(e) => setEmail(e.target.value)} // Update state on change
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-[#2b2b2b]">
                  Password
                </Label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-amber-800 hover:underline focus:outline-none focus:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                className="border-amber-200"
                value={password} // Controlled component
                onChange={(e) => setPassword(e.target.value)} // Update state on change
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-amber-200 checked:bg-amber-600 checked:border-amber-600"
              />
              <Label htmlFor="remember" className="text-sm text-[#6b6b6b]">
                Remember me
              </Label>
            </div>
            <Button type="submit" className="w-full text-white bg-amber-600 hover:bg-amber-700" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="w-4 h-4 mr-2 border-2 border-white rounded-full animate-spin border-t-transparent"></span>
                  Logging in...
                </span>
              ) : (
                "Log in"
              )}
            </Button>
          </form>
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-[#6b6b6b]">
              Don't have an account?{" "}
              <Link to="/signup" className="text-amber-800 hover:underline focus:outline-none focus:underline">
                Sign up
              </Link>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-amber-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-[#6b6b6b]">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Button
              variant="outline"
              className="flex items-center justify-center w-full gap-2 border-amber-200 hover:bg-amber-50 hover:text-amber-800"
              onClick={() => handleSocialLogin("Google")}
            >
              <Google className="w-4 h-4" />
              Google
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center w-full gap-2 border-amber-200 hover:bg-amber-50 hover:text-amber-800"
              onClick={() => handleSocialLogin("Facebook")}
            >
              <Facebook className="w-4 h-4" />
              Facebook
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Social Login Confirmation Dialog */}
      {showSocialConfirm.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg">
            <h2 className="mb-2 text-xl font-bold">Login with {showSocialConfirm.provider}</h2>
            <p className="text-[#6b6b6b] mb-4">
              You are about to log in using your {showSocialConfirm.provider} account. This will connect your{" "}
              {showSocialConfirm.provider} account to Eternal Haven Kitchen.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowSocialConfirm({ show: false, provider: "" })}
                className="border-amber-200"
              >
                Cancel
              </Button>
              <Button onClick={confirmSocialLogin} className="text-white bg-amber-600 hover:bg-amber-700">
                Continue with {showSocialConfirm.provider}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
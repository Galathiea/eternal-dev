"use client"

import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ChromeIcon as Google, Facebook } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"

import { authService } from "@/lib/api/authService"

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showSocialConfirm, setShowSocialConfirm] = useState<{ show: boolean; provider: string }>({
    show: false,
    provider: "",
  })
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check initial login state and redirect if already logged in
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    if (loggedIn) {
      navigate('/')
    }
  }, [navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await authService.login({
        username: email,
        password: password,
      })

      // Update login state and redirect
      setIsLoggedIn(true)
      localStorage.setItem("isLoggedIn", "true")
      navigate('/') // Immediate redirect after successful login
      
    } catch (err: any) {
      setIsLoading(false)
      console.error('Login failed:', err)

      if (err.response) {
        if (err.response.data) {
          if (err.response.data.detail) {
            setError(err.response.data.detail)
          } else if (err.response.data.username) {
            setError(`Username error: ${err.response.data.username.join(', ')}`)
          } else if (err.response.data.password) {
            setError(`Password error: ${err.response.data.password.join(', ')}`)
          } else if (err.response.data.non_field_errors) {
            setError(err.response.data.non_field_errors.join(', '))
          } else {
            setError(`Server error: ${err.response.statusText}`)
          }
        } else {
          setError(`HTTP Error ${err.response.status}: ${err.response.statusText}`)
        }
      } else if (err.request) {
        setError('No response from server. Please check if the backend is running.')
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider: string) => {
    setShowSocialConfirm({ show: true, provider })
  }

  const confirmSocialLogin = () => {
    setIsLoading(true)
    setShowSocialConfirm({ show: false, provider: "" })

    setTimeout(() => {
      setIsLoading(false)
      setIsLoggedIn(true)
      localStorage.setItem("isLoggedIn", "true")
      navigate("/") // Redirect after social login
    }, 1500)
  }

  // If already logged in, don't show the login page at all
  if (isLoggedIn) {
    return null // or a loading spinner if you prefer
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
            {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
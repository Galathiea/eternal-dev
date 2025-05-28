"use client"

import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"

export default function LoginPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Basic validation
      if (!formData.email.includes('@')) {
        throw new Error('Please enter a valid email address')
      }

      if (formData.password.length < 8) {
        throw new Error('Password must be at least 8 characters')
      }

      // Make API request
      const response = await fetch('http://127.0.0.1:8000/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.email,
          password: formData.password
        }),
        credentials: 'include' // For session cookies if using them
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          errorData.detail || 
          errorData.message || 
          `Login failed with status ${response.status}`
        )
      }

      const data = await response.json()

      // Store tokens or session information
      if (data.access_token) {
        localStorage.setItem('accessToken', data.access_token)
        navigate('/') // Redirect to home on success
      } else {
        throw new Error('No access token received')
      }

    } catch (err) {
      console.error('Login error:', err)
      setError(
        err instanceof Error ? 
        err.message : 
        'An unexpected error occurred. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
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
            {error && (
              <div className="p-3 mb-4 text-sm text-red-600 rounded-md bg-red-50">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="border-amber-200"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-amber-800 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                minLength={8}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="border-amber-200"
              />
            </div>

            <Button
              type="submit"
              className="w-full text-white bg-amber-600 hover:bg-amber-700"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log in'}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-[#6b6b6b]">
            Don't have an account?{' '}
            <Link to="/signup" className="text-amber-800 hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
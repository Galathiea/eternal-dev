"use client"

import React, { useState } from "react" // Ensure useState is imported
import { Link, useNavigate } from "react-router-dom"
import { ChromeIcon as Google, Facebook } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"

// IMPORT YOUR API UTILS HERE
import { api, endpoints } from '../utils/api'; // <--- CRITICAL: Ensure this path is correct and 'api' is imported

export default function SignupPage() {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false); // State for terms checkbox
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null); // State for displaying signup errors

    const [showSocialConfirm, setShowSocialConfirm] = useState<{ show: boolean; provider: string }>({
        show: false,
        provider: "",
    });

    const handleSubmit = async (e: React.FormEvent) => { // Make it async
        e.preventDefault();
        setIsLoading(true);
        setError(null); // Clear previous errors

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setIsLoading(false);
            return;
        }

        if (!termsAccepted) {
            setError("You must accept the terms of service and privacy policy.");
            setIsLoading(false);
            return;
        }

        try {
            // Actual registration request to your Django backend
            await api.post(endpoints.auth.register, { // Assuming 'endpoints.auth.register' is your registration endpoint
                first_name: firstName,
                last_name: lastName,
                email: email,
                username: email, // Often, email is used as username for registration
                password: password,
                password2: confirmPassword, // Your backend serializer might expect this for password confirmation
            });

            setIsLoading(false);
            // After successful registration, you might want to automatically log them in
            // or redirect them to the login page to log in.
            // For now, let's redirect to login.
            alert("Account created successfully! Please log in."); // Use a proper modal later instead of alert
            navigate("/login");
        } catch (err: any) { // Type the error for better handling
            setIsLoading(false);
            console.error("Signup failed:", err);
            if (err.response && err.response.data) {
                // Display specific error messages from backend validation
                if (err.response.data.email) {
                    setError(`Email: ${err.response.data.email.join(', ')}`);
                } else if (err.response.data.username) {
                    setError(`Username: ${err.response.data.username.join(', ')}`);
                } else if (err.response.data.password) {
                    setError(`Password: ${err.response.data.password.join(', ')}`);
                } else if (err.response.data.non_field_errors) {
                    setError(err.response.data.non_field_errors.join(', '));
                } else if (err.response.data.detail) {
                    setError(err.response.data.detail);
                } else {
                    setError("Registration failed. Please check your inputs.");
                }
            } else {
                setError("Registration failed. Please try again.");
            }
        }
    };

    // For now, simplify or remove social signup if not implemented
    const handleSocialSignup = (provider: string) => {
        setShowSocialConfirm({ show: true, provider });
    };

    const confirmSocialSignup = () => {
        setError("Social signup confirmation is not fully implemented yet.");
        setShowSocialConfirm({ show: false, provider: "" });
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-[#fffaf5]">
            <Card className="w-full max-w-md border-[#e6d7c8] bg-white">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-[#2b2b2b]">Create an account</CardTitle>
                    <CardDescription className="text-[#6b6b6b]">
                        Enter your information to create an Eternal Haven Kitchen account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Display error */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="first-name" className="text-[#2b2b2b]">
                                    First name
                                </Label>
                                <Input
                                    id="first-name"
                                    placeholder="Name"
                                    required
                                    autoComplete="given-name"
                                    className="border-[#e6d7c8]"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last-name" className="text-[#2b2b2b]">
                                    Last name
                                </Label>
                                <Input
                                    id="last-name"
                                    placeholder="Last Name"
                                    required
                                    autoComplete="family-name"
                                    className="border-[#e6d7c8]"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
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
                                className="border-[#e6d7c8]"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-[#2b2b2b]">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                autoComplete="new-password"
                                aria-describedby="password-requirements"
                                className="border-[#e6d7c8]"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <p id="password-requirements" className="text-xs text-[#6b6b6b]">
                                Password must be at least 8 characters long and include a number and a special character.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm-password" className="text-[#2b2b2b]">
                                Confirm password
                            </Label>
                            <Input
                                id="confirm-password"
                                type="password"
                                required
                                autoComplete="new-password"
                                className="border-[#e6d7c8]"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex items-start space-x-2">
                            <input
                                type="checkbox"
                                id="terms"
                                required
                                className="h-4 w-4 mt-1 rounded border-[#e6d7c8] checked:bg-[#e67839] checked:border-[#e67e39]"
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                            />
                            <div className="grid gap-1.5 leading-none">
                                <Label htmlFor="terms" className="text-sm text-[#6b6b6b]">
                                    I agree to the{" "}
                                    <Link to="/terms" className="text-[#e67839] hover:underline focus:outline-none focus:underline">
                                        terms of service
                                    </Link>{" "}
                                    and{" "}
                                    <Link to="/privacy" className="text-[#e67839] hover:underline focus:outline-none focus:underline">
                                        privacy policy
                                    </Link>
                                </Label>
                            </div>
                        </div>
                        <Button type="submit" className="w-full bg-[#e67e39] hover:bg-[#d67e2b] text-white" disabled={isLoading}>
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <span className="w-4 h-4 mr-2 border-2 border-white rounded-full animate-spin border-t-transparent"></span>
                                    Creating account...
                                </span>
                            ) : (
                                "Create account"
                            )}
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm text-[#6b6b6b]">
                        Already have an account?{" "}
                        <Link to="/login" className="text-[#e67839] hover:underline focus:outline-none focus:underline">
                            Log in
                        </Link>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <div className="relative my-2">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-[#e6d7c8]" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-[#6b6b6b]">Or continue with</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        <Button
                            variant="outline"
                            className="w-full border-[#e6d7c8] hover:bg-[#f8edeb] hover:text-[#d38c52] flex items-center justify-center gap-2"
                            onClick={() => handleSocialSignup("Google")}
                        >
                            <Google className="w-4 h-4" />
                            Google
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full border-[#e6d7c8] hover:bg-[#f8edeb] hover:text-[#c57651] flex items-center justify-center gap-2"
                            onClick={() => handleSocialSignup("Facebook")}
                        >
                            <Facebook className="w-4 h-4" />
                            Facebook
                        </Button>
                    </div>
                </CardFooter>

                {showSocialConfirm.show && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                        <div className="w-full max-w-md p-6 bg-white rounded-lg">
                            <h2 className="mb-2 text-xl font-bold">Sign up with {showSocialConfirm.provider}</h2>
                            <p className="text-[#6b6b6b] mb-4">
                                You are about to create an account using your {showSocialConfirm.provider} account. This will connect your{" "}
                                {showSocialConfirm.provider} account to Eternal Haven Kitchen.
                            </p>
                            <div className="flex justify-end gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowSocialConfirm({ show: false, provider: "" })}
                                    className="border-[#e6d7c8]"
                                >
                                    Cancel
                                </Button>
                                <Button onClick={confirmSocialSignup} className="bg-[#d37844] hover:bg-[#d88847] text-white">
                                    Continue with {showSocialConfirm.provider}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    )
}
// src/components/AuthForm.tsx

import React, { useState } from 'react';
// Adjust the import based on the actual export from AuthContext
// If useAuth is a default export:
import { useAuth } from '../context/AuthContext';
// Or, if it's exported as part of an object (e.g., AuthContext):
// import { AuthContext } from '../context/AuthContext';
// const useAuth = () => React.useContext(AuthContext);
import { useNavigate } from 'react-router-dom';

interface AuthFormProps {
  mode: 'login' | 'signup';
}

export const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    // --- ADD THESE FOR SIGNUP MODE (to match SignupCredentials) ---
    first_name: '', // Initialize
    last_name: '',  // Initialize
  });
  const [error, setError] = useState('');
  // login and signup types here will now correctly expect first_name/last_name for signup
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (mode === 'login') {
        // Login credentials only require username and password
        await login({
          username: formData.username,
          password: formData.password,
        });
      } else { // mode === 'signup'
        // Signup credentials require username, email, password, first_name, and last_name
        await signup({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          // --- PASS THESE TO SIGNUP TO MATCH SignupCredentials ---
          first_name: formData.first_name,
          last_name: formData.last_name,
        });
      }
      navigate('/dashboard'); // Redirect to dashboard after successful auth
    } catch (err: any) {
      console.error('AuthForm submission error:', err);
      // More robust error handling for API responses
      setError(err.response?.data?.detail // For general error detail from DRF
               || err.response?.data?.username?.join(' ') // For specific field errors
               || err.response?.data?.email?.join(' ')
               || err.response?.data?.password?.join(' ')
               || err.message // For network errors or generic JS errors
               || 'An authentication error occurred. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {mode === 'login' ? 'Login' : 'Sign Up'}
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        {mode === 'signup' && (
          <> {/* Use a React Fragment to group multiple elements */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            {/* --- ADD FIRST NAME INPUT FIELD --- */}
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name" // Important: `name` must match state property
                value={formData.first_name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required // Adjust 'required' based on your Django backend's requirements
              />
            </div>
            {/* --- ADD LAST NAME INPUT FIELD --- */}
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name" // Important: `name` must match state property
                value={formData.last_name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required // Adjust 'required' based on your Django backend's requirements
              />
            </div>
          </>
        )}

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {mode === 'login' ? 'Login' : 'Sign Up'}
        </button>
      </form> {/* <--- This is the correct closing tag for the form */}

              <p className="mt-4 text-center text-sm text-gray-600">
                    {mode === 'login'
                      ? "Don't have an account? Sign up!"
                      : "Already have an account? Log in!"}
                </p>
            </div>
          );
      };
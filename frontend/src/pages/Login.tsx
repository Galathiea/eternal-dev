// src/pages/Login.tsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login, isAuthenticated } = useAuth(); // Get isAuthenticated from context
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      await login({ username, password }); // Call the login function from AuthContext

      // --- CRITICAL CHANGE HERE ---
      // Instead of navigating immediately, rely on AuthContext's isAuthenticated
      // or check it right after the login call.
      // The useAuth hook will re-render when isAuthenticated changes.
      // If the login call resolves, it means tokens are stored and user state is updated.
      // A simple check like this should suffice, as useAuth's state updates should trigger re-renders.
      if (isAuthenticated) { // This check might be too fast, better to use a useEffect
        // Not ideal to navigate here immediately as isAuthenticated might not be updated yet
        // A better approach is to use a useEffect that watches `isAuthenticated`
      }

    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err.response?.data?.detail || err.message || 'Login failed. Please check your credentials.');
    }
  };

  // --- ADD THIS useEffect to navigate after authentication state is truly set ---
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Navigate to home page or dashboard
    }
  }, [isAuthenticated, navigate]);


  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
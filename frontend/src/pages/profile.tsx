import React, { useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { api } from '../config/api';

export const Profile: React.FC = () => {
  const { user, isAuthenticated, updateUser } = useAuth();
  const navigate = useNavigate();

  // Function to fetch and update user data
  const refreshProfile = useCallback(async () => {
    try {
      const response = await api.get('/api/auth/user/');
      updateUser(response.data);
    } catch (error) {
      console.error('Error refreshing profile:', error);
      if (
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        (error as any).response?.status === 401
      ) {
        navigate('/login');
      }
    }
  }, [updateUser, navigate]);

  // Redirect if not authenticated and fetch data if authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      refreshProfile();
    }
  }, [isAuthenticated, navigate, refreshProfile]);

  if (!isAuthenticated || !user) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Username:</span>
          <span className="font-medium">{user.username}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Email:</span>
          <span className="font-medium">{user.email}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">User ID:</span>
          <span className="font-medium">{user.id}</span>
        </div>
        
        <button
          onClick={refreshProfile}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Refresh Profile
        </button>
      </div>
    </div>
  );
};
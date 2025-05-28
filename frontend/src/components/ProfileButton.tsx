import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

// Add the ProfileButtonProps interface
interface ProfileButtonProps {
  isLoggedIn: boolean;
  userName: string;
}

// Refactor to ProfileButton component
const ProfileButton: React.FC<ProfileButtonProps> = ({ isLoggedIn, userName }) => {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=200&width=200");

  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("profileImage");
    navigate("/login");
  };

  if (!isLoggedIn) {
    return (
      <Link
        to="/login"
        className="flex items-center space-x-2 font-medium text-orange-600 hover:underline"
      >
        <span>Sign In</span>
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-2"
        onClick={() => setProfileOpen(!profileOpen)}
      >
        <img
          src={profileImage}
          alt="Profile"
          className="object-cover w-8 h-8 rounded-full"
        />
        <span className="font-medium text-orange-600">
          {userName || "User"}
        </span>
      </button>
      {profileOpen && (
        <div className="absolute right-0 z-50 w-48 py-1 mt-2 bg-white rounded-md shadow-lg">
          <Link
            to="/profile"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setProfileOpen(false)}
          >
            My Profile
          </Link>
          <Link
            to="/settings"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setProfileOpen(false)}
          >
            Settings
          </Link>
          <button
            onClick={handleSignOut}
            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
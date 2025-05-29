import React, { useState } from "react";
import { Link } from "react-router-dom";

type UserData = {
  firstName?: string;
  // add other user fields if needed
};

interface ProfileButtonProps {
  userData?: UserData;
  profileImage?: string;
  handleSignOut?: () => void;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({
  userData = { firstName: "" },
  profileImage = "https://via.placeholder.com/32",
  handleSignOut = () => {},
}) => {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-2 focus:outline-none"
        onClick={() => setProfileOpen(!profileOpen)}
        aria-label="Profile menu"
        aria-expanded={profileOpen}
      >
        <div className="relative">
          <img
            src={profileImage}
            alt="Profile"
            className="object-cover w-8 h-8 border border-orange-200 rounded-full"
          />
          {/* Optional online status indicator */}
          <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 border border-white rounded-full"></span>
        </div>
        <span className="font-medium text-orange-600">
          {userData.firstName || "User"}
        </span>
        {/* Dropdown indicator */}
        <svg
          className={`w-4 h-4 text-orange-600 transition-transform ${profileOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {profileOpen && (
        <div className="absolute right-0 z-50 w-48 py-1 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <Link
            to="/profile"
            className="block px-4 py-2 text-gray-700 transition-colors hover:bg-orange-50 hover:text-orange-600"
            onClick={() => setProfileOpen(false)}
          >
            My Profile
          </Link>
          <Link
            to="/settings"
            className="block px-4 py-2 text-gray-700 transition-colors hover:bg-orange-50 hover:text-orange-600"
            onClick={() => setProfileOpen(false)}
          >
            Settings
          </Link>
          <button
            onClick={handleSignOut}
            className="block w-full px-4 py-2 text-left text-gray-700 transition-colors hover:bg-orange-50 hover:text-orange-600"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
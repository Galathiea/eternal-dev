import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=200&width=200");
  const [profileOpen, setProfileOpen] = useState(false); // For dropdown menu

  const [userData, setUserData] = useState(() => {
    const savedData = localStorage.getItem("userData");
    return savedData
      ? JSON.parse(savedData)
      : {
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          phone: "(555) 123-4567",
          address: {
            street: "123 Main St",
            apt: "Apt 4B",
            city: "New York",
            state: "NY",
            zip: "10001",
            country: "United States",
          },
          paymentMethods: [
            {
              id: "card1",
              type: "Credit Card",
              last4: "4567",
              expiry: "05/28",
            },
          ],
          orders: [],
        };
  });

  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const result = e.target.result as string;
          setProfileImage(result);
          localStorage.setItem("profileImage", result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
      localStorage.setItem("userData", JSON.stringify(userData));
    }, 1000);
  };

  const handleSignOut = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("profileImage");
    navigate("/login");
  };

  return (
    <div className="bg-[#fffaf5] min-h-screen py-8">
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container flex items-center justify-between px-6 py-4 mx-auto">
          <h1 className="text-2xl font-bold text-orange-600">EternalHavenKitchen</h1>
          
          <div className="flex items-center space-x-4">
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
                  {userData.firstName || "User"}
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
          </div>
        </div>
      </header>

      <div className="container px-4 mt-8 md:px-6">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="md:w-1/3 lg:w-1/4">
            <div className="border-[#e6d7c8] bg-white p-4 rounded-lg">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <img src={profileImage} alt={`${userData.firstName} ${userData.lastName}`} className="w-24 h-24 rounded-full" />
                  {isEditing && (
                    <label htmlFor="profile-image" className="absolute bottom-0 right-0 bg-[#e63946] text-white p-1 rounded-full cursor-pointer">
                      <span className="w-4 h-4">📷</span>
                      <input id="profile-image" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                  )}
                </div>
                <h2 className="text-xl font-bold text-[#2b2b2b]">{userData.firstName} {userData.lastName}</h2>
                <p className="text-[#6b6b6b]">{userData.email}</p>
              </div>
              <div className="mt-4 space-y-4">
                <button 
                  className="w-full border-[#e6d7c8] hover:bg-[#f8edeb] hover:text-[#e63946] p-2" 
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Cancel Editing" : "Edit Profile"}
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white border-[#e6d7c8] rounded-lg p-4">
              <h3 className="text-xl font-bold text-[#2b2b2b]">Personal Information</h3>
              <div className="space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="first-name">First Name</label>
                      <input
                        id="first-name"
                        value={userData.firstName}
                        onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                        className="border-[#e6d7c8] p-2 w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="last-name">Last Name</label>
                      <input
                        id="last-name"
                        value={userData.lastName}
                        onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                        className="border-[#e6d7c8] p-2 w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        className="border-[#e6d7c8] p-2 w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone">Phone</label>
                      <input
                        id="phone"
                        value={userData.phone}
                        onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                        className="border-[#e6d7c8] p-2 w-full"
                      />
                    </div>
                    <button 
                      onClick={handleSaveProfile} 
                      className="bg-[#e63946] hover:bg-[#d62b39] text-white p-2"
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="h-5 w-5 text-[#e63946]">👤</span>
                      <div>
                        <p className="font-medium text-[#2b2b2b]">Full Name</p>
                        <p className="text-[#6b6b6b]">{userData.firstName} {userData.lastName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-5 w-5 text-[#e63946]">📧</span>
                      <div>
                        <p className="font-medium text-[#2b2b2b]">Email</p>
                        <p className="text-[#6b6b6b]">{userData.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-5 w-5 text-[#e63946]">📞</span>
                      <div>
                        <p className="font-medium text-[#2b2b2b]">Phone</p>
                        <p className="text-[#6b6b6b]">{userData.phone}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
"use client"

import { useState } from "react"
import { User, MapPin, Mail, Phone, ShoppingBag, LogOut, Edit, Camera, Save, ArrowLeft } from "lucide-react"

interface Address {
  street: string
  apt: string
  city: string
  state: string
  zip: string
  country: string
}

interface Order {
  id: string
  date: string
  total: number
  status: string
}

interface UserData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: Address
  orders: Order[]
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=200&width=200")

  const [userData, setUserData] = useState<UserData>({
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
    orders: [
      {
        id: "ORD-12345",
        date: "March 5, 2025",
        total: 59.31,
        status: "Delivered",
      },
      {
        id: "ORD-12346",
        date: "February 20, 2025",
        total: 42.75,
        status: "Processing",
      },
    ],
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveProfile = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsEditing(false)
    }, 1000)
  }

  const handleLogout = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      alert("Logged out successfully!")
    }, 1000)
  }

  const [activeTab, setActiveTab] = useState("personal")

  return (
    <div className="min-h-screen py-8 bg-orange-50">
      <div className="container px-4 mx-auto">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-4 py-2 mb-6 text-gray-600 transition-colors hover:text-red-600"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Profile Sidebar */}
          <div className="md:w-1/3 lg:w-1/4">
            <div className="overflow-hidden bg-white border border-orange-200 rounded-xl">
              <div className="p-6 pb-2">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 overflow-hidden rounded-full">
                      <img 
                        src={profileImage} 
                        alt={`${userData.firstName} ${userData.lastName}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {isEditing && (
                      <label
                        htmlFor="profile-image"
                        className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full cursor-pointer"
                      >
                        <Camera className="w-4 h-4" />
                        <input
                          id="profile-image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </label>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {userData.firstName} {userData.lastName}
                  </h2>
                  <p className="text-gray-600">{userData.email}</p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <div className="space-y-4">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center justify-center w-full px-4 py-2 transition-colors border border-orange-200 rounded-lg hover:bg-orange-50 hover:text-red-600"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? "Cancel Editing" : "Edit Profile"}
                  </button>
                  <button
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="flex items-center justify-center w-full px-4 py-2 transition-colors border border-orange-200 rounded-lg hover:bg-orange-50 hover:text-red-600 disabled:opacity-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {isLoading ? "Logging out..." : "Log Out"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="flex-1">
            <div className="w-full">
              <div className="flex border-b border-orange-200">
                <button
                  onClick={() => setActiveTab("personal")}
                  className={`px-4 py-2 font-medium ${activeTab === "personal" ? "text-red-600 border-b-2 border-red-600" : "text-gray-600"}`}
                >
                  Personal
                </button>
                <button
                  onClick={() => setActiveTab("address")}
                  className={`px-4 py-2 font-medium ${activeTab === "address" ? "text-red-600 border-b-2 border-red-600" : "text-gray-600"}`}
                >
                  Address
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`px-4 py-2 font-medium ${activeTab === "orders" ? "text-red-600 border-b-2 border-red-600" : "text-gray-600"}`}
                >
                  Orders
                </button>
              </div>

              {/* Personal Information Tab */}
              {activeTab === "personal" && (
                <div className="p-6 mt-2 bg-white border border-orange-200 rounded-xl">
                  <h2 className="mb-2 text-xl font-bold text-gray-800">Personal Information</h2>
                  <p className="mb-6 text-gray-600">Manage your personal details</p>
                  
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <label htmlFor="first-name" className="block mb-2 text-sm font-medium text-gray-800">
                            First Name
                          </label>
                          <input
                            id="first-name"
                            value={userData.firstName}
                            onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                            className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:ring-1 focus:ring-red-600 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label htmlFor="last-name" className="block mb-2 text-sm font-medium text-gray-800">
                            Last Name
                          </label>
                          <input
                            id="last-name"
                            value={userData.lastName}
                            onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                            className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:ring-1 focus:ring-red-600 focus:outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-800">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={userData.email}
                          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                          className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:ring-1 focus:ring-red-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-800">
                          Phone
                        </label>
                        <input
                          id="phone"
                          value={userData.phone}
                          onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                          className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:ring-1 focus:ring-red-600 focus:outline-none"
                        />
                      </div>
                      <button
                        onClick={handleSaveProfile}
                        className="flex items-center justify-center w-full px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <span className="w-4 h-4 mr-2 border-2 border-white rounded-full animate-spin border-t-transparent" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-red-600" />
                        <div>
                          <p className="font-medium text-gray-800">Full Name</p>
                          <p className="text-gray-600">
                            {userData.firstName} {userData.lastName}
                          </p>
                        </div>
                      </div>
                      <div className="h-px my-2 bg-orange-200"></div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-red-600" />
                        <div>
                          <p className="font-medium text-gray-800">Email</p>
                          <p className="text-gray-600">{userData.email}</p>
                        </div>
                      </div>
                      <div className="h-px my-2 bg-orange-200"></div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-red-600" />
                        <div>
                          <p className="font-medium text-gray-800">Phone</p>
                          <p className="text-gray-600">{userData.phone}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Address Tab */}
              {activeTab === "address" && (
                <div className="p-6 mt-2 bg-white border border-orange-200 rounded-xl">
                  <h2 className="mb-2 text-xl font-bold text-gray-800">Address Information</h2>
                  <p className="mb-6 text-gray-600">Manage your shipping address</p>
                  
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="street" className="block mb-2 text-sm font-medium text-gray-800">
                          Street Address
                        </label>
                        <input
                          id="street"
                          value={userData.address.street}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              address: { ...userData.address, street: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:ring-1 focus:ring-red-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label htmlFor="apt" className="block mb-2 text-sm font-medium text-gray-800">
                          Apartment, suite, etc. (optional)
                        </label>
                        <input
                          id="apt"
                          value={userData.address.apt}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              address: { ...userData.address, apt: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:ring-1 focus:ring-red-600 focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                          <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-800">
                            City
                          </label>
                          <input
                            id="city"
                            value={userData.address.city}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                address: { ...userData.address, city: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:ring-1 focus:ring-red-600 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-800">
                            State
                          </label>
                          <input
                            id="state"
                            value={userData.address.state}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                address: { ...userData.address, state: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:ring-1 focus:ring-red-600 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label htmlFor="zip" className="block mb-2 text-sm font-medium text-gray-800">
                            ZIP Code
                          </label>
                          <input
                            id="zip"
                            value={userData.address.zip}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                address: { ...userData.address, zip: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:ring-1 focus:ring-red-600 focus:outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-800">
                          Country
                        </label>
                        <input
                          id="country"
                          value={userData.address.country}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              address: { ...userData.address, country: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:ring-1 focus:ring-red-600 focus:outline-none"
                        />
                      </div>
                      <button
                        onClick={handleSaveProfile}
                        className="flex items-center justify-center w-full px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <span className="w-4 h-4 mr-2 border-2 border-white rounded-full animate-spin border-t-transparent" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 mt-1 text-red-600" />
                        <div>
                          <p className="font-medium text-gray-800">Shipping Address</p>
                          <p className="text-gray-600">{userData.address.street}</p>
                          {userData.address.apt && <p className="text-gray-600">{userData.address.apt}</p>}
                          <p className="text-gray-600">
                            {userData.address.city}, {userData.address.state} {userData.address.zip}
                          </p>
                          <p className="text-gray-600">{userData.address.country}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div className="p-6 mt-2 bg-white border border-orange-200 rounded-xl">
                  <h2 className="mb-2 text-xl font-bold text-gray-800">Order History</h2>
                  <p className="mb-6 text-gray-600">View your recent orders</p>
                  
                  <div className="space-y-4">
                    {userData.orders.map((order) => (
                      <div key={order.id} className="p-4 border border-orange-100 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <ShoppingBag className="w-5 h-5 text-red-600" />
                              <p className="font-medium text-gray-800">Order #{order.id}</p>
                            </div>
                            <p className="text-sm text-gray-600">{order.date}</p>
                            <p className="text-lg font-bold text-gray-800">${order.total.toFixed(2)}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            order.status === "Delivered" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
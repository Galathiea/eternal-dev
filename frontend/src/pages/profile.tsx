import { useState, useRef } from 'react';
import '@/ProfilePage.css';
import { Link } from 'react-router-dom';

type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
};

type Order = {
  id: string;
  date: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'Delivered' | 'Processing' | 'Cancelled';
};

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

const ProfilePage = () => {

  const [profile, setProfile] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    email: '',
    profileImage: '/default-avatar.jpg',
  });

  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState({ firstName: '', lastName: '' });
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [tempEmail, setTempEmail] = useState('');

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Active tab state
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'cart'>('profile');

  // Empty orders array - will be populated from API
  const [orders, setOrders] = useState<Order[]>([]);

  // Empty cart - will be populated when user adds items
  const [cart, setCart] = useState<CartItem[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfile({ ...profile, profileImage: event.target.result as string });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setProfile({ ...profile, profileImage: '/default-avatar.jpg' });
  };

  const startEditingName = () => {
    setTempName({ firstName: profile.firstName, lastName: profile.lastName });
    setIsEditingName(true);
  };

  const saveNameChanges = () => {
    setProfile({
      ...profile,
      firstName: tempName.firstName,
      lastName: tempName.lastName,
    });
    setIsEditingName(false);
  };

  const cancelEditingName = () => {
    setTempName({ firstName: '', lastName: '' });
    setIsEditingName(false);
  };

  const startEditingEmail = () => {
    setTempEmail(profile.email);
    setIsEditingEmail(true);
  };

  const saveEmailChanges = () => {
    setProfile({ ...profile, email: tempEmail });
    setIsEditingEmail(false);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    alert('Password changed successfully!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };



  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Account</h1>
        <div className="profile-tabs">
          <button
            className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Order History
          </button>
          <button
            className={`tab-button ${activeTab === 'cart' ? 'active' : ''}`}
            onClick={() => setActiveTab('cart')}
          >
            My Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
          </button>
        </div>
      </div>

      <div className="profile-content">
        {activeTab === 'profile' && (
          <>
            <div className="profile-section">
              <div className="profile-picture-container">
                <img
                  src={profile.profileImage}
                  alt="Profile"
                  className="profile-image"
                />
                <div className="picture-actions">
                  <button
                    className="btn-secondary"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Change Picture
                  </button>
                  <button className="btn-text" onClick={handleRemoveImage}>
                    Remove
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                </div>
                <p className="image-hint">JPG, GIF or PNG. Max size 2MB</p>
              </div>
            </div>

            <div className="profile-section">
              <h2>Personal Information</h2>
              {!isEditingName ? (
                <div className="profile-info-display">
                  <p>
                    <strong>Name:</strong> {profile.firstName} {profile.lastName}
                  </p>
                  <button className="btn-secondary" onClick={startEditingName}>
                    Edit Name
                  </button>
                </div>
              ) : (
                <div className="profile-info-edit">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      value={tempName.firstName}
                      onChange={(e) =>
                        setTempName({ ...tempName, firstName: e.target.value })
                      }
                      placeholder="Enter first name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      value={tempName.lastName}
                      onChange={(e) =>
                        setTempName({ ...tempName, lastName: e.target.value })
                      }
                      placeholder="Enter last name"
                    />
                  </div>
                  <div className="edit-actions">
                    <button className="btn-primary" onClick={saveNameChanges}>
                      Save
                    </button>
                    <button className="btn-text" onClick={cancelEditingName}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {!isEditingEmail ? (
                <div className="profile-info-display">
                  <p>
                    <strong>Email:</strong> {profile.email || 'Not set'}
                  </p>
                  <button className="btn-secondary" onClick={startEditingEmail}>
                    Edit Email
                  </button>
                </div>
              ) : (
                <div className="profile-info-edit">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={tempEmail}
                      onChange={(e) => setTempEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="edit-actions">
                    <button className="btn-primary" onClick={saveEmailChanges}>
                      Save
                    </button>
                    <button className="btn-text" onClick={() => setIsEditingEmail(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="profile-section">
              <h2>Change Password</h2>
              <form onSubmit={handlePasswordChange}>
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    required
                    placeholder="Enter current password"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    required
                    placeholder="Enter new password"
                  />
                  <small>
                    Minimum 8 characters with at least one number and one special character
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                    placeholder="Confirm new password"
                  />
                </div>
                <button type="submit" className="btn-primary">
                  Update Password
                </button>
              </form>
            </div>
          </>
        )}

        {activeTab === 'orders' && (
          <div className="orders-section">
            <h2>Order History</h2>
            {orders.length === 0 ? (
              <div className="empty-state">
                <p className="empty-message">You haven't placed any orders yet.</p>
                <Link to="/categories" className="btn-primary">
                  Browse Recipes
                </Link>
              </div>
            ) : (
              <div className="orders-list">
                {/* Orders will render here when populated */}
              </div>
            )}
          </div>
        )}

        {activeTab === 'cart' && (
          <div className="cart-section">
            <h2>My Cart</h2>
            {cart.length === 0 ? (
              <div className="empty-state">
                <p className="empty-message">Your cart is empty.</p>
                <Link to="/categories" className="btn-primary">
                  Start Shopping
                </Link>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {/* Cart items will render here when populated */}
                </div>
                <div className="cart-summary">
                  <div className="cart-total">
                    <span>Subtotal:</span>
                    <span>
                      ${cart
                        .reduce(
                          (total, item) => total + item.price * item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </div>
                  <button className="btn-primary checkout-btn">
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
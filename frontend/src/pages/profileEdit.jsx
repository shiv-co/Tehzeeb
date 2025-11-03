import React, { useState, useEffect } from 'react';
import { FiUser, FiEdit2, FiMail, FiPhone, FiLoader } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

// Updated color theme
const COLORS = {
  primary: '#B3541E', // Terracotta
  secondary: '#D6A74F', // Mustard Gold
  accent: '#A5A58D', // Sage Green
  text: '#3E2F1C', // Deep Brown
  background: '#F5EBDD', // Linen / Sand
};

export default function ProfileEditPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user info and loading/error states from Redux
  const { userInfo, loading, error } = useSelector((state) => state.auth);

  // Form state, initialized as empty
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // UI state
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // When userInfo loads or changes, populate the form
  useEffect(() => {
    if (userInfo) {
      setFirstName(userInfo.name ? userInfo.name.split(' ')[0] : '');
      setLastName(
        userInfo.name ? userInfo.name.split(' ').slice(1).join(' ') : ''
      );
      setEmail(userInfo.email || '');
      setPhone(userInfo.phone || '');
      setGender(userInfo.gender || '');
    } else {
      // If no userInfo (logged out), redirect to login
      navigate('/login');
    }
  }, [userInfo, navigate]);

  // Handle Save Changes
  const handleSave = async (e) => {
    e.preventDefault();
    const name = `${firstName} ${lastName}`.trim();

    // Dispatch the update action
    const result = await dispatch(
      updateUserProfile({ name, email, phone, gender })
    );

    // If the update was successful, show a message and exit edit mode
    if (updateUserProfile.fulfilled.match(result)) {
      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3s
    }
  };

  // Handle Cancel Edit
  const handleCancel = () => {
    // Reset form fields to original userInfo
    if (userInfo) {
      setFirstName(userInfo.name ? userInfo.name.split(' ')[0] : '');
      setLastName(
        userInfo.name ? userInfo.name.split(' ').slice(1).join(' ') : ''
      );
      setEmail(userInfo.email || '');
      setPhone(userInfo.phone || '');
      setGender(userInfo.gender || '');
    }
    setIsEditing(false);
  };

  // Show a loader or null while redirecting if user is logged out
  if (!userInfo) {
    return null;
  }

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row items-start py-8 px-2"
      style={{ background: COLORS.background }}
    >
      {/* Sidebar - hidden on mobile, shown on large devices */}
      <aside
        className="hidden lg:flex w-full max-w-xs rounded-xl shadow-2xl p-5 mr-8 flex-col gap-6"
        style={{
          background: '#fff',
          boxShadow: `0 4px 24px 0 ${COLORS.accent}50`,
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="rounded-full h-14 w-14 flex items-center justify-center"
            style={{ background: COLORS.secondary }}
          >
            <FiUser style={{ color: COLORS.primary }} size={32} />
          </div>
          <div>
            <div className="text-xs" style={{ color: COLORS.accent }}>
              Hello,
            </div>
            <div
              className="font-bold text-lg leading-tight"
              style={{ color: COLORS.primary }}
            >
              {userInfo.name}
            </div>
          </div>
        </div>
        <nav className="flex flex-col gap-1">
          <div
            className="font-semibold text-sm opacity-80 flex items-center gap-2 mt-4 mb-1"
            style={{ color: COLORS.text }}
          >
            <FiUser className="inline" /> ACCOUNT SETTINGS
          </div>
          <a
            href="#" // This is already the active page, so no link needed
            className="font-semibold rounded px-3 py-2 text-sm"
            style={{
              background: COLORS.accent,
              color: COLORS.primary,
            }}
          >
            Profile Information
          </a>
          {/* You could add more links here later, e.g., "My Orders", "Security" */}
        </nav>
      </aside>

      {/* Main Form */}
      <form
        onSubmit={handleSave}
        className="flex-1 rounded-xl shadow-2xl p-8 w-full"
        style={{
          background: '#fff',
          boxShadow: `0 4px 24px 0 ${COLORS.accent}50`,
        }}
      >
        {/* Form-level Success/Error Messages */}
        {successMessage && (
          <div
            className="mb-4 p-3 rounded-md text-center font-semibold"
            style={{ background: COLORS.accent, color: COLORS.primary }}
          >
            {successMessage}
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 rounded-md bg-red-100 text-red-700 text-center font-semibold">
            Error: {error}
          </div>
        )}

        {/* Personal Information */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold" style={{ color: COLORS.primary }}>
              Personal Information
            </h2>
            {/* Simplified Edit/Cancel button */}
            {!isEditing ? (
              <button
                type="button"
                className="text-sm flex items-center gap-1"
                style={{ color: COLORS.primary }}
                onClick={() => setIsEditing(true)}
                onMouseOver={(e) =>
                  (e.currentTarget.style.color = COLORS.secondary)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.color = COLORS.primary)
                }
              >
                <FiEdit2 size={16} /> Edit
              </button>
            ) : (
              <button
                type="button"
                className="text-sm flex items-center gap-1"
                style={{ color: COLORS.accent }}
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-3">
            <input
              type="text"
              disabled={!isEditing}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`w-full md:w-1/2 px-4 py-2 rounded border`}
              style={{
                color: COLORS.text,
                background: isEditing ? '#fff' : COLORS.background,
                borderColor: isEditing ? COLORS.secondary : COLORS.accent,
              }}
              placeholder="First Name"
            />
            <input
              type="text"
              disabled={!isEditing}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`w-full md:w-1/2 px-4 py-2 rounded border`}
              style={{
                color: COLORS.text,
                background: isEditing ? '#fff' : COLORS.background,
                borderColor: isEditing ? COLORS.secondary : COLORS.accent,
              }}
              placeholder="Last Name"
            />
          </div>
          <div className="mb-2 font-medium" style={{ color: COLORS.text }}>
            Your Gender
          </div>
          <div className="flex gap-4 mb-2">
            <label
              className="flex items-center gap-1 text-sm"
              style={{ color: COLORS.text }}
            >
              <input
                type="radio"
                name="gender"
                value="Male"
                disabled={!isEditing}
                checked={gender === 'Male'}
                onChange={(e) => setGender(e.target.value)}
                className="accent-[#B3541E]"
              />
              Male
            </label>
            <label
              className="flex items-center gap-1 text-sm"
              style={{ color: COLORS.text }}
            >
              <input
                type="radio"
                name="gender"
                value="Female"
                disabled={!isEditing}
                checked={gender === 'Female'}
                onChange={(e) => setGender(e.target.value)}
                className="accent-[#B3541E]"
              />
              Female
            </label>
            <label
              className="flex items-center gap-1 text-sm"
              style={{ color: COLORS.text }}
            >
              <input
                type="radio"
                name="gender"
                value="Other"
                disabled={!isEditing}
                checked={gender === 'Other'}
                onChange={(e) => setGender(e.target.value)}
                className="accent-[#B3541E]"
              />
              Other
            </label>
          </div>
        </section>

        {/* Email */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2
              className="text-xl font-bold flex items-center gap-2"
              style={{ color: COLORS.primary }}
            >
              <FiMail /> Email Address
            </h2>
          </div>
          <input
            type="email"
            disabled={!isEditing}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded border"
            style={{
              color: COLORS.text,
              background: isEditing ? '#fff' : COLORS.background,
              borderColor: isEditing ? COLORS.secondary : COLORS.accent,
            }}
            placeholder="Email Address"
          />
        </section>

        {/* Mobile */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2
              className="text-xl font-bold flex items-center gap-2"
              style={{ color: COLORS.primary }}
            >
              <FiPhone /> Mobile Number
            </h2>
          </div>
          <input
            type="tel"
            disabled={!isEditing}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 rounded border"
            style={{
              color: COLORS.text,
              background: isEditing ? '#fff' : COLORS.background,
              borderColor: isEditing ? COLORS.secondary : COLORS.accent,
            }}
            placeholder="Mobile Number"
          />
        </section>

        {/* Save Button */}
        {isEditing && (
          <button
            type="submit"
            className="mt-2 px-8 py-3 w-full md:w-auto rounded font-semibold transition flex items-center justify-center gap-2"
            style={{
              background: COLORS.primary,
              color: '#fff',
              boxShadow: `0 2px 8px 0 ${COLORS.secondary}40`,
            }}
            disabled={loading}
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin" /> Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        )}
      </form>
    </div>
  );
}


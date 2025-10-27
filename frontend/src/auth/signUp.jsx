import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/authSlice'; // <-- Check this import path

// Your Brand's Color Theme
const COLORS = {
  primary: '#B3541E',
  secondary: '#D6A74F',
  accent: '#A5A58D',
  text: '#3E2F1C',
  background: '#F5EBDD',
};

export default function SignUpPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [localError, setLocalError] = useState(''); // For password mismatch

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get auth state from Redux
  const { loading, error, userInfo } = useSelector((state) => state.auth);

  // Redirect if already logged in
  useEffect(() => {
    if (userInfo) {
      navigate('/shop'); // Or '/' for homepage
    }
  }, [userInfo, navigate]);

  // Handle form submission
  const submitHandler = (e) => {
    e.preventDefault();
    // Check if passwords match
    if (form.password !== form.confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }
    // Check for empty fields (though 'required' helps)
    if (!form.name || !form.email || !form.password) {
      setLocalError('Please fill in all fields');
      return;
    }

    // Clear local error and dispatch
    setLocalError('');
    dispatch(register({ name: form.name, email: form.email, password: form.password }));
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: COLORS.background }} // <-- Set page background
    >
      <div
        className="w-full max-w-md bg-white rounded-xl p-8 flex flex-col gap-4 mt-4 shadow-2xl"
        style={{ boxShadow: `0 10px 25px -5px ${COLORS.primary}40` }} // <-- Use theme shadow
      >
        {/* Logo/Brand */}
        <div className="flex flex-col items-center gap-2">
          <div
            className="text-3xl font-bold tracking-widest"
            style={{ color: COLORS.primary }} // <-- Use primary color
          >
            TEHZEEB
          </div>
          <div
            className="w-16 h-1 rounded"
            style={{ background: COLORS.secondary }} // <-- Use secondary color
          ></div>
        </div>
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
            Create Account
          </h2>
          <p className="mt-1" style={{ color: COLORS.accent }}>
            Join and shop the latest arrivals!
          </p>
        </div>

        {/* --- ERROR MESSAGES --- */}
        {(error || localError) && (
          <div
            className="w-full p-3 rounded-md text-center font-semibold"
            style={{ background: '#f8d7da', color: '#721c24' }}
          >
            {/* Show local error OR backend error */}
            {localError || error}
          </div>
        )}

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
          <div>
            <label
              className="block font-semibold mb-1"
              htmlFor="name"
              style={{ color: COLORS.text }}
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-2 rounded-lg border outline-none transition"
              style={{ borderColor: COLORS.accent, color: COLORS.text }}
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              autoComplete="name"
              required
            />
          </div>
          <div>
            <label
              className="block font-semibold mb-1"
              htmlFor="email"
              style={{ color: COLORS.text }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 rounded-lg border outline-none transition"
              style={{ borderColor: COLORS.accent, color: COLORS.text }}
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              autoComplete="email"
              required
            />
          </div>
          <div>
            <label
              className="block font-semibold mb-1"
              htmlFor="password"
              style={{ color: COLORS.text }}
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPass ? 'text' : 'password'}
                className="w-full px-4 py-2 rounded-lg border outline-none transition"
                style={{ borderColor: COLORS.accent, color: COLORS.text }}
                placeholder="Create a password"
                value={form.password}
                onChange={(e) =>
                  setForm((f) => ({ ...f, password: e.target.value }))
                }
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
                style={{ color: COLORS.primary }}
                onClick={() => setShowPass((s) => !s)}
                tabIndex={-1}
              >
                {showPass ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div>
            <label
              className="block font-semibold mb-1"
              htmlFor="confirmPassword"
              style={{ color: COLORS.text }}
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPass ? 'text' : 'password'}
                className="w-full px-4 py-2 rounded-lg border outline-none transition"
                style={{ borderColor: COLORS.accent, color: COLORS.text }}
                placeholder="Repeat your password"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm((f) => ({ ...f, confirmPassword: e.target.value }))
                }
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
                style={{ color: COLORS.primary }}
                onClick={() => setShowConfirmPass((s) => !s)}
                tabIndex={-1}
              >
                {showConfirmPass ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="mt-2 w-full py-3 rounded-lg text-white font-bold shadow transition"
            style={{
              background: loading ? COLORS.accent : COLORS.primary, // <-- Disable on load
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
            disabled={loading} // <-- Disable on load
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        {/* Divider */}
        <div className="flex items-center gap-3">
          <div
            className="flex-1 h-px"
            style={{ background: COLORS.accent }}
          />
          <span className="text-sm" style={{ color: COLORS.text }}>
            or
          </span>
          <div
            className="flex-1 h-px"
            style={{ background: COLORS.accent }}
          />
        </div>
        {/* Login link */}
        <div className="text-center" style={{ color: COLORS.text }}>
          Already have an account?{' '}
          <Link
            to={'/login'}
            className="font-semibold hover:underline"
            style={{ color: COLORS.secondary }}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice'; // <-- Check this import path

// Your Brand's Color Theme
const COLORS = {
  primary: '#B3541E',
  secondary: '#D6A74F',
  accent: '#A5A58D',
  text: '#3E2F1C',
  background: '#F5EBDD',
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

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
    if (!email || !password) {
      return; // You could show a local error here
    }
    dispatch(login({ email, password }));
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: COLORS.background }} // <-- Set page background
    >
      <div
        className="w-full max-w-md bg-white rounded-xl p-8 flex flex-col gap-6 shadow-2xl"
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
            Welcome Back!
          </h2>
          <p className="mt-1" style={{ color: COLORS.accent }}>
            Login to your account
          </p>
        </div>

        {/* --- ERROR MESSAGE --- */}
        {error && (
          <div
            className="w-full p-3 rounded-md text-center font-semibold"
            style={{ background: '#f8d7da', color: '#721c24' }}
          >
            {/* The backend error: "Invalid email or password" */}
            {error}
          </div>
        )}

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
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
              style={{
                borderColor: COLORS.accent,
                color: COLORS.text,
              }}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                style={{
                  borderColor: COLORS.accent,
                  color: COLORS.text,
                }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
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
          <div className="flex items-center justify-between">
            <label
              className="flex items-center text-sm"
              style={{ color: COLORS.text }}
            >
              <input
                type="checkbox"
                className="mr-2"
                style={{ accentColor: COLORS.primary }}
              />
              Remember me
            </label>
            <a
              href="#"
              className="text-sm hover:underline"
              style={{ color: COLORS.secondary }}
            >
              Forgot password?
            </a>
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
            {loading ? 'Logging in...' : 'Login'}
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
        {/* Sign up link */}
        <div className="text-center" style={{ color: COLORS.text }}>
          Don't have an account?{' '}
          <Link
            to={'/signup'}
            className="font-semibold hover:underline"
            style={{ color: COLORS.secondary }}
          >
            {' '}
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

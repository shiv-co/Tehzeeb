import React, { useState } from 'react';
import { FiShoppingBag, FiMenu, FiX, FiUser } from 'react-icons/fi';
import logo from '/icons/Logo1.png';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // <-- 1. Import hooks
import { logout } from '../redux/authSlice'; // <-- 2. Import logout action (check path!)

const COLORS = {
  primary: '#B3541E',
  secondary: '#D6A74F',
  accent: '#A5A58D',
  text: '#3E2F1C',
  background: '#F5EBDD',
};

// const mockUser = { isLoggedIn: false, name: "Ananya Singh" }; // <-- 3. Remove mock user

const menu = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Shop', href: '/shop' },
  { name: 'Blog', href: '/Blog' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // 4. Get real user info and dispatch function
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  // 5. Create logout handler
  const logoutHandler = () => {
    dispatch(logout());
    setProfileOpen(false); // Close dropdown on logout
  };

  return (
    <nav
      className="shadow-md"
      style={{
        background: COLORS.background,
        borderBottom: `2px solid ${COLORS.accent}`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* main row */}
        <div className="flex items-center h-full">
          {/* Brand */}
          <div className="flex items-center" style={{ paddingLeft: '4px' }}>
            <Link to="/">
              <img
                src={logo}
                alt="Tehzeeb Creations Logo"
                className="h-20 w-auto transform -translate-x-1" // small left shift
              />
            </Link>
          </div>

          {/* Center menu */}
          <div className="hidden md:flex flex-1 justify-center space-x-12 items-center">
            {menu.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="font-medium text-lg transition-colors"
                style={{ color: COLORS.primary }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.color = COLORS.secondary)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.color = COLORS.primary)
                }
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-6 ml-auto">
            <Link
              to="/cart"
              className="transition-colors"
              style={{ color: COLORS.primary }}
            >
              <FiShoppingBag size={22} />
            </Link>

            {/* Profile Icon */}
            <div className="relative">
              <button
                className="focus:outline-none"
                style={{ color: COLORS.primary }}
                onClick={() => setProfileOpen((p) => !p)}
                aria-label="Profile Menu"
              >
                {/* 6. Display User's Initial if logged in, or Icon if not */}
                {userInfo ? (
                  <div
                    className="flex items-center justify-center h-8 w-8 rounded-full bg-[#F5EBDD] text-xl font-bold shadow-inner"
                    // style={{ background: COLORS., color: '#fff' }}
                  >
                    {userInfo.name.split(' ').map((n) => n[0]).join('').toUpperCase()}
                  </div>
                ) : (
                  <FiUser size={26} />
                )}
              </button>
                   

              {profileOpen && (
                <div
                  className="absolute right-0 mt-3 w-64 shadow-xl rounded-xl border p-5 flex flex-col gap-3"
                  style={{
                    zIndex: 99,
                    background: COLORS.background,
                    borderColor: COLORS.accent,
                  }}
                >
                  {/* 7. Check for real userInfo instead of user.isLoggedIn */}
                  {!userInfo ? (
                    <>
                      <div className="text-center">
                        <div
                          className="text-lg font-bold mb-1"
                          style={{ color: COLORS.primary }}
                        >
                          Welcome!
                        </div>
                        <div
                          className="text-sm mb-3"
                          style={{ color: COLORS.accent }}
                        >
                          Please log in to access your account.
                        </div>
                      </div>
                      <Link
                        to="/login"
                        className="w-full py-2 mb-2 rounded-lg text-center font-semibold transition"
                        style={{ background: COLORS.primary, color: '#fff' }}
                        onClick={() => setProfileOpen(false)} // Close dropdown
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="w-full py-2 rounded-lg border-2 text-center font-semibold transition"
                        style={{
                          borderColor: COLORS.primary,
                          color: COLORS.primary,
                        }}
                        onClick={() => setProfileOpen(false)} // Close dropdown
                      >
                        Sign Up
                      </Link>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="flex items-center justify-center h-12 w-12 rounded-full text-xl font-bold shadow"
                          style={{
                            background: COLORS.secondary,
                            color: '#fff',
                          }}
                        >
                          {/* 8. Use real userInfo name */}
                          {userInfo.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <div
                            className="font-bold text-lg"
                            style={{ color: COLORS.primary }}
                          >
                            {/* 9. Use real userInfo name */}
                            {userInfo.name}
                          </div>
                          <div
                            className="text-xs"
                            style={{ color: COLORS.accent }}
                          >
                            Welcome back!
                          </div>
                        </div>
                      </div>
                      <Link
                        to="/profile"
                        className="w-full py-2 rounded-lg border-2 text-center font-semibold mb-2 transition"
                        style={{
                          borderColor: COLORS.primary,
                          color: COLORS.primary,
                        }}
                        onClick={() => setProfileOpen(false)} // Close dropdown
                      >
                        Edit Profile
                      </Link>
                      <button
                        className="w-full py-2 rounded-lg font-semibold transition"
                        style={{
                          background: COLORS.secondary,
                          color: COLORS.text,
                        }}
                        onClick={logoutHandler} // <-- 10. Use logoutHandler
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden focus:outline-none"
              style={{ color: COLORS.accent }}
              onClick={() => setOpen(!open)}
            >
              {open ? <FiX size={26} /> : <FiMenu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-4 pt-4 pb-2 space-y-3"
          style={{ background: COLORS.background }}
        >
          {menu.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="block py-1 text-lg font-medium"
              style={{ color: COLORS.primary }}
              onClick={() => setOpen(false)}
              onMouseOver={(e) =>
                (e.currentTarget.style.color = COLORS.secondary)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.color = COLORS.primary)
              }
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}

      {/* Click outside to close profile card */}
      {profileOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setProfileOpen(false)}
          aria-hidden
        />
      )}
    </nav>
  );
}

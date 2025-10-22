import React, { useState } from "react";
import {
  FiSearch,
  FiShoppingBag,
  FiMenu,
  FiX,
  FiLogOut,
  FiUser,
} from "react-icons/fi";
import logo from "/icons/Logo1.png";
import { Link } from "react-router-dom";

const mockUser = {
  isLoggedIn: true, // Set to false to test the not-logged-in state
  name: "Ananya Singh",
};

const menu = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Shop", href: "/shop" },
  { name: "Blog", href: "/Blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const user = mockUser;

  return (
    <nav className="bg-[#f2d0d0] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-full items-center">
          {/* Brand */}
          <div className="flex justify-center items-center ">
            <img
              src={logo}
              alt="Tehzeeb Creations Logo"
              className="h-20 w-84"
            />
            {/* <a
            href="/"
            className="font-bold text-sm tracking-widest"
            style={{ color: "#FDD7D7", letterSpacing: "0.1em" }}
          >
            TEHZEEB <br /><span>CREATIONS</span>
          </a> */}
          </div>
          {/* <a href="/"></a> */}

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {menu.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-[#3B7046] hover:text-[#2d5c37] font-medium text-lg transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-6">
            <button className="text-[#3B7046] hover:text-[#2d5c37]  transition-colors">
              <FiSearch size={22} />
            </button>
            <button className="text-[#3B7046] hover:text-[#2d5c37]   transition-colors">
              <Link to={"/cart"}>
                {" "}
                <FiShoppingBag size={22} />{" "}
              </Link>
            </button>
            {/* Profile Icon */}
            <div className="relative">
              <button
                className="text-[#3B7046] focus:outline-none"
                onClick={() => setProfileOpen((p) => !p)}
                aria-label="Profile Menu"
              >
                <FiUser size={26} />
              </button>
              {/* Profile Card Dropdown */}
              {profileOpen && (
                <div
                  className="absolute right-0 mt-3 w-64 bg-white shadow-xl rounded-xl border border-[#F9A9AC] p-5 flex flex-col gap-3"
                  style={{ zIndex: 99 }}
                >
                  {!user.isLoggedIn ? (
                    <>
                      <div className="text-center">
                        <div className="text-lg font-bold text-[#3B7046] mb-1">
                          Welcome!
                        </div>
                        <div className="text-sm text-[#63B17B] mb-3">
                          Please log in to access your account.
                        </div>
                      </div>
                      <a
                        href="/login"
                        className="w-full py-2 mb-2 rounded-lg bg-[#3B7046] text-white text-center font-semibold hover:bg-[#63B17B] transition"
                      >
                        Login
                      </a>
                      <a
                        href="/signup"
                        className="w-full py-2 rounded-lg border-2 border-[#3B7046] text-[#3B7046] text-center font-semibold hover:bg-[#FDD7D7] transition"
                      >
                        Sign Up
                      </a>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-[#63B17B] text-white flex items-center justify-center h-12 w-12 rounded-full text-xl font-bold shadow">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <div className="font-bold text-[#3B7046] text-lg">
                            {user.name}
                          </div>
                          <div className="text-xs text-[#63B17B]">
                            Welcome back!
                          </div>
                        </div>
                      </div>
                     
                      <Link
                        to={"/profile"}
                        className="w-full py-2 rounded-lg border-2 border-[#3B7046] text-[#3B7046] text-center font-semibold mb-2 hover:bg-[#FDD7D7] transition"
                      >
                        Edit Profile
                      </Link>
                      <button
                        className="w-full py-2 rounded-lg bg-[#F9A9AC] text-[#3B7046] font-semibold hover:bg-[#63B17B] hover:text-white transition"
                        onClick={() => {
                          // Add your logout logic here
                          alert("Logged out!");
                        }}
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
              className="md:hidden text-[#878787] focus:outline-none"
              onClick={() => setOpen(!open)}
            >
              {open ? <FiX size={26} /> : <FiMenu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#FDD7D7] px-4 pt-4 pb-2 space-y-3">
          {menu.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block text-[#3B7046] hover:text-[#F9A9AC] py-1 text-lg font-medium"
              onClick={() => setOpen(false)}
            >
              {item.name}
            </a>
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

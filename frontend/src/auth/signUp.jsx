import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center  px-4 ">
      <div className="w-full max-w-md bg-white rounded-xl  p-8 flex flex-col gap-4 mt-4 shadow-2xl shadow-[#3B7046]">
        {/* Logo/Brand */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-3xl font-bold text-[#3B7046] tracking-widest">TEHZEEB</div>
          <div className="w-16 h-1 bg-[#F9A9AC] rounded"></div>
        </div>
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#3B7046]">Create Account</h2>
          <p className="text-[#63B17B] mt-1">Join and shop the latest arrivals!</p>
        </div>
        {/* Form */}
        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-[#3B7046] font-semibold mb-1" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-[#F9A9AC] focus:border-[#3B7046] focus:ring-2 focus:ring-[#F9A9AC] outline-none transition"
              placeholder="Your Name"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              autoComplete="name"
            />
          </div>
          <div>
            <label className="block text-[#3B7046] font-semibold mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-[#F9A9AC] focus:border-[#3B7046] focus:ring-2 focus:ring-[#F9A9AC] outline-none transition"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-[#3B7046] font-semibold mb-1" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPass ? "text" : "password"}
                className="w-full px-4 py-2 rounded-lg border border-[#F9A9AC] focus:border-[#3B7046] focus:ring-2 focus:ring-[#F9A9AC] outline-none transition"
                placeholder="Create a password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3B7046] text-sm"
                onClick={() => setShowPass(s => !s)}
                tabIndex={-1}
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-[#3B7046] font-semibold mb-1" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPass ? "text" : "password"}
                className="w-full px-4 py-2 rounded-lg border border-[#F9A9AC] focus:border-[#3B7046] focus:ring-2 focus:ring-[#F9A9AC] outline-none transition"
                placeholder="Repeat your password"
                value={form.confirmPassword}
                onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3B7046] text-sm"
                onClick={() => setShowConfirmPass(s => !s)}
                tabIndex={-1}
              >
                {showConfirmPass ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="mt-2 w-full py-3 rounded-lg bg-[#3B7046] text-white font-bold hover:bg-[#63B17B] shadow transition"
          >
            Sign Up
          </button>
        </form>
        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-[#F9A9AC]" />
          <span className="text-[#3B7046] text-sm">or</span>
          <div className="flex-1 h-px bg-[#F9A9AC]" />
        </div>
        {/* Login link */}
        <div className="text-center text-[#3B7046]">
          Already have an account?{" "}
         
          <Link to={"/login"} className="font-semibold text-[#F9A9AC] hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
}
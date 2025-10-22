import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDD7D7] px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 flex flex-col gap-6">
        {/* Logo/Brand */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-3xl font-bold text-[#3B7046] tracking-widest">TEHZEEB</div>
          <div className="w-16 h-1 bg-[#F9A9AC] rounded"></div>
        </div>
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#3B7046]">Welcome Back!</h2>
          <p className="text-[#63B17B] mt-1">Login to your account</p>
        </div>
        {/* Form */}
        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-[#3B7046] font-semibold mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-[#F9A9AC] focus:border-[#3B7046] focus:ring-2 focus:ring-[#F9A9AC] outline-none transition"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
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
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-[#3B7046]">
              <input type="checkbox" className="accent-[#3B7046] mr-2" />
              Remember me
            </label>
            <a href="#" className="text-sm text-[#F9A9AC] hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="mt-2 w-full py-3 rounded-lg bg-[#3B7046] text-white font-bold hover:bg-[#63B17B] shadow transition"
          >
            Login
          </button>
        </form>
        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-[#F9A9AC]" />
          <span className="text-[#3B7046] text-sm">or</span>
          <div className="flex-1 h-px bg-[#F9A9AC]" />
        </div>
        {/* Sign up link */}
        <div className="text-center text-[#3B7046]">
          Don't have an account?{" "}
          <a href="/signup" className="font-semibold text-[#F9A9AC] hover:underline">Sign up</a>
        </div>
      </div>
    </div>
  );
}
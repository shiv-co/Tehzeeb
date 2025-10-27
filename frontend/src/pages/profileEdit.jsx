import React, { useState } from "react";
import { FiUser, FiEdit2, FiMail, FiPhone } from "react-icons/fi";

// Updated color theme
const COLORS = {
  primary: "#B3541E",      // Terracotta
  secondary: "#D6A74F",    // Mustard Gold
  accent: "#A5A58D",       // Sage Green
  text: "#3E2F1C",         // Deep Brown
  background: "#F5EBDD",   // Linen / Sand
};

export default function ProfileEditPage() {
  // Example user data (replace with real user state/data)
  const [user, setUser] = useState({
    firstName: "Anaya ",
    lastName: "Singh ",
    gender: "Female",
    email: "ananyasingh51@gmail.com",
    phone: "+91966666666",
  });

  const [editSection, setEditSection] = useState({
    personal: false,
    email: false,
    phone: false,
  });

  const [form, setForm] = useState(user);

  const handleSave = (section) => {
    setUser({ ...user, ...form });
    setEditSection({ ...editSection, [section]: false });
  };

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row items-start py-8 px-2"
      style={{ background: COLORS.background }}
    >
      {/* Sidebar - hidden on mobile, shown on large devices */}
      <aside className="hidden lg:flex w-full max-w-xs rounded-xl shadow-2xl p-5 mr-8 flex-col gap-6"
        style={{ background: "#fff", boxShadow: `0 4px 24px 0 ${COLORS.accent}50` }}
      >
        <div className="flex items-center gap-3">
          <div
            className="rounded-full h-14 w-14 flex items-center justify-center"
            style={{ background: COLORS.secondary }}
          >
            <FiUser style={{ color: COLORS.primary }} size={32} />
          </div>
          <div>
            <div className="text-xs" style={{ color: COLORS.accent }}>Hello,</div>
            <div className="font-bold text-lg leading-tight" style={{ color: COLORS.primary }}>
              {user.firstName} {user.lastName}
            </div>
          </div>
        </div>
        <nav className="flex flex-col gap-1">
          <div className="font-semibold text-sm opacity-80 flex items-center gap-2 mt-4 mb-1"
            style={{ color: COLORS.text }}
          >
            <FiUser className="inline" /> ACCOUNT SETTINGS
          </div>
          <a
            href="#"
            className="font-semibold rounded px-3 py-2 text-sm"
            style={{
              background: COLORS.accent,
              color: COLORS.primary,
            }}
          >
            Profile Information
          </a>
        </nav>
      </aside>

      {/* Main Form */}
      <main
        className="flex-1 rounded-xl shadow-2xl p-8 w-full"
        style={{ background: "#fff", boxShadow: `0 4px 24px 0 ${COLORS.accent}50` }}
      >
        {/* Personal Information */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold" style={{ color: COLORS.primary }}>Personal Information</h2>
            <button
              className="text-sm flex items-center gap-1"
              style={{ color: COLORS.primary }}
              onClick={() => setEditSection({ ...editSection, personal: !editSection.personal })}
              onMouseOver={e => (e.currentTarget.style.color = COLORS.secondary)}
              onMouseOut={e => (e.currentTarget.style.color = COLORS.primary)}
            >
              <FiEdit2 size={16} /> {editSection.personal ? "Cancel" : "Edit"}
            </button>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-3">
            <input
              type="text"
              disabled={!editSection.personal}
              value={form.firstName}
              onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
              className={`w-full md:w-1/2 px-4 py-2 rounded border`}
              style={{
                color: COLORS.text,
                background: editSection.personal ? "#fff" : COLORS.background,
                borderColor: editSection.personal ? COLORS.secondary : COLORS.accent,
              }}
              placeholder="First Name"
            />
            <input
              type="text"
              disabled={!editSection.personal}
              value={form.lastName}
              onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
              className={`w-full md:w-1/2 px-4 py-2 rounded border`}
              style={{
                color: COLORS.text,
                background: editSection.personal ? "#fff" : COLORS.background,
                borderColor: editSection.personal ? COLORS.secondary : COLORS.accent,
              }}
              placeholder="Last Name"
            />
          </div>
          <div className="mb-2 font-medium" style={{ color: COLORS.text }}>Your Gender</div>
          <div className="flex gap-4 mb-2">
            <label className="flex items-center gap-1 text-sm" style={{ color: COLORS.text }}>
              <input
                type="radio"
                name="gender"
                value="male"
                disabled={!editSection.personal}
                checked={form.gender === "male"}
                onChange={e => setForm(f => ({ ...f, gender: e.target.value }))}
                className="accent-[#B3541E]"
              />
              Male
            </label>
            <label className="flex items-center gap-1 text-sm" style={{ color: COLORS.text }}>
              <input
                type="radio"
                name="gender"
                value="female"
                disabled={!editSection.personal}
                checked={form.gender === "female"}
                onChange={e => setForm(f => ({ ...f, gender: e.target.value }))}
                className="accent-[#B3541E]"
              />
              Female
            </label>
          </div>
          {editSection.personal && (
            <button
              className="mt-2 px-6 py-2 rounded font-semibold transition"
              style={{
                background: COLORS.primary,
                color: "#fff",
                boxShadow: `0 2px 8px 0 ${COLORS.secondary}40`,
              }}
              onClick={() => handleSave("personal")}
            >
              Save
            </button>
          )}
        </section>

        {/* Email */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: COLORS.primary }}>
              <FiMail /> Email Address
            </h2>
            <button
              className="text-sm flex items-center gap-1"
              style={{ color: COLORS.primary }}
              onClick={() => setEditSection({ ...editSection, email: !editSection.email })}
              onMouseOver={e => (e.currentTarget.style.color = COLORS.secondary)}
              onMouseOut={e => (e.currentTarget.style.color = COLORS.primary)}
            >
              <FiEdit2 size={16} /> {editSection.email ? "Cancel" : "Edit"}
            </button>
          </div>
          <input
            type="email"
            disabled={!editSection.email}
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            className="w-full px-4 py-2 rounded border"
            style={{
              color: COLORS.text,
              background: editSection.email ? "#fff" : COLORS.background,
              borderColor: editSection.email ? COLORS.secondary : COLORS.accent,
            }}
            placeholder="Email Address"
          />
          {editSection.email && (
            <button
              className="mt-2 px-6 py-2 rounded font-semibold transition"
              style={{
                background: COLORS.primary,
                color: "#fff",
                boxShadow: `0 2px 8px 0 ${COLORS.secondary}40`,
              }}
              onClick={() => handleSave("email")}
            >
              Save
            </button>
          )}
        </section>

        {/* Mobile */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: COLORS.primary }}>
              <FiPhone /> Mobile Number
            </h2>
            <button
              className="text-sm flex items-center gap-1"
              style={{ color: COLORS.primary }}
              onClick={() => setEditSection({ ...editSection, phone: !editSection.phone })}
              onMouseOver={e => (e.currentTarget.style.color = COLORS.secondary)}
              onMouseOut={e => (e.currentTarget.style.color = COLORS.primary)}
            >
              <FiEdit2 size={16} /> {editSection.phone ? "Cancel" : "Edit"}
            </button>
          </div>
          <input
            type="tel"
            disabled={!editSection.phone}
            value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            className="w-full px-4 py-2 rounded border"
            style={{
              color: COLORS.text,
              background: editSection.phone ? "#fff" : COLORS.background,
              borderColor: editSection.phone ? COLORS.secondary : COLORS.accent,
            }}
            placeholder="Mobile Number"
          />
          {editSection.phone && (
            <button
              className="mt-2 px-6 py-2 rounded font-semibold transition"
              style={{
                background: COLORS.primary,
                color: "#fff",
                boxShadow: `0 2px 8px 0 ${COLORS.secondary}40`,
              }}
              onClick={() => handleSave("phone")}
            >
              Save
            </button>
          )}
        </section>
      </main>
    </div>
  );
}
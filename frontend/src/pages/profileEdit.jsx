import React, { useState } from "react";
import { FiUser, FiEdit2, FiMail, FiPhone } from "react-icons/fi";

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
    <div className="min-h-screen bg-white flex flex-col lg:flex-row items-start py-8 px-2 shadow-2xl shadow-[#3B7046]">
      {/* Sidebar - hidden on mobile, shown on large devices */}
      <aside className="hidden lg:flex w-full max-w-xs bg-white rounded-xl shadow-2xl shadow-[#3B7046] p-5 mr-8 flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="bg-[#F9A9AC] rounded-full h-14 w-14 flex items-center justify-center">
            <FiUser className="text-[#3B7046]" size={32} />
          </div>
          <div>
            <div className="text-xs text-[#63B17B]">Hello,</div>
            <div className="font-bold text-[#3B7046] text-lg leading-tight">
              {user.firstName} {user.lastName}
            </div>
          </div>
        </div>
        <nav className="flex flex-col gap-1">
          <div className="font-semibold text-[#3B7046] text-sm opacity-80 flex items-center gap-2 mt-4 mb-1">
            <FiUser className="inline" /> ACCOUNT SETTINGS
          </div>
          <a
            href="#"
            className="bg-[#FDD7D7] text-[#3B7046] font-semibold rounded px-3 py-2 text-sm"
          >
            Profile Information
          </a>
        </nav>
      </aside>

      {/* Main Form */}
      <main className="flex-1 bg-white rounded-xl shadow-2xl shadow-[#3B7046] p-8 w-full">
        {/* Personal Information */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-[#3B7046]">Personal Information</h2>
            <button
              className="text-[#3B7046] text-sm flex items-center gap-1 hover:text-[#F9A9AC]"
              onClick={() => setEditSection({ ...editSection, personal: !editSection.personal })}
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
              className={`w-full md:w-1/2 px-4 py-2 rounded border text-[#3B7046] bg-gray-50 ${editSection.personal ? "border-[#F9A9AC] bg-white" : "border-gray-200"} `}
              placeholder="First Name"
            />
            <input
              type="text"
              disabled={!editSection.personal}
              value={form.lastName}
              onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
              className={`w-full md:w-1/2 px-4 py-2 rounded border text-[#3B7046] bg-gray-50 ${editSection.personal ? "border-[#F9A9AC] bg-white" : "border-gray-200"}`}
              placeholder="Last Name"
            />
          </div>
          <div className="mb-2 font-medium text-[#3B7046]">Your Gender</div>
          <div className="flex gap-4 mb-2">
            <label className="flex items-center gap-1 text-[#3B7046] text-sm">
              <input
                type="radio"
                name="gender"
                value="male"
                disabled={!editSection.personal}
                checked={form.gender === "male"}
                onChange={e => setForm(f => ({ ...f, gender: e.target.value }))}
                className="accent-[#3B7046]"
              />
              Male
            </label>
            <label className="flex items-center gap-1 text-[#3B7046] text-sm">
              <input
                type="radio"
                name="gender"
                value="female"
                disabled={!editSection.personal}
                checked={form.gender === "female"}
                onChange={e => setForm(f => ({ ...f, gender: e.target.value }))}
                className="accent-[#3B7046]"
              />
              Female
            </label>
          </div>
          {editSection.personal && (
            <button
              className="mt-2 px-6 py-2 bg-[#3B7046] text-white rounded font-semibold hover:bg-[#63B17B] transition"
              onClick={() => handleSave("personal")}
            >
              Save
            </button>
          )}
        </section>

        {/* Email */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-[#3B7046] flex items-center gap-2"><FiMail /> Email Address</h2>
            <button
              className="text-[#3B7046] text-sm flex items-center gap-1 hover:text-[#F9A9AC]"
              onClick={() => setEditSection({ ...editSection, email: !editSection.email })}
            >
              <FiEdit2 size={16} /> {editSection.email ? "Cancel" : "Edit"}
            </button>
          </div>
          <input
            type="email"
            disabled={!editSection.email}
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            className={`w-full px-4 py-2 rounded border text-[#3B7046] bg-gray-50 ${editSection.email ? "border-[#F9A9AC] bg-white" : "border-gray-200"}`}
            placeholder="Email Address"
          />
          {editSection.email && (
            <button
              className="mt-2 px-6 py-2 bg-[#3B7046] text-white rounded font-semibold hover:bg-[#63B17B] transition"
              onClick={() => handleSave("email")}
            >
              Save
            </button>
          )}
        </section>

        {/* Mobile */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-[#3B7046] flex items-center gap-2"><FiPhone /> Mobile Number</h2>
            <button
              className="text-[#3B7046] text-sm flex items-center gap-1 hover:text-[#F9A9AC]"
              onClick={() => setEditSection({ ...editSection, phone: !editSection.phone })}
            >
              <FiEdit2 size={16} /> {editSection.phone ? "Cancel" : "Edit"}
            </button>
          </div>
          <input
            type="tel"
            disabled={!editSection.phone}
            value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            className={`w-full px-4 py-2 rounded border text-[#3B7046] bg-gray-50 ${editSection.phone ? "border-[#F9A9AC] bg-white" : "border-gray-200"}`}
            placeholder="Mobile Number"
          />
          {editSection.phone && (
            <button
              className="mt-2 px-6 py-2 bg-[#3B7046] text-white rounded font-semibold hover:bg-[#63B17B] transition"
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
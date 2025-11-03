import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiBox, FiClipboard, FiPlus } from 'react-icons/fi';
import ProductForm from '../pages/adminProductForm.jsx';

// Tehzeeb Creations Brand Theme
const COLORS = {
  primary: '#B3541E',     // Deep Maroon-Brown
  secondary: '#D6A74F',   // Golden Tone
  accent: '#A5A58D',      // Muted Gold
  text: '#3E2F1C',        // Deep Text Brown
  background: '#F5EBDD',  // Beige Ivory
};

export default function AdminDashboard() {
  const [showProductForm, setShowProductForm] = useState(false);

  const stats = [
    { name: 'Total Sales', stat: '₹71,897', icon: FiClipboard },
    { name: 'New Users', stat: '58', icon: FiUsers },
    { name: 'New Orders', stat: '12', icon: FiBox },
  ];

  const links = [
    { name: 'Manage Users', href: '/admin/users', icon: FiUsers },
    { name: 'Manage Products', href: '/admin/products', icon: FiBox },
    { name: 'Manage Orders', href: '/admin/orders', icon: FiClipboard },
  ];

  return (
    <div
      className="min-h-screen p-4 md:p-8 relative"
      style={{ background: COLORS.background }}
    >
      <div className="max-w-7xl mx-auto xl:max-w-[1440px] 2xl:max-w-[1720px]">
        <div className="flex items-center justify-between mb-8">
          <h1
            className="text-3xl md:text-4xl font-extrabold"
            style={{ color: COLORS.primary }}
          >
            Admin Dashboard
          </h1>
          <button
            onClick={() => setShowProductForm(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white shadow-md transition-all hover:opacity-90"
            style={{ background: COLORS.primary }}
          >
            <FiPlus />
            Create Product
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {stats.map((item) => (
            <div
              key={item.name}
              className="p-6 rounded-xl shadow-lg flex items-center gap-4"
              style={{ background: '#fff', borderColor: COLORS.accent }}
            >
              <item.icon className="w-10 h-10" style={{ color: COLORS.primary }} />
              <div>
                <dt
                  className="text-sm font-medium"
                  style={{ color: COLORS.accent }}
                >
                  {item.name}
                </dt>
                <dd
                  className="text-2xl font-bold"
                  style={{ color: COLORS.text }}
                >
                  {item.stat}
                </dd>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="p-8 rounded-xl shadow-lg flex flex-col items-center justify-center transition-all hover:shadow-2xl hover:-translate-y-1"
              style={{ background: '#fff', borderColor: COLORS.accent }}
            >
              <link.icon
                className="w-12 h-12 mb-3"
                style={{ color: COLORS.secondary }}
              />
              <span
                className="text-xl font-bold"
                style={{ color: COLORS.primary }}
              >
                {link.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Product Creation Modal */}
      {showProductForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="relative w-[95%] md:w-[70%] lg:w-[50%] bg-white rounded-2xl shadow-2xl p-6 overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setShowProductForm(false)}
              className="absolute top-3 right-4 text-xl font-bold text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>
            <ProductForm
              onSuccess={() => {
                setShowProductForm(false);
                alert('Product added successfully!');
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

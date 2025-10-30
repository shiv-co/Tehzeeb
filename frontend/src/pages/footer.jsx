import React from "react";
import { FiInstagram, FiFacebook, FiYoutube } from "react-icons/fi";
import { FaPinterestP } from "react-icons/fa";
import logo from '/icons/Tehzeeb_Logo.png'; // <-- 1. Import the logo

// New color theme
const COLORS = {
  primary: "#B3541E",     // Terracotta
  secondary: "#D6A74F",   // Mustard Gold
  accent: "#A5A58D",     // Sage Green
  text: "#3E2F1C",        // Deep Brown
  background: "#F5EBDD",  // Linen/Sand
};

export default function Footer() {
  return (
    <footer
      className="pt-10 pb-4 px-4 md:px-16"
      style={{ background: COLORS.background, color: COLORS.text }}
    >
      {/* --- 4K Layout Fix --- */}
      <div className="w-full max-w-7xl mx-auto xl:max-w-[1440px] 2xl:max-w-[1720px]">
        {/* --- Responsive Grid --- */}
        {/* Mobile: 1 col, Tablet: 2 cols, Desktop: 5 cols (incl logo) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          
          {/* --- 2. Logo Column (first on large screens) --- */}
          <div className="lg:col-span-1 flex flex-col items-start mb-6 lg:mb-0">
             <img
                src={logo}
                alt="Tehzeeb Creations Logo"
                className="h-40 w-auto mb-4" // Adjusted size
              />
              <p className="text-sm" style={{ color: COLORS.accent }}>
                Crafting elegance with tradition. Discover timeless fashion inspired by culture.
              </p>
          </div>

          {/* Quick Links */}
          <div className="">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: COLORS.primary }}>
              Quick Links
            </h3>
            <ul className="md:space-y-2 flex flex-wrap justify-self-auto gap-2 text-center"  style={{ color: COLORS.text }}>
              <li>
                <a
                  href="/contact"
                  className="hover:underline hover:text-[#B3541E] flex items-center gap-2"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/account"
                  className="hover:underline hover:text-[#B3541E] flex items-center gap-2"
                >
                  My Account
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="hover:underline hover:text-[#B3541E] flex items-center gap-2"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="hover:underline hover:text-[#B3541E] flex items-center gap-2"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: COLORS.primary }}>
              Contact Us
            </h3>
            <ul className="space-y-2" style={{ color: COLORS.text }}>
              <li>
                Address: Tehzeeb Creations, Lucknow, India
              </li>
              <li>
                Email:{" "}
                <a
                  href="mailto:tehzeebcreations.in@gmail.com"
                  className="hover:underline hover:text-[#B3541E]"
                  style={{ color: COLORS.primary }}
                >
                 tehzeebcreations.in@gmail.com
                </a>
              </li>
              <li>
                Phone:{" "}
                <a
                  href="tel:+916394728933" // Replace with actual number
                  className="hover:underline hover:text-[#B3541E]"
                  style={{ color: COLORS.primary }}
                >
                  +91 6394728933
                </a>
              </li>
              
            </ul>
          </div>

          {/* Social / Follow Us */}
          <div>
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: COLORS.primary }}>
              Follow Us
            </h3>
            <p className="mb-3 text-sm" style={{ color: COLORS.accent }}> {/* Adjusted text size */}
              Stay connected and get inspired by our latest designs & styling ideas:
            </p>
            <div className="flex gap-4 text-2xl">
              <a
                href="https://www.instagram.com/tehzeebcreations.in/" // Replace with actual link
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-[#B3541E]"
                style={{ color: COLORS.primary }}
              >
                <FiInstagram />
              </a>
              <a
                href="https://facebook.com/tehzeebcreations" // Replace with actual link
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-[#B3541E]"
                style={{ color: COLORS.primary }}
              >
                <FiFacebook />
              </a>
              {/* <a
                href="https://pinterest.com/tehzeebcreations" // Replace with actual link
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="hover:text-[#B3541E]"
                style={{ color: COLORS.primary }}
              >
                <FaPinterestP />
              </a> */}
              {/* <a
                href="https://youtube.com/tehzeebcreations" // Replace with actual link
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:text-[#B3541E]"
                style={{ color: COLORS.primary }}
              >
                <FiYoutube />
              </a> */}
            </div>
          </div>

          {/* Disclaimer */}
          <div>
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: COLORS.primary }}>
              Disclaimer
            </h3>
            <p className="text-sm mb-4" style={{ color: COLORS.accent }}>
              All products and designs showcased on Tehzeeb Creations are created with utmost care and originality. <br />
              Colors may slightly vary due to photographic lighting or screen settings.
            </p>
          </div>
        </div>
        {/* Copyright */}
        <div
          className="border-t pt-4 flex flex-col md:flex-row justify-between items-center text-sm gap-2"
          style={{ borderColor: COLORS.accent, color: COLORS.text }}
        >
          <div className="text-sm md:text-base" style={{ color: COLORS.primary }}> {/* Adjusted text size */}
            © 2025 Tehzeeb Creations. All Rights Reserved.
          </div>
          <div className="text-sm md:text-base" style={{ color: COLORS.primary }}> {/* Adjusted text size */}
            Designed & Developed with <span style={{ color: COLORS.secondary }}></span> by TP India Network
          </div>
        </div>
      </div>
    </footer>
  );
}

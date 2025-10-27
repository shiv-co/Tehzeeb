import React from "react";
import { FiInstagram, FiFacebook, FiYoutube } from "react-icons/fi";
import { FaPinterestP } from "react-icons/fa";

// New color theme
const COLORS = {
  primary: "#B3541E",      // Terracotta
  secondary: "#D6A74F",    // Mustard Gold
  accent: "#A5A58D",       // Sage Green
  text: "#3E2F1C",         // Deep Brown
  background: "#F5EBDD",   // Linen/Sand
};

export default function Footer() {
  return (
    <footer
      className="pt-10 pb-4 px-4 md:px-16"
      style={{ background: COLORS.background, color: COLORS.text }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: COLORS.primary }}>
            <span role="img" aria-label="links"></span> Quick Links
          </h3>
          <ul className="space-y-2" style={{ color: COLORS.text }}>
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
            <span role="img" aria-label="mail"></span> Contact Us
          </h3>
          <ul className="space-y-2" style={{ color: COLORS.text }}>
            <li>
              Address: Tehzeeb Creations, Lucknow, India
            </li>
            <li>
              Email:{" "}
              <a
                href="mailto:support@tehzeebcreations.com"
                className="hover:underline hover:text-[#B3541E]"
                style={{ color: COLORS.primary }}
              >
                support@tehzeebcreations.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a
                href="tel:+919XXXXXXXXX"
                className="hover:underline hover:text-[#B3541E]"
                style={{ color: COLORS.primary }}
              >
                +91 9XXXXXXXXX
              </a>
            </li>
            <li>
              Working Hours: Mon – Sat | 10:00 AM – 7:00 PM
            </li>
          </ul>
        </div>

        {/* Social / Follow Us */}
        <div>
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: COLORS.primary }}>
            <span role="img" aria-label="earth"></span> Follow Us
          </h3>
          <p className="mb-3" style={{ color: COLORS.accent }}>
            Stay connected and get inspired by our latest designs & styling ideas:
          </p>
          <div className="flex gap-4 text-2xl">
            <a
              href="https://instagram.com/tehzeebcreations"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-[#B3541E]"
              style={{ color: COLORS.primary }}
            >
              <FiInstagram />
            </a>
            <a
              href="https://facebook.com/tehzeebcreations"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-[#B3541E]"
              style={{ color: COLORS.primary }}
            >
              <FiFacebook />
            </a>
            <a
              href="https://pinterest.com/tehzeebcreations"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest"
              className="hover:text-[#B3541E]"
              style={{ color: COLORS.primary }}
            >
              <FaPinterestP />
            </a>
            <a
              href="https://youtube.com/tehzeebcreations"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-[#B3541E]"
              style={{ color: COLORS.primary }}
            >
              <FiYoutube />
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div>
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: COLORS.primary }}>
            <span role="img" aria-label="warning"></span> Disclaimer
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
        <div className="text-lg" style={{ color: COLORS.primary }}>
          © 2025 Tehzeeb Creations. All Rights Reserved.
        </div>
        <div className="text-lg" style={{ color: COLORS.primary }}>
          Designed & Developed with <span style={{ color: COLORS.secondary }}></span> by TP India Network
        </div>
      </div>
    </footer>
  );
}
import React from "react";
import { FiInstagram, FiFacebook, FiYoutube } from "react-icons/fi";
import { FaPinterestP } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#f2d0d0] text-black pt-10 pb-4 px-4 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <span role="img" aria-label="links">🔗</span> Quick Links
          </h3>
          <ul className="space-y-2  text-[#3B7046] ">
            <li><a href="/contact" className="hover:text-[#2d5c37] flex items-center gap-2">📞 Contact Us</a></li>
            <li><a href="/account" className="hover:text-[#2d5c37] flex items-center gap-2">🛍️ My Account</a></li>
            <li><a href="/terms" className="hover:text-[#2d5c37] flex items-center gap-2">📜 Terms & Conditions</a></li>
            <li><a href="/privacy" className="hover:text-[#2d5c37] flex items-center gap-2">🔒 Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <span role="img" aria-label="mail">📬</span> Contact Us
          </h3>
          <ul className="space-y-2 text-[#3B7046]">
            <li>📍 Address: Tehzeeb Creations, Lucknow, India</li>
            <li>
              📧 Email: <a href="mailto:support@tehzeebcreations.com" className="hover:text-[#2d5c37] underline">support@tehzeebcreations.com</a>
            </li>
            <li>
              📞 Phone: <a href="tel:+919XXXXXXXXX" className="hover:text-[#2d5c37] underline">+91 9XXXXXXXXX</a>
            </li>
            <li>🕓 Working Hours: Mon – Sat | 10:00 AM – 7:00 PM</li>
          </ul>
        </div>

        {/* Social / Follow Us */}
        <div >
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-black">
            <span role="img" aria-label="earth">🌐</span> Follow Us
          </h3>
          <p className="text-[#3B7046] mb-3">
            Stay connected and get inspired by our latest designs & styling ideas:
          </p>
          <div className="flex gap-4 text-2xl">
            <a href="https://instagram.com/tehzeebcreations" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#F9A9AC]">
              <FiInstagram />
            </a>
            <a href="https://facebook.com/tehzeebcreations" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-[#F9A9AC]">
              <FiFacebook />
            </a>
            <a href="https://pinterest.com/tehzeebcreations" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="hover:text-[#F9A9AC]">
              <FaPinterestP />
            </a>
            <a href="https://youtube.com/tehzeebcreations" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-[#F9A9AC]">
              <FiYoutube />
            </a>
          </div>
          {/* <ul className="mt-3 text-[#3B7046] text-sm space-y-1">
            <li>🔹 Instagram: <span className="font-semibold">@tehzeebcreations</span></li>
            <li>🔹 Facebook: <span className="font-semibold">Tehzeeb Creations</span></li>
            <li>🔹 Pinterest: <span className="font-semibold">Tehzeeb Creations</span></li>
            <li>🔹 YouTube: <span className="font-semibold">Tehzeeb Creations</span></li>
          </ul> */}
        </div>

        {/* Disclaimer */}
        <div>
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <span role="img" aria-label="warning">⚠️</span> Disclaimer
          </h3>
          <p className="text-[#3B7046] text-sm mb-4">
            All products and designs showcased on Tehzeeb Creations are created with utmost care and originality. <br />
            Colors may slightly vary due to photographic lighting or screen settings.
          </p>
        </div>
      </div>
      {/* Copyright */}
      <div className="border-t border-[#3B7046] pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-[#FDD7D7] gap-2">
        <div className="text-[#3B7046] text-lg">
          © 2025 Tehzeeb Creations. All Rights Reserved.
        </div>
        <div className="text-[#3B7046] text-lg">
          Designed & Developed with <span className="text-[#3B7046]">❤️</span> by TP India Network
        </div>
      </div>
    </footer>
  );
}
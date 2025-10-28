import React from "react";
// You can replace this with your own phone image
import PhoneImage from "../assets/images/phone.png";

const COLORS = {
  primary: "#B3541E",     // Terracotta
  secondary: "#D6A74F",   // Mustard Gold
  accent: "#A5A58D",     // Sage Green
  text: "#3E2F1C",        // Deep Brown
  background: "#F5EBDD",  // Linen / Sand
  off: "#E7793D",        // For icons & emphasis
};

export default function ContactUsPage() {
  return (
    <div style={{ background: COLORS.background, minHeight: "100vh" }}>
      {/* Header */}
      <div
        className="w-full py-10 flex flex-col items-center"
        
      >
        <h1
          className="text-5xl font-extrabold mb-4"
          style={{ color: COLORS.text }}
        >
          Contact us
        </h1>
        
      </div>
      {/* Main Content */}
      {/* --- THIS IS THE FIX --- */}
      {/* Added w-full and the xl/2xl max-width classes */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-stretch gap-10 px-3 py-16 xl:max-w-[1440px] 2xl:max-w-[1720px]">
        {/* Left */}
        <div className="flex-1 flex flex-col justify-center">
          <h2
            className="text-4xl font-bold mb-8 leading-snug"
            style={{ color: COLORS.text }}
          >
            We are happy to <br /> help you to resolve <br /> your issues
          </h2>
          <div
            className="flex items-center gap-4 p-6 rounded-lg mt-3"
            style={{
              background: "#fff",
              borderLeft: `5px solid ${COLORS.primary}`,
              boxShadow: "0 0 8px 0 #0001",
              maxWidth: 350
            }}
          >
            <span>
              {/* Headset Icon */}
              <svg width={45} height={45} fill="none" stroke={COLORS.accent} strokeWidth={2.2} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke={COLORS.accent} strokeWidth="2"/>
                <path d="M7 17v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" stroke={COLORS.primary} strokeWidth="2"/>
                <rect x="9" y="17" width="6" height="3" rx="1.5" fill={COLORS.accent}/>
              </svg>
            </span>
            <div>
              <div className="text-base" style={{ color: COLORS.text }}>
                We respond to your queries within
              </div>
              <div className="mt-1 text-2xl font-bold" style={{ color: COLORS.primary }}>
                24 Hours
              </div>
            </div>
          </div>
        </div>
        {/* Center */}
        <div className="flex-1 flex items-center justify-center">
          <img
            src={PhoneImage}
            alt="Contact Phone"
            className="rounded-xl shadow-lg object-cover"
            style={{ width: "100%", maxWidth: 400, minHeight: 260, background: COLORS.accent }}
          />
        </div>
        {/* Right */}
        <div className="flex-1 flex flex-col justify-center border-t md:border-t-0 md:border-l border-[#ddd] pl-0 md:pl-10 pt-9 md:pt-0">
          {/* Phone */}
          <div className="flex items-center gap-3 mb-7">
            <span>
              <svg width={28} height={28} fill={COLORS.off} viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.464 15.464 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.1.36 2.28.55 3.5.55a1 1 0 0 1 1 1v3.25a1 1 0 0 1-1 1C10.07 21 3 13.93 3 5.75A1 1 0 0 1 4 4.75h3.25a1 1 0 0 1 1 1c0 1.22.19 2.4.55 3.5a1 1 0 0 1-.24 1.01l-2.2 2.2z"/>
              </svg>
            </span>
            <span className="text-xl font-semibold" style={{ color: COLORS.primary }}>
              6394728933, 9454619493, <br />8127239729
            </span>
          </div>
          <hr className="border-t border-[#e2ded9] mb-7" />
          {/* Email */}
          <div className="flex items-center gap-3 mb-7">
            <span>
              <svg width={28} height={28} fill="none" stroke={COLORS.secondary} strokeWidth={2} viewBox="0 0 24 24">
                <rect x="2" y="6" width="20" height="12" rx="3" stroke={COLORS.secondary} strokeWidth="2"/>
                <path d="M3 7l9 7 9-7" stroke={COLORS.primary} strokeWidth="2"/>
              </svg>
            </span>
            <span className="text-lg font-medium" style={{ color: COLORS.text }}>
              tehzeebcreations.in@gmail.com
            </span>
          </div>
          <hr className="border-t border-[#e2ded9] mb-7" />
          {/* Chat */}
          <div className="flex items-center gap-3">
            <span>
              <svg width={28} height={28} fill="none" stroke={COLORS.primary} strokeWidth={2} viewBox="0 0 24 24">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </span>
            <span className="text-lg font-medium" style={{ color: COLORS.primary }}>
              Chat with us
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

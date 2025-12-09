import React from "react";
import { Link } from "react-router-dom";
import {
  FiLock,
  FiUser,
  FiDatabase,
  FiShield,
  FiEye,
  FiMail,
} from "react-icons/fi";

const COLORS = {
  primary: "#B3541E",
  secondary: "#D6A74F",
  accent: "#A5A58D",
  text: "#3E2F1C",
  background: "#F5EBDD",
};

export default function PrivacyPolicyPage() {
  return (
    <div
      className="min-h-screen py-10 px-6 md:px-10"
      style={{ background: COLORS.background }}
    >
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-10">
        
        {/* Back Link */}
        <Link
          to="/"
          className="inline-block text-sm font-semibold mb-4"
          style={{ color: COLORS.accent }}
        >
          ← Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <h1
            className="text-3xl md:text-4xl font-extrabold"
            style={{ color: COLORS.primary }}
          >
            Privacy Policy
          </h1>
          <p
            className="mt-3 text-base md:text-lg"
            style={{ color: COLORS.text }}
          >
            Your privacy matters to us. Here's how Tehzeeb Creations protects your
            data.
          </p>
        </div>

        {/* Highlight Banner */}
        <div
          className="p-4 rounded-xl mb-10"
          style={{
            background: "#FFF3D4",
            borderLeft: `6px solid ${COLORS.secondary}`,
          }}
        >
          <p style={{ color: COLORS.text }} className="text-sm md:text-base">
            This Privacy Policy describes how Tehzeeb Creations collects, uses, and 
            protects your personal information while you browse or shop with us.
          </p>
        </div>

        {/* Section Cards */}
        <div className="space-y-10">

          <SectionCard
            icon={<FiUser size={26} />}
            title="Information We Collect"
            content={[
              "Name, email address, phone number, and shipping address.",
              "Order details, browsing behavior, and product preferences.",
              "Payment information (securely processed through trusted gateways).",
              "Technical details such as IP address, browser type, and device info.",
            ]}
          />

          <SectionCard
            icon={<FiDatabase size={26} />}
            title="How We Use Your Information"
            content={[
              "To process and deliver your orders securely.",
              "To improve your shopping experience on our website.",
              "To personalize recommendations and show relevant products.",
              "To send order updates, promotions, or service messages.",
            ]}
          />

          <SectionCard
            icon={<FiLock size={26} />}
            title="Data Security"
            content={[
              "Your data is stored in secure, encrypted servers.",
              "Payment information is never stored on our servers.",
              "We follow strict industry standards to prevent data breaches.",
            ]}
          />

          <SectionCard
            icon={<FiEye size={26} />}
            title="Cookies & Tracking"
            content={[
              "We use cookies to remember your preferences and improve usability.",
              "Cookies help optimize page loading, cart functions, and product suggestions.",
              "You can disable cookies in your browser at any time.",
            ]}
          />

          <SectionCard
            icon={<FiShield size={26} />}
            title="Third-Party Sharing"
            content={[
              "We DO NOT sell or trade your personal information.",
              "Data is shared only with trusted delivery partners and payment gateways.",
              "Analytics tools (such as Google Analytics) help understand shopping behavior.",
            ]}
          />

          <SectionCard
            icon={<FiMail size={26} />}
            title="Your Rights"
            content={[
              "You may request access to your personal data at any time.",
              "You may ask us to update or delete your stored information.",
              "You may opt-out of marketing messages with a single click.",
            ]}
          />

          {/* Notice */}
          <div
            className="p-4 rounded-xl"
            style={{ background: "#E8F1FF", borderLeft: "6px solid #4A6DFF" }}
          >
            <p className="text-sm md:text-base">
              For account, privacy, or data-related queries, contact our support team at  
              <span className="font-semibold" style={{ color: COLORS.primary }}>
                {" "}tehzeebofficial@gmail.com
              </span>
              .
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}


/* Reusable Section Component */
function SectionCard({ icon, title, content }) {
  return (
    <div className="p-5 rounded-xl shadow-md bg-white border border-[#E8D9C8] hover:shadow-lg transition">
      <div className="flex items-center gap-3 mb-3">
        <span className="p-2 rounded-full" style={{ background: "#F7E9DD" }}>
          {icon}
        </span>
        <h2 className="text-xl md:text-2xl font-bold" style={{ color: COLORS.primary }}>
          {title}
        </h2>
      </div>

      <div className="space-y-2">
        {content.map((text, index) => (
          <p key={index} className="text-sm md:text-base leading-6" style={{ color: COLORS.text }}>
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}

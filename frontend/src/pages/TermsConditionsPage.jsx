import React from "react";
import { Link } from "react-router-dom";
import { FiShield, FiBox, FiTruck, FiStar, FiLock, FiPhone } from "react-icons/fi";

const COLORS = {
  primary: "#B3541E",
  secondary: "#D6A74F",
  accent: "#A5A58D",
  text: "#3E2F1C",
  background: "#F5EBDD",
};

export default function TermsConditionsPage() {
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

        {/* Page Header */}
        <div className="text-center mb-10">
          <h1
            className="text-3xl md:text-4xl font-extrabold"
            style={{ color: COLORS.primary }}
          >
            Terms & Conditions
          </h1>
          <p className="mt-3 text-base md:text-lg" style={{ color: COLORS.text }}>
            These guidelines ensure a smooth and trustworthy shopping experience with
            <strong> Tehzeeb Creations</strong>.
          </p>
        </div>

        {/* ★ Highlight Notice Box */}
        <div
          className="p-4 md:p-5 rounded-xl mb-10"
          style={{ background: "#FFF5D6", borderLeft: `6px solid ${COLORS.secondary}` }}
        >
          <p className="text-sm md:text-base" style={{ color: COLORS.text }}>
            By using our website or placing an order, you agree to follow these terms.
            Please read them carefully to understand your rights as a customer.
          </p>
        </div>

        {/* CONTENT SECTIONS */}
        <div className="space-y-10">

          {/* SECTION CARD */}
          <SectionCard
            icon={<FiShield size={28} />}
            title="Use of Our Website"
            content={[
              "By accessing Tehzeeb Creations, you confirm that you are above 18 years of age or browsing under supervision.",
              "All images, designs & content displayed belong exclusively to Tehzeeb Creations.",
              "Unauthorized commercial use, copying, or distribution is strictly prohibited."
            ]}
          />

          <SectionCard
            icon={<FiStar size={28} />}
            title="Product Details & Pricing"
            content={[
              "We strive to provide accurate images, colors, and descriptions for each product.",
              "Colors may vary slightly based on device brightness and photography lighting.",
              "Prices may change without prior notice depending on stock or promotions."
            ]}
          />

          <SectionCard
            icon={<FiBox size={28} />}
            title="Order Confirmation"
            content={[
              "An email confirmation will be sent after your order is placed.",
              "Orders may be cancelled if items go out of stock or in case of incomplete address details.",
              "Tehzeeb Creations reserves the right to decline orders that appear fraudulent."
            ]}
          />

          <SectionCard
            icon={<FiTruck size={28} />}
            title="Shipping & Delivery"
            content={[
              "Delivery timelines vary based on city, pin code, and courier capabilities.",
              "Festival seasons, weather conditions, or courier delays may affect delivery dates.",
              "Tracking details will be shared once your order is dispatched."
            ]}
          />

          <SectionCard
            icon={<FiLock size={28} />}
            title="Payment Security"
            content={[
              "We use secure, encrypted gateways to process payments.",
              "Your card or bank details are never stored on our servers.",
              "Accepted modes include UPI, Wallets, Cards and Net Banking."
            ]}
          />

          {/* Redirect Highlight */}
          <div
            className="p-4 rounded-xl"
            style={{ background: "#F1F5FF", borderLeft: "6px solid #4A6DFF" }}
          >
            <p className="text-sm md:text-base">
              For returns, exchanges, or refund concerns, please visit our{" "}
              <Link
                to="/cancellation-refund"
                className="font-semibold underline"
                style={{ color: COLORS.primary }}
              >
                Cancellation & Refund Policy page.
              </Link>
            </p>
          </div>

          <SectionCard
            icon={<FiPhone size={28} />}
            title="Need Support?"
            content={[
              "Email: tehzeebcreations.in@gmail.com",
              "WhatsApp: +91 960788851",
              "Support Hours: 10 AM – 7 PM (Mon–Sat)"
            ]}
          />

        </div>
      </div>
    </div>
  );
}


/* ------------------------------
   ✨ Reusable Stylish Section Card
--------------------------------*/
function SectionCard({ icon, title, content }) {
  return (
    <div className="p-5 rounded-xl shadow-md bg-white border border-[#E8D9C8] transition hover:shadow-lg">
      <div className="flex items-center gap-3 mb-3">
        <span className="p-2 rounded-full" style={{ background: "#F8EDE3" }}>
          {icon}
        </span>
        <h2 className="text-xl md:text-2xl font-bold" style={{ color: COLORS.primary }}>
          {title}
        </h2>
      </div>

      <div className="space-y-2 md:space-y-3">
        {content.map((text, idx) => (
          <p key={idx} className="text-sm md:text-base leading-6" style={{ color: COLORS.text }}>
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}

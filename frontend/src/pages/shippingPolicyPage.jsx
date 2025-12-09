import React from "react";
import { Link } from "react-router-dom";
import { FiTruck, FiClock, FiMapPin, FiInfo, FiShield } from "react-icons/fi";

const COLORS = {
  primary: "#B3541E",
  secondary: "#D6A74F",
  accent: "#A5A58D",
  text: "#3E2F1C",
  background: "#F5EBDD",
};

export default function ShippingPolicyPage() {
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

        {/* Header Section */}
        <div className="text-center mb-10">
          <h1
            className="text-3xl md:text-4xl font-extrabold"
            style={{ color: COLORS.primary }}
          >
            Shipping Policy
          </h1>
          <p className="mt-3 text-base md:text-lg" style={{ color: COLORS.text }}>
            Tehzeeb Creations ensures safe, fast and reliable delivery of every order.
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
            We ship across India through trusted logistics partners. Delivery times may vary 
            based on your location and order volume.
          </p>
        </div>

        {/* SECTION CARDS */}
        <div className="space-y-10">

          <SectionCard
            icon={<FiMapPin size={26} />}
            title="Delivery Coverage"
            content={[
              "We deliver to all major cities and towns across India.",
              "Remote and rural areas may take additional time depending on courier service availability.",
              "If delivery to your pin code is unavailable, you will be notified via message or email."
            ]}
          />

          <SectionCard
            icon={<FiClock size={26} />}
            title="Estimated Delivery Time"
            content={[
              "Orders are usually dispatched within 1–3 business days.",
              "Standard delivery times range from 4–9 working days depending on your location.",
              "During festivals or high-volume periods, delivery may take slightly longer."
            ]}
          />

          <SectionCard
            icon={<FiTruck size={26} />}
            title="Shipping Charges"
            content={[
              "Shipping charges (if applicable) will be visible at checkout.",
              "Free shipping may be offered during promotional campaigns.",
              "Cash on Delivery (COD) may include an additional service charge."
            ]}
          />

          <SectionCard
            icon={<FiShield size={26} />}
            title="Packaging & Safety"
            content={[
              "All products are packed securely to avoid any transit damage.",
              "Garments are sealed in moisture-resistant packaging.",
              "Fragile items (if any) receive additional shock-proof layering."
            ]}
          />

          <SectionCard
            icon={<FiInfo size={26} />}
            title="Tracking Your Order"
            content={[
              "Once shipped, you will receive a tracking link via SMS or email.",
              "Tracking updates depend on your courier service provider.",
              "If your tracking status does not update for 48 hours, contact our support team."
            ]}
          />

          {/* Redirect Highlight */}
          <div
            className="p-4 rounded-xl"
            style={{ background: "#E8F1FF", borderLeft: "6px solid #4A6DFF" }}
          >
            <p className="text-sm md:text-base">
              For returns or refund-related queries, read our{" "}
              <Link
                to="/cancellation-refund"
                className="font-semibold underline"
                style={{ color: COLORS.primary }}
              >
                Cancellation & Refund Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


/* Reusable Card Component */
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

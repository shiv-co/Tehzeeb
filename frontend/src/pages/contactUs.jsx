import React from "react";
import { Link } from "react-router-dom";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiInstagram,
  FiFacebook,
  FiMessageCircle,
} from "react-icons/fi";
import WhatsappPage from "../components/whatsapp.jsx";
import PhoneImage from "../assets/images/phone.png";

const COLORS = {
  primary: "#B3541E",
  secondary: "#D6A74F",
  accent: "#A5A58D",
  text: "#3E2F1C",
  background: "#F5EBDD",
  off: "#E7793D",
};

export default function ContactUsPage() {
  return (
    <div style={{ background: COLORS.background, minHeight: "100vh" }}>
      {/* Back Button */}
      <div className="max-w-6xl mx-auto pt-6 px-5">
        <Link
          to="/"
          className="text-sm font-semibold"
          style={{ color: COLORS.accent }}
        >
          ← Back to Home
        </Link>
      </div>

      {/* HERO SECTION */}
      <div className="text-center mt-6 mb-10">
        <h1
          className="text-2xl md:text-5xl font-extrabold"
          style={{ color: COLORS.primary }}
        >
          Contact Us
        </h1>
        <p className="mt-3 text-xs md:text-lg" style={{ color: COLORS.text }}>
          We're here to help — Reach out anytime.
        </p>
      </div>

      {/* TOP THREE CONTACT CARDS */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-5 mb-16">
        <ContactCard
          icon={<FiPhone size={26} />}
          title="Call Us"
          text="Available 10AM - 7PM IST"
          link="tel:+91960788851"
          hrefText="+91 960788851"
        />

        <ContactCard
          icon={<FiMail size={26} />}
          title="Email Us"
          text="We respond within 24 hours"
          link="mailto:tehzeebcreations.in@gmail.com"
          hrefText="tehzeebcreations.in@gmail.com"
        />

        {/* <ContactCard
          icon={<FiMapPin size={26} />}
          title="Visit Store"
          text="Tehzeeb Creations, Lucknow"
          link="https://maps.google.com"
          hrefText="Open on Google Maps"
        /> */}
      </div>

      {/* MERGED THREE-COLUMN SECTION */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-stretch gap-10 px-5 py-10">
        {/* LEFT SIDE: Message */}
        <div className="flex-1 flex flex-col justify-center">
          <h2
            className="text-lg md:text-mxl font-bold mb-6 leading-snug"
            style={{ color: COLORS.text }}
          >
            We are Happy to Help You <br /> Resolve your queries
          </h2>

          <div
            className="flex items-center gap-4 p-6 rounded-lg"
            style={{
              background: "#fff",
              borderLeft: `5px solid ${COLORS.primary}`,
              boxShadow: "0 0 8px 0 #0001",
              maxWidth: 350,
            }}
          >
            <svg width={45} height={45} fill="none" stroke={COLORS.accent} strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M7 17v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
              <rect x="9" y="17" width="6" height="3" rx="1.5" />
            </svg>
            <div>
              <p className="text-base" style={{ color: COLORS.text }}>
                We usually reply within
              </p>
              <p className="text-2xl font-bold" style={{ color: COLORS.primary }}>
                24 Hours
              </p>
            </div>
          </div>
        </div>

        {/* CENTER IMAGE */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={PhoneImage}
            alt="Contact Support"
            className="rounded-xl shadow-lg object-cover"
            style={{ width: "100%", maxWidth: 380 }}
          />
        </div>

        {/* RIGHT SIDE CONTACT DETAILS */}
        <div className="flex-1 flex flex-col  justify-center border-t md:border-t-0 md:border-l border-[#ddd] pt-8 md:pt-0 md:pl-10">
          {/* Phone */}
          <InfoRow
          className="text-xs md:text-2xl"
            icon="phone"
            text={
              <>
                960788851 <br /> 9454619493 <br /> 8127239729
              </>
            }
          />

          <hr className="border-[#e2ded9] my-5" />

          {/* Email */}
          <InfoRow icon="mail" text="tehzeebcreations.in@gmail.com" />

          <hr className="border-[#e2ded9] my-5" />

          {/* Chat */}
          <InfoRow icon="chat" text="Chat with us" />
        </div>
      </div>

      {/* CONTACT FORM */}
      <div className="max-w-4xl mx-auto bg-[#FFF6E8] rounded-xl p-6 md:p-10 shadow mb-16">
        <h2 className="text-2xl font-bold mb-4" style={{ color: COLORS.primary }}>
          Send Us a Message
        </h2>
        <form className="space-y-4">
          <input className="input-box border-1 rounded-lg border-gray-500 p-2 mx-2" type="text" placeholder="Your Name" />
          <input className="input-box border-1 rounded-lg border-gray-500 p-2 mx-2" type="email" placeholder="Your Email" />
          <textarea className="input-box " rows="4" placeholder="Your Message"></textarea>

          <button
            className="w-full py-3 rounded-lg text-white font-semibold"
            style={{ background: COLORS.primary }}
          >
            Send Message
          </button>
        </form>
      </div>

      {/* SOCIAL MEDIA */}
      <div className="text-center mb-8">
        <h2
          className="text-2xl font-bold mb-4"
          style={{ color: COLORS.primary }}
        >
          Connect With Us
        </h2>
        <div className="flex justify-center gap-6 pb-5">
          <SocialIcon href="https://www.instagram.com/tehzeebcreations.in/" icon={<FiInstagram size={28} />} />
          <SocialIcon href="https://facebook.com/tehzeebcreations" icon={<FiFacebook size={28} />} />
          {/* <SocialIcon href="#" icon={<FiMessageCircle size={28} />} /> */}
        </div>
      </div>

      {/* MAP */}
      {/* <div className="rounded-xl overflow-hidden shadow-lg max-w-5xl mx-auto mb-20 px-5">
        <iframe
          className="w-full h-64 md:h-96"
          src="https://www.google.com/maps/embed?pb=..."
          loading="lazy"
          title="Map"
        ></iframe>
      </div> */}

      <WhatsappPage />
    </div>
  );
}

/* COMPONENTS */
function ContactCard({ icon, title, text, link, hrefText }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow border border-[#EAD9C7] hover:-translate-y-1 transition">
      <div className="flex items-center gap-3 mb-3">
        <span className="p-2 rounded-full bg-[#F7E9DD]">{icon}</span>
        <h3 className="text-lg font-bold" style={{ color: COLORS.primary }}>
          {title}
        </h3>
      </div>
      <p className="text-sm mb-2" style={{ color: COLORS.text }}>
        {text}
      </p>
      <a href={link} className="underline font-semibold" style={{ color: COLORS.primary }}>
        {hrefText}
      </a>
    </div>
  );
}

function InfoRow({ icon, text }) {
  const icons = {
    phone: <FiPhone size={26} color={COLORS.off} />,
    mail: <FiMail size={26} color={COLORS.secondary} />,
    chat: <FiMessageCircle size={26} color={COLORS.primary} />,
  };

  return (
    <div className="flex items-center gap-4">
      {icons[icon]}
      <p className="text-lg font-medium" style={{ color: COLORS.text }}>
        {text}
      </p>
    </div>
  );
}

function SocialIcon({ href, icon }) {
  return (
    <a
      href={href}
      className="p-3 bg-white rounded-full shadow border hover:bg-[#FFF2E6]"
    >
      {icon}
    </a>
  );
}

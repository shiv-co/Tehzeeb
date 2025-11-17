import React from "react";
import { Link } from "react-router-dom";
// Replace with your actual image
import backgroundImage from "../assets/images/fashion2.png"; // Assuming this is the correct image path
import { motion } from "framer-motion";
const MotionLink = motion.create(Link);
import ProductsPage from "../pages/productPage.jsx";
import WhatsappPage from "../components/whatsapp.jsx";

// Color Theme
const COLORS = {
  primary: "#B3541E", // Terracotta
  secondary: "#D6A74F", // Mustard Gold
  accent: "#A5A58D", // Sage Green
  text: "#3E2F1C", // Deep Brown
  background: "#F5EBDD", // Linen / Sand
};

export default function HomePage() {
  return (
    <>
    <section
      className="relative min-h-screen w-full flex items-center justify-center"
      style={{ background: COLORS.background }}
    >
      {/* Background image */}
      <div
        // --- THIS IS THE FIX ---
        // Changed 'bg-center' to 'bg-top'
        className="absolute inset-0 w-full min-h-screen bg-cover bg-top"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          zIndex: 0,
        }}
      >
        {/* A semi-transparent overlay for readable text */}
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </div>

      {/* Foreground content */}
      {/* Adjusted padding and margin for better text placement */}
      <div className="relative z-10 flex items-start justify-center flex-col w-full max-w-7xl mx-auto px-8 md:px-16 lg:ml-20 xl:ml-48">
        <h1
          className="text-4xl md:text-6xl font-extrabold text-left leading-tight drop-shadow-lg" // Changed text-center to text-left
          style={{ color: COLORS.primary }}
        >
          New{" "}
          <span className="block md:inline" style={{ color: COLORS.secondary }}>
            Arrivals
          </span>
        </h1>
        <p
          className="mt-4 text-lg md:text-2xl font-semibold text-left drop-shadow-lg" // Changed text-center to text-left
          style={{ color: COLORS.accent }}
        >
          NEW SEASON, NEW STYLES:
        </p>
        <p
          className="text-md md:text-lg font-medium mt-2 text-left drop-shadow-lg" // Changed text-center to text-left
          style={{ color: COLORS.text }}
        >
          EXPLORE OUR <br />
          <span className="font-bold" style={{ color: COLORS.secondary }}>
            LATEST COLLECTION
          </span>
        </p>

        <MotionLink
          to={"/shop"}
          className="mt-8 px-8 py-3 font-bold text-lg rounded shadow   hover:shadow-xl focus:outline-none"
          animate={{
             scale: [1, 1.06, 1.1, 1.06, 1], // slight growth and shrink
          }}
          transition={{
            duration: 1.2, // one beat duration
            repeat: Infinity, // loop forever
            ease: "easeInOut",
            delay: 3,
          }}
          whileHover={{
            scale: 1.12, // gentle zoom on hover
            transition: { duration: 0.3 },
          }}
          style={{
            background: COLORS.primary,
            color: "#fff",
            boxShadow: `0 4px 24px 0 ${COLORS.secondary}50`,
          }}
        >
          SHOP NOW
        </MotionLink>
      </div>

     <WhatsappPage/> 
    </section>
      <ProductsPage />

    </>
  );
}

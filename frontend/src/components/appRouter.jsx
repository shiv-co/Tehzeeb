import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your pages
import Navbar from "./navbar";
import HomePage from "../pages/home";
import ProductsPage from "../pages/productPage";
import ProductPreview from "../pages/productPreview";
import LoginPage from "../auth/login";
import SignUpPage from "../auth/signUp";
import AboutUs from "../pages/aboutUs";

// Optional: Add a NotFound component for unmatched routes
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDD7D7]">
      <h1 className="text-3xl text-[#3B7046] font-bold">404 - Page Not Found</h1>
    </div>
  );
}

export default function AppRouter() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductPreview />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
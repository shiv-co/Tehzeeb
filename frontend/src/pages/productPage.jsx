

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductCard from "../pages/productCard.jsx";
import { fetchProducts } from "../redux/productsSlice.js";
import SkeletonCard from "../components/SkeletonCard";

const COLORS = {
  primary: "#B3541E",
  secondary: "#D6A74F",
  accent: "#A5A58D",
  text: "#3E2F1C",
  background: "#F5EBDD",
};

export default function ProductsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  // 2. GET DATA FROM REDUX STORE
  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);

  // 3. FETCH PRODUCTS ON PAGE LOAD
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // For fade-in effect
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // 4. HANDLE LOADING AND ERROR STATES
  if (loading === "pending") {
    return (
      // <div
      //   className="min-h-screen flex items-center justify-center"
      //   style={{ background: COLORS.background }}
      // >
      //   <div className="text-2xl font-semibold" style={{ color: COLORS.primary }}>
      //     Loading Our Collection...
      //   </div>
      // </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-x-10  md:gap-y-12 place-items-center md:mx-10">
        {[...Array(16)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: COLORS.background }}
      >
        <div className="text-2xl font-semibold" style={{ color: "red" }}>
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-2 md:py-8 px-2 md:px-8 transition-opacity duration-1000"
      style={{ background: COLORS.background, opacity: show ? 1 : 0 }}
    >
      <h1
        className="text-xl md:text-4xl font-extrabold text-center mb-2 md:mb-10 tracking-tight"
        style={{ color: COLORS.primary }}
      >
        Our Latest Collection
      </h1>
      {/* 5. MAP OVER REAL PRODUCTS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-x-10  md:gap-y-12 place-items-center md:mx-10">
        {products.map((product) => (
          <div
            key={product._id} // <-- Use _id from MongoDB
            onClick={() => navigate(`/products/${product._id}`)} // <-- Use _id
            style={{ cursor: "pointer", width: "100%" }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

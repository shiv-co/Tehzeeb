// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import ProductCard from '../pages/productCard.jsx';
// import { useNavigate } from 'react-router-dom';

// const COLORS = {
//   primary: '#B3541E',
//   secondary: '#D6A74F',
//   accent: '#A5A58D',
//   text: '#3E2F1C',
//   background: '#F5EBDD',
// };

// export default function ProductsPage() {
//   const products = useSelector((state) => state.products.items);
//   const navigate = useNavigate();
//   const [isMounted, setIsMounted] = useState(false); // <-- 1. For fade-in

//   // 2. Trigger fade-in animation on mount
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   return (
//     <div
//       className="min-h-screen py-8 px-2 md:px-8"
//       style={{ background: COLORS.background }}
//     >
//       <h1
//         className="text-3xl md:text-4xl font-extrabold text-center mb-10 tracking-tight"
//         style={{ color: COLORS.primary }}
//       >
//         Shop Our Collection
//       </h1>
//       {/* 3. Apply animation styles to the grid */}
//       <div
//         className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-10 gap-y-12 place-items-center mx-10"
//         style={{
//           opacity: isMounted ? 1 : 0,
//           transform: isMounted ? 'translateY(0)' : 'translateY(20px)',
//           transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
//         }}
//       >
//         {products.map((product) => (
//           <div
//             key={product.id}
//             onClick={() => navigate(`/products/${product.id}`)}
//             style={{ cursor: 'pointer', width: '100%' }}
//           >
//             <ProductCard product={product} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductCard from "../pages/productCard.jsx";
import { fetchProducts } from "../redux/productsSlice.js"; // <-- 1. IMPORT THUNK

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

  // 4. HANDLE LOADING AND ERROR STATES
  if (loading === "pending") {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: COLORS.background }}
      >
        <div className="text-2xl font-semibold" style={{ color: COLORS.primary }}>
          Loading Our Collection...
        </div>
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
      className="min-h-screen py-8 px-2 md:px-8 transition-opacity duration-1000"
      style={{ background: COLORS.background, opacity: show ? 1 : 0 }}
    >
      <h1
        className="text-3xl md:text-4xl font-extrabold text-center mb-10 tracking-tight"
        style={{ color: COLORS.primary }}
      >
        Shop Our Collection
      </h1>
      {/* 5. MAP OVER REAL PRODUCTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-10 gap-y-12 place-items-center mx-10">
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


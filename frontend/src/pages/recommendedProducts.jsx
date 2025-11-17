
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const COLORS = {
  primary: "#B3541E",
  secondary: "#D6A74F",
  accent: "#A5A58D",
  text: "#3E2F1C",
  background: "#F5EBDD",
};

/* 🎯 Cloudinary thumbnail generator */
function getCloudinaryThumbnail(url) {
  if (!url || !url.includes("/upload/")) return url;
  const parts = url.split("/upload/");
  return `${parts[0]}/upload/w_400,q_auto:good/${parts[1]}`;
}

export default function RecommendedProducts({ cartItems }) {
  const { items: allProducts } = useSelector((state) => state.products);

  const [recommended, setRecommended] = useState([]);
  const [isFallback, setIsFallback] = useState(false);

  const scrollRef = useRef(null);
  const navigate = useNavigate();

  /* Auto-generate recommended items */
  useEffect(() => {
    if (!allProducts?.length) return;

    if (!cartItems?.length) {
      const popular = allProducts.slice(-6).reverse();
      setRecommended(popular);
      setIsFallback(true);
      return;
    }

    const cartCats = [
      ...new Set(
        cartItems
          .map((i) => i.category?.toLowerCase?.().trim())
          .filter(Boolean)
      ),
    ];

    const filtered = allProducts.filter(
      (p) =>
        p.category &&
        cartCats.some((cat) =>
          p.category.toLowerCase().includes(cat.split(" ")[0])
        ) &&
        !cartItems.some((item) => item._id === p._id)
    );

    const extras = allProducts.filter(
      (p) =>
        ["dupatt", "kurti", "gown", "dress"].some((k) =>
          p.category?.toLowerCase().includes(k)
        ) &&
        !cartItems.some((item) => item._id === p._id)
    );

    const finalList = [...filtered, ...extras].slice(0, 10);

    if (!finalList.length) {
      const fallback = allProducts.slice(-6).reverse();
      setRecommended(fallback);
      setIsFallback(true);
    } else {
      setRecommended(finalList);
      setIsFallback(false);
    }
  }, [cartItems, allProducts]);

  if (!recommended.length) return null;

  /* 📌 Scroll buttons */
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -260, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 260, behavior: "smooth" });
  };

  return (
    <div
      className="w-full mt-16 mb-10 mx-auto px-4 md:px-6"
      style={{ background: COLORS.background }}
    >
      <motion.h2
        className="text-3xl font-bold text-center mb-8"
        style={{ color: COLORS.primary }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {isFallback ? "Popular Picks" : "You May Also Like"}
      </motion.h2>

      {/* 📌 MOBILE VIEW — vertical scroll */}
      <div className="md:hidden flex flex-col gap-6">
        {recommended.map((product, i) => (
          <Link key={product._id} to={`/products/${product._id}`} className="">
            <ProductCardMini product={product} />
          </Link>
        ))}
      </div>

      {/* 📌 DESKTOP VIEW — horizontal carousel */}
      <div className="hidden md:block relative">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute -left-3 top-1/2 -translate-y-1/2 bg-[#B3541E] text-white w-10 h-10 rounded-full shadow-lg z-20 hover:scale-110 transition"
        >
          ‹
        </button>

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-scroll scrollbar-hide pb-4 scroll-smooth"
        >
          {recommended.map((product) => (
            <Link key={product._id} to={`/products/${product._id}`}>
              <ProductCardMini product={product} />
            </Link>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute -right-3 top-1/2 -translate-y-1/2 bg-[#B3541E] text-white w-10 h-10 rounded-full shadow-lg z-20 hover:scale-110 transition"
        >
          ›
        </button>
      </div>

      <p className="text-center text-gray-600 mt-4 text-sm">
        {isFallback
          ? "Discover our most loved pieces ✨"
          : "Curated just for you 💛 based on your cart"}
      </p>
    </div>
  );
}

/**************************************
 ⭐ PRODUCT MINI CARD (MATCHING SHOP PAGE)
**************************************/
function ProductCardMini({ product }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [hovering, setHovering] = useState(false);

  /* Image slider on hover */
  useEffect(() => {
    if (!hovering) return;
    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % product.images.length);
    }, 900);

    return () => clearInterval(interval);
  }, [hovering]);

  return (
    <div
      className="bg-white rounded-sm shadow-lg hover:shadow-xl transition-all flex flex-col w-64 md:w-72 cursor-pointer"
      style={{ minHeight: 350 }}
    >
      {/* IMAGE */}
      <div
        className="relative w-full h-76 md:h-96 overflow-hidden rounded-sm"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => {
          setHovering(false);
          setImgIndex(0);
        }}
      >
        {product.images.map((img, idx) => (
          <img
            key={idx}
            src={getCloudinaryThumbnail(img)}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
            style={{
              opacity: idx === imgIndex ? 1 : 0,
            }}
            loading="lazy"
            alt={product.name}
          />
        ))}
      </div>

      {/* INFO */}
      <div className="p-2 flex flex-col">
        <h3
          className="font-semibold text-base truncate"
          style={{ color: COLORS.text }}
        >
          {product.name}
        </h3>

        <p className="text-sm text-gray-500 truncate">
          {product.description?.slice(0, 40)}...
        </p>

        <span className="font-bold text-lg mt-1" style={{ color: COLORS.primary }}>
          ₹ {product.price}
        </span>
      </div>
    </div>
  );
}

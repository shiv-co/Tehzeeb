import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const COLORS = {
  primary: "#B3541E",
  secondary: "#D6A74F",
  accent: "#A5A58D",
  text: "#3E2F1C",
  background: "#F5EBDD",
};

export default function RecommendedProducts({ cartItems }) {
  const { items: allProducts } = useSelector((state) => state.products);
  const [recommended, setRecommended] = useState([]);
  const [isFallback, setIsFallback] = useState(false);
  const carouselRef = useRef();

  useEffect(() => {
    if (!allProducts?.length) return;

    if (!cartItems?.length) {
      // Show popular picks when cart is empty
      const popular = allProducts.slice(-6).reverse();
      setRecommended(popular);
      setIsFallback(true);
      return;
    }

    // Get categories safely
    const cartCategories = [
      ...new Set(
        cartItems
          .map((item) => item.category?.toLowerCase?.().trim())
          .filter(Boolean)
      ),
    ];

    // Filter similar products
    const filtered = allProducts.filter(
      (p) =>
        p.category &&
        cartCategories.some((cat) => {
          const prodCat = p.category?.toLowerCase?.();
          if (!prodCat || !cat) return false;
          return prodCat.includes(cat.split(" ")[0]);
        }) &&
        !cartItems.some((item) => item._id === p._id)
    );

    // Cross-category (bonus) suggestions
    const extras = allProducts.filter(
      (p) =>
        p.category &&
        ["dupatta", "kurti", "gown", "dress"].some((keyword) =>
          p.category.toLowerCase().includes(keyword)
        ) &&
        !cartItems.some((item) => item._id === p._id)
    );

    const combined = [...filtered, ...extras].slice(0, 8);

    if (combined.length === 0) {
      const fallback = allProducts.slice(-6).reverse();
      setRecommended(fallback);
      setIsFallback(true);
    } else {
      setRecommended(combined);
      setIsFallback(false);
    }
  }, [cartItems, allProducts]);

  if (recommended.length === 0) return null;

  return (
    <div
      className="w-full max-w-7xl mt-16 mb-10 mx-auto px-4 md:px-6 overflow-hidden"
      style={{ background: COLORS.background }}
    >
      <motion.h2
        className="text-3xl font-bold text-center mb-8"
        style={{ color: COLORS.primary }}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {isFallback ? "Popular Picks" : "You May Also Like"}
      </motion.h2>

      {/* 🌀 DRAG SCROLLABLE WRAPPER */}
      <motion.div
        ref={carouselRef}
        className="cursor-grab active:cursor-grabbing"
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          className="flex gap-6 pb-4"
          drag="x"
          dragConstraints={{
            left: -((recommended.length - 3) * 260),
            right: 0,
          }}
          dragElastic={0.12}
          dragTransition={{ bounceStiffness: 200, bounceDamping: 20 }}
        >
          {recommended.map((item, i) => (
            <motion.div
              key={item._id}
              className="flex-shrink-0 w-64 md:w-72 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              whileHover={{ scale: 1.04 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link to={`/products/${item._id}`} className="block">
                <div
                  className="relative w-full h-72 overflow-hidden rounded-t-2xl cursor-grab active:cursor-grabbing"
                  ref={carouselRef}
                  whileTap={{ cursor: "grabbing" }}
                >
                  <img
                    src={item.images?.[0]}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  {item.category && (
                    <div className="absolute top-2 left-2 bg-[#B3541E]/80 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {item.category}
                    </div>
                  )}
                </div>

                <div className="p-4 flex flex-col items-start">
                  <h3
                    className="text-lg font-semibold truncate mb-1"
                    style={{ color: COLORS.text }}
                  >
                    {item.name}
                  </h3>
                  <p
                    className="font-bold text-lg"
                    style={{ color: COLORS.primary }}
                  >
                    ₹ {item.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <p className="text-center text-gray-500 mt-4 text-sm">
        {isFallback
          ? "Discover our most-loved pieces ✨"
          : "Curated for you — inspired by your style & picks 💛"}
      </p>
    </div>
  );
}

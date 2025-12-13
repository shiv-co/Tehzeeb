import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart, setBuyNowItem } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const COLORS = {
  primary: "#B3541E",
  secondary: "#D6A74F",
  accent: "#A5A58D",
  text: "#3E2F1C",
  background: "#F5EBDD",
  off: "#E7793D",
};


  //  CLOUDINARY THUMBNAIL OPTIMIZER

const getCloudinaryThumbnail = (url) => {
  if (!url || !url.includes("/upload/")) return url;
  const parts = url.split("/upload/");
  return `${parts[0]}/upload/w_400,q_auto:good/${parts[1]}`;
};

export default function ProductCard({ product }) {
  const [imgIndex, setImgIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const intervalRef = useRef(null);
  const popupTimeoutRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);

  /* ------------------------------
       DISCOUNT CALCULATION
  ------------------------------ */
  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  /* ------------------------------
        IMAGE SLIDER FUNCTIONS
  ------------------------------ */
  const startSlider = () => {
    if (!product?.images || product.images.length <= 1) return;

    stopSlider();
    intervalRef.current = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % product.images.length);
    }, 1500);
  };

  const stopSlider = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setImgIndex(0);
  };

  /* ------------------------------
        ADD TO CART
  ------------------------------ */
  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));

    setShowPopup(true);
    if (popupTimeoutRef.current) {
      clearTimeout(popupTimeoutRef.current);
    }
    popupTimeoutRef.current = setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  /* ------------------------------
        BUY NOW
  ------------------------------ */
  const handleBuyNow = (e) => {
    e.stopPropagation();
    dispatch(setBuyNowItem({ ...product, quantity: 1 }));
    navigate("/checkout");
  };

  return (
    <div
      className="bg-white md:rounded-sm shadow-lg hover:shadow-2xl transition-shadow flex flex-col overflow-hidden w-full max-w-xs relative cursor-pointer"
      onClick={() => navigate(`/products/${product._id}`)}
      style={{
        minHeight: 360,
      }}
    >
      {/* POPUP */}
      <div
        className="absolute bottom-14 left-1/2 -translate-x-1/2 px-3 py-1 rounded-md text-white text-sm font-semibold transition-all duration-300"
        style={{
          background: "rgba(0,0,0,0.7)",
          opacity: showPopup ? 1 : 0,
          transform: showPopup
            ? "translate(-50%, 0)"
            : "translate(-50%, 10px)",
          zIndex: 20,
          pointerEvents: "none",
        }}
      >
        Added to Cart!
      </div>

      {/* IMAGE SECTION */}
      <div
        className="relative w-full h-64 md:h-96 overflow-hidden"
        onMouseEnter={startSlider}
        onMouseLeave={stopSlider}
        style={{
          background: COLORS.accent,
          cursor: product.images.length > 1 ? "pointer" : "default",
        }}
      >
        {product.images.map((img, index) => (
          <img
            key={index}
            src={getCloudinaryThumbnail(img)}
            alt={product.name}
            className="absolute left-0 top-0 w-full h-full object-cover transition-all duration-700 ease-in-out"
            style={{
              opacity: index === imgIndex ? 1 : 0,
              transform: `translateX(${index === imgIndex ? "0" : "10%"})`,
              zIndex: index === imgIndex ? 2 : 1,
            }}
            loading="lazy"
            draggable={false}
          />
        ))}

        {/* DISCOUNT BADGE */}
        {hasDiscount && (
          <span
            className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded"
            style={{ zIndex: 20 }}
          >
            -{discountPercent}% OFF
          </span>
        )}
      </div>

      {/* PRODUCT INFO */}
      <div className="p-2 flex flex-col flex-grow">
        <h2
          className="font-semibold text-sm md:text-base truncate"
          style={{ color: COLORS.text }}
        >
          {product.name}
        </h2>

        <div className="text-xs md:text-sm mb-1 text-[#7C6A51] truncate">
          {product.description?.substring(0, 50)}...
        </div>

        {/* PRICE ROW */}
        <div className="mb-2 flex items-center gap-2">
          <span
            className="font-bold text-lg"
            style={{ color: COLORS.primary }}
          >
            Rs. {product.price}
          </span>

          {hasDiscount && (
            <>
              <span className="line-through text-sm" style={{ color: COLORS.accent }}>
                Rs. {product.originalPrice}
              </span>
              <span className="text-sm font-bold text-red-600">
                ({discountPercent}% OFF)
              </span>
            </>
          )}
        </div>

        {/* SIZES */}
        {product.sizes?.length > 0 && (
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-gray-600">Sizes:</span>
            {product.sizes.map((size) => (
              <span
                key={size}
                className="px-2 py-1 text-xs border rounded-md bg-[#F5EBDD]"
                style={{ borderColor: COLORS.accent }}
              >
                {size}
              </span>
            ))}
          </div>
        )}

        {/* COLORS */}
        {product.colors?.length > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-gray-600">Colors:</span>
            {product.colors.map((color) => (
              <span
                key={color}
                className="w-4 h-4 rounded-full border"
                style={{
                  background: color,
                  borderColor: COLORS.accent,
                }}
              ></span>
            ))}
          </div>
        )}

        {/* BUTTONS */}
        <div className="mt-auto flex gap-2">
          <button
            onClick={handleAddToCart}
            className="w-1/2 py-2 rounded-lg font-semibold transition text-xs md:text-base"
            style={{
              border: `1px solid ${COLORS.primary}`,
              color: COLORS.primary,
              background: COLORS.background,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = COLORS.primary;
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = COLORS.background;
              e.currentTarget.style.color = COLORS.primary;
            }}
          >
            Add to cart
          </button>

          <button
            onClick={handleBuyNow}
            className="w-1/2 py-2 rounded-lg font-semibold transition text-xs md:text-base"
            style={{
              border: `2px solid ${COLORS.secondary}`,
              color: COLORS.secondary,
              background: COLORS.background,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = COLORS.secondary;
              e.currentTarget.style.color = COLORS.text;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = COLORS.background;
              e.currentTarget.style.color = COLORS.secondary;
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

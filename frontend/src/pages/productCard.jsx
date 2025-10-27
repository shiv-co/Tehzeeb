// import React, { useState, useRef, useEffect } from 'react';
// import { useDispatch } from 'react-redux'; // <-- 1. IMPORT
// import { addToCart } from '../redux/cartSlice'; // <-- 2. IMPORT (check this path!)
// import { useNavigate } from 'react-router-dom'; // <-- 1. IMPORT useNavigate

// const COLORS = {
//   primary: '#B3541E',
//   secondary: '#D6A74F',
//   accent: '#A5A58D',
//   text: '#3E2F1C',
//   background: '#F5EBDD',
//   off: '#E7793D',
// };

// // --- 1. NEW HELPER FUNCTION ---
// /**
//  * Transforms a Cloudinary URL to a 400px wide, auto-quality-good thumbnail.
//  * This is the key to fixing performance.
//  */
// const getCloudinaryThumbnail = (url) => {
//   // Check if it's a Cloudinary URL
//   if (!url || !url.includes('/upload/')) {
//     return url;
//   }
//   const parts = url.split('/upload/');
//   // Injects transformation params
//   const transforms = 'w_400,q_auto:good';
//   return `${parts[0]}/upload/${transforms}/${parts[1]}`;
// };

// export default function ProductCard({ product }) {
//   const [imgIndex, setImgIndex] = useState(0);
//   const [nextIndex, setNextIndex] = useState(null);
//   const [isSliding, setIsSliding] = useState(false);
//   const intervalRef = useRef(null);
//   const dispatch = useDispatch(); // <-- 3. INITIALIZE DISPATCH
//   const navigate = useNavigate(); // <-- 2. INITIALIZE useNavigate

//   // --- 3. ADDED STATE AND REFS FOR POPUP ---
//   const [showAddedPopup, setShowAddedPopup] = useState(false);
//   const popupTimeoutRef = useRef(null); // To manage the timeout

//   // --- 4. CLEANUP TIMEOUT ON UNMOUNT ---
//   useEffect(() => {
//     // When the component unmounts, clear any active timeout
//     return () => {
//       if (popupTimeoutRef.current) {
//         clearTimeout(popupTimeoutRef.current);
//       }
//     };
//   }, []);

//   // Start interval on mouse enter
//   const startSlider = () => {
//     // ... (this function is unchanged)
//     if (product.images.length <= 1) return;
//     if (intervalRef.current) clearInterval(intervalRef.current);

//     intervalRef.current = setInterval(() => {
//       const newIndex = (imgIndex + 1) % product.images.length;
//       setNextIndex(newIndex);
//       setIsSliding(true);

//       setTimeout(() => {
//         setImgIndex(newIndex);
//         setIsSliding(false);
//         setNextIndex(null);
//       }, 300); // duration matches CSS
//     }, 1000);
//   };

//   // Reset on mouse leave
//   const stopSlider = () => {
//     // ... (this function is unchanged)
//     if (intervalRef.current) clearInterval(intervalRef.current);
//     intervalRef.current = null;
//     setImgIndex(0);
//     setNextIndex(null);
//     setIsSliding(false);
//   };

//   // --- 5. UPDATED handleAddToCart ---
//   const handleAddToCart = (e) => {
//     // This is CRITICAL to stop the click from navigating to the product page
//     e.stopPropagation();

//     dispatch(addToCart(product));
//     console.log('Added to cart:', product.title);

//     // --- Show popup ---
//     setShowAddedPopup(true);

//     // Clear any existing timeout before setting a new one
//     if (popupTimeoutRef.current) {
//       clearTimeout(popupTimeoutRef.current);
//     }

//     // Hide popup after 2 seconds
//     popupTimeoutRef.current = setTimeout(() => {
//       setShowAddedPopup(false);
//     }, 2000);
//   };

//   // --- 6. NEW handleBuyNow ---
//   const handleBuyNow = (e) => {
//     e.stopPropagation();
//     dispatch(addToCart(product));
//     navigate('/cart'); // Navigate to cart page
//   };

//   // Image slider, always renders overlays on top
//   return (
//     // --- 7. ADDED WRAPPER FOR POPUP POSITIONING ---
//     <div className="relative w-full max-w-xs">
//       <div
//         className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow flex flex-col overflow-hidden w-full"
//         style={{
//           border: `1.5px solid ${COLORS.accent}`,
//           minHeight: 430,
//         }}
//       >
//         <div
//           className="relative w-full h-96 overflow-hidden"
//           onMouseEnter={startSlider}
//           onMouseLeave={stopSlider}
//           style={{
//             background: COLORS.accent,
//             cursor: product.images.length > 1 ? 'pointer' : 'default',
//           }}
//         >
//           {/* --- 2. APPLIED THUMBNAIL + LAZY LOADING --- */}
//           <img
//             src={getCloudinaryThumbnail(product.images[imgIndex])}
//             loading="lazy"
//             alt={product.title}
//             className="absolute left-0 top-0 w-full h-full object-cover transition-transform"
//             style={{
//               zIndex: 2,
//               transform: isSliding ? 'translateX(-100%)' : 'translateX(0)',
//               transition: 'transform 0.3s cubic-bezier(.77,0,.18,1)',
//             }}
//             draggable={false}
//           />
//           {/* --- 3. APPLIED THUMBNAIL + LAZY LOADING --- */}
//           {nextIndex !== null && (
//             <img
//               src={getCloudinaryThumbnail(product.images[nextIndex])}
//               loading="lazy"
//               alt={product.title}
//               className="absolute left-0 top-0 w-full h-full object-cover transition-transform"
//               style={{
//                 zIndex: 1,
//                 transform: isSliding ? 'translateX(0)' : 'translateX(100%)',
//                 transition: 'transform 0.3s cubic-bezier(.77,0,.18,1)',
//               }}
//               draggable={false}
//             />
//           )}
//           {/* Overlays */}
//           {product.isNew && (
//             <span
//               className="absolute top-3 left-3 font-bold text-xs px-3 py-1 rounded-md"
//               style={{
//                 color: '#fff',
//                 background: COLORS.primary,
//                 letterSpacing: '1px',
//                 zIndex: 10,
//               }}
//             >
//               NEW
//             </span>
//           )}
//           {product.isAd && (
//             <span
//               className="absolute top-3 right-3 font-bold text-[11px] px-2 py-1 rounded-md"
//               style={{
//                 color: COLORS.text,
//                 background: COLORS.accent,
//                 letterSpacing: '0.7px',
//                 zIndex: 10,
//               }}
//             >
//               AD
//             </span>
//           )}
//           <div
//             className="absolute bottom-3 left-3 flex items-center gap-2 bg-white/90 rounded px-2 py-1 text-xs font-semibold shadow"
//             style={{ zIndex: 10 }}
//           >
//             <span
//               className="flex items-center gap-1 font-bold"
//               style={{ color: COLORS.primary }}
//             >
//               {product.rating}{' '}
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="inline"
//                 width="13"
//                 height="13"
//                 fill={COLORS.secondary}
//                 viewBox="0 0 20 20"
//               >
//                 <path d="M10 15.27l5.18 3.73-1.64-6.81L18 7.24l-6.92-.61L10 0 8.92 6.63 2 7.24l4.46 4.95-1.64 6.81z" />
//               </svg>
//             </span>
//             <span
//               className="ml-1 font-normal"
//               style={{ color: COLORS.primary }}
//             >
//               | {product.reviews}
//             </span>
//           </div>
//         </div>
//         {/* Product info */}
//         {/* --- 10. FIXED TYPOS/SCRAMBLED JSX --- */}
//         <div className="p-4 pb-3 flex flex-col flex-grow">
//           <h2
//             className="font-bold text-lg mb-1"
//             style={{ color: COLORS.text }}
//           >
//             {product.title}
//           </h2>
//           <div
//             className="text-sm mb-3 text-[#7C6A51]"
//             style={{ color: COLORS.accent }}
//           >
//             {product.subtitle}
//           </div>
//           <div className="mb-3 flex items-center gap-3">
//             <span
//               className="font-bold text-lg"
//               style={{ color: COLORS.primary }}
//             >
//               Rs. {product.price}
//             </span>
//             {product.originalPrice && (
//               <>
//                 <span
//                   className="line-through text-base"
//                   style={{ color: COLORS.accent }}
//                 >
//                   Rs. {product.originalPrice}
//                 </span>
//                 <span
//                   className="text-sm font-semibold"
//                   style={{ color: COLORS.primary }}
//                 >
//                   ({product.discount}% OFF)
//                 </span>
//               </>
//             )}
//           </div>

//           {/* --- 8. UPDATED BUTTON LAYOUT --- */}
//           <div className="mt-auto flex flex-row gap-2">
//             <button
//               onClick={handleAddToCart}
//               className="w-1/2 py-2 rounded-lg font-semibold transition text-base"
//               style={{
//                 border: `2px solid ${COLORS.primary}`,
//                 color: COLORS.primary,
//                 background: COLORS.background,
//               }}
//               // --- Recommendation: Add hover effect ---
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = COLORS.primary;
//                 e.currentTarget.style.color = '#fff';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = COLORS.background;
//                 e.currentTarget.style.color = COLORS.primary;
//               }}
//             >
//               Add to cart
//             </button>
//             <button
//               onClick={handleBuyNow} // <-- Use new handler
//               className="w-1/2 py-2 rounded-lg font-semibold transition text-base"
//               style={{
//                 border: `2px solid ${COLORS.primary}`,
//                 color: COLORS.primary,
//                 background: COLORS.background,
//               }}
//               // --- Recommendation: Add hover effect ---
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = COLORS.primary;
//                 e.currentTarget.style.color = '#fff';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = COLORS.background;
//                 e.currentTarget.style.color = COLORS.primary;
//               }}
//             >
//               Buy Now
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* --- 9. ADDED POPUP ELEMENT --- */}
//       <div
//         className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 rounded-full shadow-lg transition-all duration-300 ${
//           showAddedPopup
//             ? 'opacity-100 translate-y-0'
//             : 'opacity-0 -translate-y-2 pointer-events-none'
//         }`}
//         style={{
//           background: COLORS.secondary,
//           color: COLORS.text,
//           zIndex: 20,
//         }}
//       >
//         Added to Cart!
//       </div>
//     </div>
//   );
// }















import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice"; // Check this path!
import { useNavigate } from "react-router-dom"; // Import for Buy Now

const COLORS = {
  primary: "#B3541E",
  secondary: "#D6A74F",
  accent: "#A5A58D",
  text: "#3E2F1C",
  background: "#F5EBDD",
  off: "#E7793D",
};

/**
 * Generates a compressed Cloudinary thumbnail URL
 * e.g., adds /w_400,q_auto:good/
 */
function getCloudinaryThumbnail(url) {
  if (!url) return "";
  const parts = url.split("/upload/");
  if (parts.length !== 2) return url;
  // w_400 = 400px wide, q_auto:good = good quality compression
  return `${parts[0]}/upload/w_400,q_auto:good/${parts[1]}`;
}

export default function ProductCard({ product }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(null);
  const [isSliding, setIsSliding] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // For "Added to Cart"
  const intervalRef = useRef(null);
  const popupTimeoutRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Start interval on mouse enter
  const startSlider = () => {
    if (product.images.length <= 1) return;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const newIndex = (imgIndex + 1) % product.images.length;
      setNextIndex(newIndex);
      setIsSliding(true);

      setTimeout(() => {
        setImgIndex(newIndex);
        setIsSliding(false);
        setNextIndex(null);
      }, 300); // duration matches CSS
    }, 1000);
  };

  // Reset on mouse leave
  const stopSlider = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setImgIndex(0);
    setNextIndex(null);
    setIsSliding(false);
  };

  // Add to Cart handler
  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));

    // Show popup
    setShowPopup(true);
    // Clear any existing timer
    if (popupTimeoutRef.current) {
      clearTimeout(popupTimeoutRef.current);
    }
    // Set new timer to hide popup
    popupTimeoutRef.current = setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  // Buy Now handler
  const handleBuyNow = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    navigate("/cart"); // Redirect to cart
  };

  // Get compressed thumbnails
  const currentThumb = getCloudinaryThumbnail(product.images[imgIndex]);
  const nextThumb =
    nextIndex !== null
      ? getCloudinaryThumbnail(product.images[nextIndex])
      : null;
  console.log(currentThumb)
  console.log(nextThumb)

  return (
    <div
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow flex flex-col overflow-hidden w-full max-w-xs relative "
      style={{
        border: `1.5px solid ${COLORS.accent}`,
        minHeight: 430, // Adjust as needed
      }}
    >
      {/* --- POPUP --- */}
      <div
        className="absolute bottom-14 left-1/2 -translate-x-1/2 px-3 py-1 rounded-md text-white text-sm font-semibold transition-all duration-300"
        style={{
          background: "rgba(0,0,0,0.7)",
          opacity: showPopup ? 1 : 0,
          transform: showPopup ? "translate(-50%, 0)" : "translate(-50%, 10px)",
          zIndex: 20,
          pointerEvents: "none",
        }}
      >
        Added to Cart!
      </div>
      {/* --- IMAGE CONTAINER --- */}
      <div
        className="relative w-full h-96 overflow-hidden"
        onMouseEnter={startSlider}
        onMouseLeave={stopSlider}
        style={{
          background: COLORS.accent,
          cursor: product.images.length > 1 ? "pointer" : "default",
        }}
      >
        {/* Current image */}
        <img
          src={currentThumb || "image"}
          alt={product.name}
          loading="lazy" // <-- LAZY LOADING
          className="absolute left-0 top-0 w-full h-full object-cover transition-transform"
          style={{
            zIndex: 2,
            transform: isSliding ? "translateX(-100%)" : "translateX(0)",
            transition: "transform 0.3s cubic-bezier(.77,0,.18,1)",
          }}
          draggable={false}
        />
        {/* Next image */}
        {nextIndex !== null && (
          <img
            src={nextThumb}
            alt={product.name}
            loading="lazy" // <-- LAZY LOADING
            className="absolute left-0 top-0 w-full h-full object-cover transition-transform"
            style={{
              zIndex: 1,
              transform: isSliding ? "translateX(0)" : "translateX(100%)",
              transition: "transform 0.3s cubic-bezier(.77,0,.18,1)",
            }}
            draggable={false}
          />
        )}
        {/* Overlays */}
        {product.isNew && ( // Assuming your product model might have this
          <span
            className="absolute top-3 left-3 font-bold text-xs px-3 py-1 rounded-md"
            style={{
              color: "#fff",
              background: COLORS.primary,
              letterSpacing: "1px",
              zIndex: 10,
            }}
          >
            NEW
          </span>
        )}
        <div
          className="absolute bottom-3 left-3 flex items-center gap-2 bg-white/90 rounded px-2 py-1 text-xs font-semibold shadow"
          style={{ zIndex: 10 }}
        >
          <span
            className="flex items-center gap-1 font-bold"
            style={{ color: COLORS.primary }}
          >
            {product.rating || 4.5}{" "}
            {/* Add default/placeholder */}
            <svg
              xmlns="http://www.w.g/2000/svg"
              className="inline"
              width="13"
              height="13"
              fill={COLORS.secondary}
              viewBox="0 0 20 20"
            >
              <path d="M10 15.27l5.18 3.73-1.64-6.81L18 7.24l-6.92-.61L10 0 8.92 6.63 2 7.24l4.46 4.95-1.64 6.81z" />
            </svg>
          </span>
          <span className="ml-1 font-normal" style={{ color: COLORS.primary }}>
            | {product.numReviews || 0}
          </span>
        </div>
      </div>
      {/* --- PRODUCT INFO --- */}
      <div className="p-4 pb-3 flex flex-col flex-grow">
        <h2
          className="font-bold text-lg mb-1 truncate" // Truncate for long names
          style={{ color: COLORS.text }}
        >
          {product.name}
        </h2>
        <div
          className="text-sm mb-3 text-[#7C6A51] truncate"
          style={{ color: COLORS.accent }}
        >
          {product.description.substring(0, 50)}...
        </div>
        <div className="mb-3 flex items-baseline gap-3">
          <span className="font-bold text-lg" style={{ color: COLORS.primary }}>
            Rs. {product.price}
          </span>
          {product.originalPrice && (
            <>
              <span
                className="line-through text-base"
                style={{ color: COLORS.accent }}
              >
                Rs. {product.originalPrice}
              </span>
            </>
          )}
        </div>

        {/* --- BUTTON ROW --- */}
        <div className="mt-auto flex gap-2">
          <button
            onClick={handleAddToCart}
            className="w-1/2 px-3 py-2 rounded-lg font-semibold transition text-base"
            style={{
              border: `2px solid ${COLORS.primary}`,
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
            className="w-1/2 px-3 py-2 rounded-lg font-semibold transition text-base"
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



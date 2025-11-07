// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// const COLORS = {
//   primary: "#B3541E",      // Terracotta
//   secondary: "#D6A74F",    // Mustard Gold
//   accent: "#A5A58D",       // Sage Green
//   text: "#3E2F1C",         // Deep Brown
//   background: "#F5EBDD",   // Linen / Sand
// };

// export default function ProductPreview() {
//   const { id } = useParams();
//   const product = useSelector(state =>
//     state.products.items.find(p => p.id === Number(id))
//   );

//   // Handle case when product is not found (bad URL or data not loaded)
//   if (!product) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center" style={{background: COLORS.background}}>
//         <div className="bg-white rounded-xl shadow-lg p-10 text-center">
//           <h2 className="text-2xl font-bold mb-2" style={{color: COLORS.primary}}>Product Not Found</h2>
//           <p className="text-base" style={{color: COLORS.text}}>Sorry, we couldn't find the product you are looking for.</p>
//         </div>
//       </div>
//     );
//   }

//   // Controlled states for selection
//   const [selectedImg, setSelectedImg] = useState(0);
//   const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || "");
//   const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
//   const [quantity, setQuantity] = useState(1);
//   const [detailsOpen, setDetailsOpen] = useState({
//     product: false,
//     shipping: false,
//     trivia: false,
//   });

//   // Reset selection states when product changes
//   useEffect(() => {
//     setSelectedImg(0);
//     setSelectedColor(product.colors?.[0]?.name || "");
//     setSelectedSize(product.sizes?.[0] || "");
//     setQuantity(1);
//     setDetailsOpen({ product: false, shipping: false, trivia: false });
//   }, [product]);

//   const savings = (product.originalPrice ?? 0) - (product.price ?? 0);

//   return (
//     <div className="min-h-screen flex flex-col items-center py-6 px-2" style={{background: COLORS.background}}>
//       <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-5 gap-8 p-6 md:p-10">
//         {/* Thumbnails */}
//         <div className="flex md:flex-col gap-2 md:gap-4 md:col-span-1 order-2 md:order-1 justify-center">
//           {product.images.map((img, idx) => (
//             <button
//               key={img}
//               onClick={() => setSelectedImg(idx)}
//               className={`border-2 rounded-lg overflow-hidden w-16 h-20 md:w-20 md:h-28 focus:outline-none ${selectedImg === idx ? "border-[#B3541E]" : "border-transparent"}`}
//               type="button"
//             >
//               <img src={img} alt={`Thumbnail ${idx + 1}`} className="h-full w-full object-cover" loading="lazy" />
//             </button>
//           ))}
//         </div>

//         {/* Main Image */}
//         <div className="md:col-span-2 flex justify-center items-center order-1 md:order-2">
//           <img
//             src={product.images[selectedImg]}
//             alt="Product Main"
//             className="w-full h-[350px] md:h-[500px] object-cover rounded-xl shadow"
//             loading="lazy"
//           />
//         </div>

//         {/* Product Details */}
//         <div className="md:col-span-2 flex flex-col justify-between order-3">
//           <div>
//             <nav className="text-sm mb-2" style={{color: COLORS.primary}}>
//               <Link to={"/"}>Home</Link> &gt; {product.title}
//             </nav>
//             <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{color: COLORS.text}}>
//               {product.title}
//             </h2>
//             <div className="text-sm md-text-lg mb-2" style={{color: COLORS.accent}}>
//               {product.subtitle}
//             </div>
//             <div className="flex items-baseline gap-3 mb-3">
//               <span className="line-through text-gray-400 text-sm md:text-lg">Rs. {product.originalPrice?.toLocaleString()}</span>
//               <span className="text-base md:text-2xl  font-bold" style={{color: COLORS.primary}}>Rs. {product.price?.toLocaleString()}</span>
//               <span className="font-semibold" style={{color: COLORS.secondary}}>
//                 Save Rs. {savings.toLocaleString()}
//               </span>
//             </div>
//             <div className="flex items-center gap-2 mb-5">
//               <span className="h-2 w-2 rounded-full" style={{background: COLORS.secondary}}></span>
//               <span className="text-xs" style={{color: COLORS.text}}>
//                 {product.inStock ? "In Stock" : "Out of Stock"}
//               </span>
//             </div>
//             {/* Color */}
//             {product.colors && product.colors.length > 0 && (
//               <div className="mb-4">
//                 <div className="font-semibold mb-1" style={{color: COLORS.text}}>Color</div>
//                 <div className="flex gap-2 flex-wrap">
//                   {product.colors.map((c) => (
//                     <button
//                       key={c.name}
//                       onClick={() => setSelectedColor(c.name)}
//                       className={`flex items-center gap-2 px-3 py-1 rounded-full border transition
//                         ${selectedColor === c.name
//                           ? "border-[#B3541E] bg-[#F5EBDD]"
//                           : "border-gray-200 bg-white"}
//                       `}
//                       type="button"
//                     >
//                       <span className="h-4 w-4 rounded-full border" style={{background: c.color}}></span>
//                       <span className="text-xs" style={{color: COLORS.text}}>{c.name}</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//             {/* Size */}
//             {product.sizes && product.sizes.length > 0 && (
//               <div className="mb-4">
//                 <div className="flex items-center justify-between">
//                   <div className="font-semibold mb-1" style={{color: COLORS.text}}>Size</div>
//                   <a href="#" className="text-xs underline" style={{color: COLORS.primary}}>Size Chart</a>
//                 </div>
//                 <div className="flex gap-2 flex-wrap">
//                   {product.sizes.map((s) => (
//                     <button
//                       key={s}
//                       onClick={() => setSelectedSize(s)}
//                       className={`px-3 py-1 rounded border transition font-semibold
//                         ${selectedSize === s
//                           ? "border-[#B3541E] bg-[#B3541E] text-white"
//                           : "border-gray-200 bg-white"}
//                       `}
//                       style={selectedSize === s ? {} : {color: COLORS.text}}
//                       type="button"
//                     >
//                       {s}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//             {/* Quantity */}
//             <div className="mb-5">
//               <div className="font-semibold mb-1" style={{color: COLORS.text}}>Quantity</div>
//               <div className="flex items-center w-[120px] border rounded">
//                 <button
//                   onClick={() => setQuantity(q => Math.max(1, q - 1))}
//                   className="flex-1 py-1 font-bold text-xl"
//                   style={{color: COLORS.primary}}
//                   type="button"
//                 >-</button>
//                 <span className="flex-1 text-center">{quantity}</span>
//                 <button
//                   onClick={() => setQuantity(q => q + 1)}
//                   className="flex-1 py-1 font-bold text-xl"
//                   style={{color: COLORS.primary}}
//                   type="button"
//                 >+</button>
//               </div>
//             </div>
//             {/* CTA Buttons */}
//             <div className="flex flex-col gap-3 mb-6">
//               <button className="w-full py-3 rounded font-bold transition"
//                 style={{
//                   background: COLORS.primary,
//                   color: "#fff"
//                 }}
//                 type="button"
//               >
//                 Add To Cart
//               </button>
//               <button className="w-full py-3 rounded border-2 font-bold transition"
//                 style={{
//                   borderColor: COLORS.primary,
//                   color: COLORS.primary,
//                   background: COLORS.background
//                 }}
//                 type="button"
//               >
//                 Buy It Now
//               </button>
//             </div>
//           </div>
//           {/* Expandable Details */}
//           <div>
//             <button
//               className="flex justify-between items-center w-full py-3 border-b font-semibold"
//               style={{color: COLORS.primary}}
//               onClick={() => setDetailsOpen(d => ({ ...d, product: !d.product }))}
//               type="button"
//             >
//               Product Details
//               <span>{detailsOpen.product ? "▲" : "▼"}</span>
//             </button>
//             {detailsOpen.product && (
//               <div className="py-2 text-sm" style={{color: COLORS.text}}>
//                 {product.details}
//               </div>
//             )}
//             <button
//               className="flex justify-between items-center w-full py-3 border-b font-semibold"
//               style={{color: COLORS.primary}}
//               onClick={() => setDetailsOpen(d => ({ ...d, shipping: !d.shipping }))}
//               type="button"
//             >
//               Shipping & Delivery
//               <span>{detailsOpen.shipping ? "▲" : "▼"}</span>
//             </button>
//             {detailsOpen.shipping && (
//               <div className="py-2 text-sm" style={{color: COLORS.text}}>
//                 {product.shipping}
//               </div>
//             )}
//             <button
//               className="flex justify-between items-center w-full py-3 border-b font-semibold"
//               style={{color: COLORS.primary}}
//               onClick={() => setDetailsOpen(d => ({ ...d, trivia: !d.trivia }))}
//               type="button"
//             >
//               More Information/Trivia
//               <span>{detailsOpen.trivia ? "▲" : "▼"}</span>
//             </button>
//             {detailsOpen.trivia && (
//               <div className="py-2 text-sm" style={{color: COLORS.text}}>
//                 {product.trivia}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../redux/productsSlice';
import { addToCart } from '../redux/cartSlice';
import { setBuyNowItem } from "../redux/cartSlice"; 

const COLORS = {
  primary: '#B3541E',
  secondary: '#D6A74F',
  accent: '#A5A58D',
  text: '#3E2F1C',
  background: '#F5EBDD',
};

export default function ProductDetailsPage() {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [zoomedImage, setZoomedImage] = useState(null); // 🔥 NEW — for zoom modal

  const { product, loading, error } = useSelector(
    (state) => state.products.selectedProduct
  );

  useEffect(() => {
    setActiveImageIndex(0);
    setQty(1);
    dispatch(fetchProductById(productId));
  }, [productId, dispatch]);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, quantity: Number(qty) }));
    navigate('/cart');
  };
  const handleBuyNow = (e) => {
    e.stopPropagation();
  
    // ✅ Set only this product as Buy Now item
    dispatch(setBuyNowItem({ ...product, quantity: 1 }));
  
    // ✅ Go directly to checkout page
    navigate("/checkout");
  };

  // 🔥 NEW — close zoom on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setZoomedImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (loading === 'pending' || loading === 'idle') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: COLORS.background }}>
        <div className="text-2xl font-semibold" style={{ color: COLORS.primary }}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: COLORS.background }}>
        <div className="text-2xl font-semibold text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: COLORS.background }}>
        <div className="text-2xl font-semibold text-red-600">Product Not Found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4" style={{ background: COLORS.background }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">

        {/* --- Image Gallery --- */}
        <div className="flex-1 flex flex-col md:flex-row gap-4">

          {/* Thumbnails */}
          <div className="grid grid-cols-5 gap-3 md:flex md:flex-col md:order-1 order-2">
            {product.images.map((img, index) => (
              <button
                key={index}
                className="aspect-square md:w-24 md:h-24 rounded-md overflow-hidden shadow"
                onClick={() => setActiveImageIndex(index)}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-full h-full object-cover ${
                    index === activeImageIndex ? 'ring-2 ring-[#B3541E]' : ''
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div
            className="w-full md:flex-1 order-1 md:order-2 overflow-hidden flex items-center justify-center"
          >
            <img
              src={product.images[activeImageIndex]}
              alt={product.name}
              onClick={() => setZoomedImage(product.images[activeImageIndex])} // 🔥 Added click-to-zoom
              className="w-full h-auto max-h-[480px] object-contain cursor-zoom-in transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>
        </div>

        {/* --- Product Info --- */}
        <div className="flex-1 flex flex-col">
          <h1 className="text-lg md:text-4xl font-semibold md:font-extrabold mb-1 md:mb-4" style={{ color: COLORS.text }}>
            {product.name}
          </h1>

          <div className="text-lg md:text-3xl font-semibold mb-1 md:mb-6" style={{ color: COLORS.primary }}>
            Rs. {product.price.toLocaleString()}
          </div>

          <div className="mb-1 md:mb-6">
            <span className="font-semibold text-sm md:text-lg" style={{ color: COLORS.text }}>
              Status:
            </span>
            <span
              className="ml-2 text-sm md:text-lg md:font-bold font-semibold"
              style={{
                color: product.countInStock > 0 ? COLORS.accent : COLORS.primary,
              }}
            >
              {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

            <div className="md:mt-8 mt-1">
            {/* <h3 className="text-sm md:text-xl font-semibold md:mb-3 mb-1" style={{ color: COLORS.text }}>Description:</h3> */}
            <p className="text-base " style={{ color: COLORS.text, lineHeight: 1.7 }}>
              Description: {product.description}
            </p>

          {/* Quantity Selector */}
          {product.countInStock > 0 && (
            <div className="mb-2 md:mb-6 flex items-center gap-2 md:gap-4">
              <label htmlFor="qty" className="font-semibold text-sm md:text-lg" style={{ color: COLORS.text }}>
                Quantity:
              </label>
              <select
                id="qty"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className="px-1 md:px-4 py-1 md:py-2 rounded-lg border-2"
                style={{
                  borderColor: COLORS.accent,
                  background: 'white',
                  color: COLORS.text,
                }}
              >
                {[...Array(Math.min(product.countInStock, 10)).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Buttons */}
          <button
            onClick={addToCartHandler}
            disabled={product.countInStock === 0}
            className="w-full py-2 mb-2 md:py-4 rounded-xl text-base md:text-lg font-bold text-white shadow-lg transition disabled:opacity-50"
            style={{ background: COLORS.primary }}
          >
            {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>

          <button
            onClick={handleBuyNow}
            disabled={product.countInStock === 0}
            className=" w-full py-2 md:py-4 rounded-xl text-base md:text-lg  font-bold text-white shadow-lg transition disabled:opacity-50"
            style={{ background: COLORS.primary }}
          >
            {product.countInStock > 0 ? 'Buy Now' : 'Out of Stock'}
          </button>

        
          </div>
        </div>
      </div>

      {/* 🔥 Zoom Modal Overlay */}
      {zoomedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex justify-center items-center z-50"
          onClick={() => setZoomedImage(null)}
        >
          <img
            src={zoomedImage}
            alt="Zoomed product"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl cursor-zoom-out transition-transform duration-500 scale-100 hover:scale-120"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setZoomedImage(null)}
            className="absolute top-6 right-8 text-white text-3xl font-bold hover:text-[#fec713] transition"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

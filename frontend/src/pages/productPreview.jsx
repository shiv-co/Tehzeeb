
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../redux/productsSlice";
import { addToCart, setBuyNowItem } from "../redux/cartSlice";
import ProductDetailsSkeleton from "../components/ProductDetailsSkeleton.jsx";

const COLORS = {
  primary: "#B3541E",
  secondary: "#D6A74F",
  accent: "#A5A58D",
  text: "#3E2F1C",
  background: "#F5EBDD",
};

export default function ProductDetailsPage() {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [zoomedImage, setZoomedImage] = useState(null);

  const { product, loading, error } = useSelector(
    (state) => state.products.selectedProduct
  );

  useEffect(() => {
    setActiveImageIndex(0);
    setQty(1);
    dispatch(fetchProductById(productId));
  }, [productId, dispatch]);

  /* ------------------------------------
     DISCOUNT CALCULATION
  ------------------------------------- */
  const hasDiscount =
    product?.originalPrice && product.originalPrice > product.price;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  /* ------------------------------------
      ADD TO CART
  ------------------------------------- */
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, quantity: Number(qty) }));
    navigate("/cart");
  };

  /* ------------------------------------
      BUY NOW
  ------------------------------------- */
  const handleBuyNow = () => {
    dispatch(setBuyNowItem({ ...product, quantity: Number(qty) }));
    navigate("/checkout");
  };

  /* ------------------------------------
      CLOSE ZOOM WITH ESC
  ------------------------------------- */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setZoomedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  /* ------------------------------------
      LOADING / ERROR UI
  ------------------------------------- */
  if (loading === "pending" || loading === "idle") {
    return <ProductDetailsSkeleton />;
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: COLORS.background }}
      >
        <div className="text-2xl font-semibold text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: COLORS.background }}
      >
        <div className="text-2xl font-semibold text-red-600">
          Product Not Found
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-12 px-4"
      style={{ background: COLORS.background }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        {/* ---------------- IMAGE SECTION ---------------- */}
        <div className="flex-1 flex flex-col md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="grid grid-cols-5 gap-3 md:flex md:flex-col">
            {product.images.map((img, index) => (
              <button
                key={index}
                className="aspect-square md:w-24 md:h-24 rounded-md overflow-hidden shadow"
                onClick={() => setActiveImageIndex(index)}
              >
                <img
                  src={img}
                  alt=""
                  className={`w-full h-full object-cover ${
                    index === activeImageIndex
                      ? "ring-2 ring-[#B3541E]"
                      : "opacity-80"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full md:flex-1 overflow-hidden flex items-center justify-center">
            <img
              src={product.images[activeImageIndex]}
              alt={product.name}
              onClick={() =>
                setZoomedImage(product.images[activeImageIndex])
              }
              className="w-full max-h-[480px] object-contain cursor-zoom-in transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>
        </div>

        {/* ---------------- DETAILS SECTION ---------------- */}
        <div className="flex-1 flex flex-col">
          <h1
            className="text-lg md:text-4xl font-semibold md:font-extrabold mb-3"
            style={{ color: COLORS.text }}
          >
            {product.name}
          </h1>

          {/* PRICE + DISCOUNT */}
          <div className="flex items-baseline gap-3 mb-4">
            <h2
              className="text-xl md:text-3xl font-bold"
              style={{ color: COLORS.primary }}
            >
              Rs. {product.price.toLocaleString()}
            </h2>

            {hasDiscount && (
              <>
                <span
                  className="line-through text-gray-500 text-lg"
                  style={{ color: COLORS.accent }}
                >
                  Rs. {product.originalPrice}
                </span>

                <span className="text-red-600 font-bold text-xl">
                  {discountPercent}% OFF
                </span>
              </>
            )}
          </div>

          {/* STOCK */}
          <div className="mb-6">
            <span className="font-semibold text-lg">Status:</span>
            <span
              className="ml-2 font-bold"
              style={{
                color:
                  product.countInStock > 0 ? COLORS.accent : COLORS.primary,
              }}
            >
              {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* SIZES */}
          {product.sizes?.length > 0 && (
            <div className="mb-6">
              <span className="font-semibold text-lg">Sizes:</span>
              <div className="flex gap-2 mt-2">
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className="px-3 py-1 border rounded-md text-sm"
                    style={{ borderColor: COLORS.accent }}
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* COLORS */}
          {product.colors?.length > 0 && (
            <div className="mb-6">
              <span className="font-semibold text-lg">Colors:</span>
              <div className="flex gap-3 mt-2">
                {product.colors.map((color) => (
                  <span
                    key={color}
                    className="w-6 h-6 rounded-full border"
                    style={{
                      background: color,
                      borderColor: COLORS.accent,
                    }}
                  ></span>
                ))}
              </div>
            </div>
          )}

          {/* DESCRIPTION */}
          <p
            className="text-base leading-7 mb-6"
            style={{ color: COLORS.text }}
          >
            {product.description}
          </p>

          {/* QUANTITY SELECTOR */}
          {product.countInStock > 0 && (
            <div className="mb-6 flex items-center gap-4">
              <label className="font-semibold text-lg">Quantity:</label>
              <select
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className="px-4 py-2 rounded-lg border-2"
                style={{ borderColor: COLORS.accent }}
              >
                {[...Array(Math.min(product.countInStock, 10)).keys()].map(
                  (x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  )
                )}
              </select>
            </div>
          )}

          {/* BUTTONS */}
          <button
            onClick={addToCartHandler}
            className="w-full py-3 rounded-xl text-lg font-bold text-white shadow-lg mb-4"
            style={{
              background: COLORS.primary,
              opacity: product.countInStock === 0 ? 0.5 : 1,
            }}
            disabled={product.countInStock === 0}
          >
            Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            className="w-full py-3 rounded-xl text-lg font-bold text-white shadow-lg"
            style={{
              background: COLORS.secondary,
              opacity: product.countInStock === 0 ? 0.5 : 1,
            }}
            disabled={product.countInStock === 0}
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* ---------------- ZOOM MODAL ---------------- */}
      {zoomedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex justify-center items-center z-50"
          onClick={() => setZoomedImage(null)}
        >
          <img
            src={zoomedImage}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl cursor-zoom-out"
          />

          <button
            onClick={() => setZoomedImage(null)}
            className="absolute top-6 right-8 text-white text-3xl font-bold hover:text-yellow-400"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}


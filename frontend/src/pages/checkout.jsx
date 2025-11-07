import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { clearCart, clearBuyNowItem } from "../redux/cartSlice";

const COLORS = {
  primary: "#B3541E",
  secondary: "#D6A74F",
  background: "#F5EBDD",
  text: "#3E2F1C",
};

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Get both cart and buyNow state from Redux
  const { buyNowItem, cartItems, cartTotalAmount } = useSelector(
    (state) => state.cart
  );

  // ✅ If "Buy Now" was clicked, show only that product
  const productsToShow = buyNowItem ? [buyNowItem] : cartItems;

  // ✅ Form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  // ✅ Handle changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle order placement
  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.address || !formData.phone) {
      alert("Please fill in all required fields.");
      return;
    }

    alert("🎉 Order placed successfully! Thank you for shopping with Tehzeeb Creations.");

    // Clear only what’s needed
    if (buyNowItem) {
      dispatch(clearBuyNowItem()); // Clear single buy-now item
    } else {
      dispatch(clearCart()); // Clear cart
    }

    navigate("/shop");
  };

  // 🛠️ If user directly opens checkout without items, redirect
  useEffect(() => {
    if (!buyNowItem && cartItems.length === 0) {
      navigate("/shop");
    }
  }, [buyNowItem, cartItems, navigate]);

  // ✅ Calculate total
  const totalAmount = buyNowItem
    ? buyNowItem.price
    : cartTotalAmount;

  return (
    <div
      className="min-h-screen py-10 px-4 md:px-12"
      style={{ background: COLORS.background }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
        {/* ---- Left: Shipping Details ---- */}
        <div className="flex-1 bg-white p-8 rounded-2xl shadow-xl">
          <h2
            className="text-3xl font-bold mb-6"
            style={{ color: COLORS.primary }}
          >
            Checkout
          </h2>
          <form className="space-y-5" onSubmit={handlePlaceOrder}>
            <div>
              <label className="block font-semibold mb-1" style={{ color: COLORS.text }}>
                Full Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#EAD8C0] rounded-lg focus:ring-2 focus:ring-[#D6A74F] outline-none"
                placeholder="Enter your full name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block font-semibold mb-1" style={{ color: COLORS.text }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#EAD8C0] rounded-lg focus:ring-2 focus:ring-[#D6A74F] outline-none"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1" style={{ color: COLORS.text }}>
                  Phone<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#EAD8C0] rounded-lg focus:ring-2 focus:ring-[#D6A74F] outline-none"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1" style={{ color: COLORS.text }}>
                Address<span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#EAD8C0] rounded-lg focus:ring-2 focus:ring-[#D6A74F] outline-none"
                rows="3"
                placeholder="Street, Apartment, Locality"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block font-semibold mb-1" style={{ color: COLORS.text }}>
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#EAD8C0] rounded-lg focus:ring-2 focus:ring-[#D6A74F] outline-none"
                  placeholder="Enter your city"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1" style={{ color: COLORS.text }}>
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#EAD8C0] rounded-lg focus:ring-2 focus:ring-[#D6A74F] outline-none"
                  placeholder="PIN Code"
                />
              </div>
            </div>

            {/* Pulsing Place Order Button */}
            <motion.button
              type="submit"
              className="w-full py-4 mt-4 rounded-xl text-lg font-bold text-white shadow-lg focus:outline-none"
              style={{ background: COLORS.primary }}
              animate={{ scale: [1, 1.04, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.05 }}
            >
              Place Order
            </motion.button>
          </form>
        </div>

        {/* ---- Right: Order Summary ---- */}
        <div className="md:w-[400px] bg-white p-8 rounded-2xl shadow-xl h-fit sticky top-20">
          <h3
            className="text-2xl font-bold mb-6 border-b pb-3"
            style={{ color: COLORS.primary }}
          >
            Order Summary
          </h3>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {productsToShow.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b pb-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image || item.images?.[0]}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-md border"
                  />
                  <div>
                    <p className="font-semibold text-sm" style={{ color: COLORS.text }}>
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity || 1}</p>
                  </div>
                </div>
                <span className="font-semibold text-sm" style={{ color: COLORS.primary }}>
                  ₹ {(item.price * (item.quantity || 1)).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t mt-5 pt-4 space-y-2 text-[#3E2F1C]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹ {totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t my-2"></div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span style={{ color: COLORS.primary }}>
                ₹ {totalAmount.toLocaleString()}
              </span>
            </div>
          </div>

          <Link
            to="/cart"
            className="block text-center w-full py-3 mt-6 rounded-lg border border-[#B3541E] text-[#B3541E] font-bold hover:bg-[#B3541E] hover:text-white transition"
          >
            Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}

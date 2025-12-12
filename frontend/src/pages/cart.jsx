import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import RecommendedProducts from "../pages/recommendedProducts.jsx";
import WhatsappPage from "../components/whatsapp.jsx";

const COLORS = {
  primary: "#B3541E",
  secondary: "#D6A74F",
  accent: "#A5A58D",
  text: "#3E2F1C",
  background: "#F5EBDD",
};

export default function CartPage() {
  const dispatch = useDispatch();
  const { cartItems, cartTotalAmount } = useSelector((state) => state.cart);

  const subtotal = cartTotalAmount;
  const shippingCharge = subtotal >= 5000 ? 0 : 50;
  const totalAmount = subtotal + shippingCharge;
  const amountLeftForFree = 5000 - subtotal;

  const handleRemove = (id) => dispatch(removeFromCart(id));
  const handleDecrease = (id) => dispatch(decreaseQuantity(id));
  const handleIncrease = (id) => dispatch(increaseQuantity(id));

  return (
    <div
      className="min-h-screen flex flex-col items-center py-8 px-4 md:px-8"
      style={{ background: COLORS.background }}
    >
      {/* ---------- Free Shipping Bar ---------- */}
      {cartItems.length > 0 && amountLeftForFree > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-3xl bg-[#FFF3E3] text-center py-3 px-4 rounded-xl border border-[#F1D5A5] shadow mb-6"
        >
          <p className="text-[#B3541E] font-semibold">
            Add <strong>₹{amountLeftForFree}</strong> more to get{" "}
            <strong>FREE SHIPPING</strong> 🚚✨
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
            <div
              className="h-2 rounded-full"
              style={{
                width: `${Math.min((subtotal / 5000) * 100, 100)}%`,
                background: COLORS.primary,
              }}
            ></div>
          </div>
        </motion.div>
      )}

      {cartItems.length > 0 && subtotal >= 5000 && (
        <div className="w-full max-w-3xl bg-green-100 text-green-700 py-3 px-4 rounded-xl border border-green-300 shadow mb-6 text-center font-semibold">
          🎉 Congratulations! You unlocked FREE SHIPPING!
        </div>
      )}

      <motion.h1
        className="text-4xl font-extrabold text-center mb-10"
        style={{ color: COLORS.primary }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        My Cart 🛒
      </motion.h1>

      {/* ---------------- Empty Cart ---------------- */}
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center mt-16 space-y-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="Empty Cart"
            className="w-40 opacity-80"
          />
          <p className="text-lg text-[#3E2F1C] font-semibold">
            Your cart is feeling a little light!
          </p>
          <Link
            to="/shop"
            className="px-6 py-3 bg-[#B3541E] text-white font-bold rounded-lg hover:bg-[#D6A74F] transition shadow-lg"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
          {/* ---------------- Cart Items ---------------- */}
          <div className="flex-1 bg-white rounded-2xl shadow-xl p-6 space-y-6">
            {cartItems.map((item) => (
              <motion.div
                key={item.product}
                className="flex flex-col sm:flex-row items-center justify-between gap-6 p-4 border border-[#F5EBDD] rounded-xl shadow hover:shadow-md transition"
                whileHover={{ scale: 1.01 }}
              >
                <Link to={`/products/${item.product}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 object-cover rounded-lg border border-[#EAD8C0]"
                  />
                </Link>

                <div className="flex-1 text-center sm:text-left">
                  <h2 className="font-bold text-lg mb-1" style={{ color: COLORS.text }}>
                    {item.name}
                  </h2>
                  <p className="text-[#A5A58D] text-sm mb-2">
                    ₹ {item.price.toLocaleString()} each
                  </p>

                  {/* Quantity Buttons */}
                  <div className="flex items-center justify-center sm:justify-start gap-3">
                    <button
                      onClick={() => handleDecrease(item.product)}
                      className="w-8 h-8 bg-[#F5EBDD] text-[#B3541E] rounded-full font-bold hover:bg-[#D6A74F] transition"
                    >
                      −
                    </button>

                    <span className="font-semibold text-base text-[#3E2F1C] w-6 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => handleIncrease(item.product)}
                      className="w-8 h-8 bg-[#F5EBDD] text-[#B3541E] rounded-full font-bold hover:bg-[#D6A74F] transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-center sm:items-end gap-2">
                  <span className="text-xl font-bold" style={{ color: COLORS.primary }}>
                    ₹ {(item.price * item.quantity).toLocaleString()}
                  </span>

                  <button
                    onClick={() => handleRemove(item.product)}
                    className="text-sm text-[#B3541E] hover:text-[#D6A74F] font-semibold transition"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ---------------- Summary ---------------- */}
          <div className="md:w-80 bg-white rounded-2xl shadow-xl p-6 h-fit sticky top-20">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2" style={{ color: COLORS.primary }}>
              Order Summary
            </h2>

            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹ {subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>{shippingCharge === 0 ? "Free" : `₹ ${shippingCharge}`}</span>
            </div>

            <div className="border-t my-3"></div>

            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total</span>
              <span style={{ color: COLORS.primary }}>₹ {totalAmount.toLocaleString()}</span>
            </div>

            <Link
              to="/checkout"
              className="block text-center py-3 bg-[#B3541E] text-white font-bold rounded-lg hover:bg-[#D6A74F] transition shadow-md mb-3"
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/shop"
              className="block text-center py-3 rounded-lg border border-[#B3541E] text-[#B3541E] font-bold hover:bg-[#B3541E] hover:text-white transition shadow-sm"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}

      <RecommendedProducts cartItems={cartItems} />
      <WhatsappPage />
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import WhatsappPage from "../components/whatsapp.jsx";
import { clearBuyNowItem } from "../redux/cartSlice";

const COLORS = {
  primary: "#B3541E",
  secondary: "#D6A74F",
  background: "#F5EBDD",
  text: "#3E2F1C",
};
// const [paymentMethod, setPaymentMethod] = useState("");

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("");

  const { buyNowItem, cartItems, cartTotalAmount } = useSelector(
    (state) => state.cart
  );

  const productsToShow = buyNowItem ? [buyNowItem] : cartItems;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const totalAmount = buyNowItem ? buyNowItem.price : cartTotalAmount;

  // ---------------------------------------
  // 🚀 PLACE ORDER BUTTON CLICKED
  // ---------------------------------------

 const handlePlaceOrder = (e) => {
  e?.preventDefault?.();

  if (!formData.fullName || !formData.address || !formData.phone) {
    alert("Please fill in all required fields.");
    return;
  }

  if (!paymentMethod) {
    alert("Please select a payment method.");
    return;
  }

  // Build order payload to pass to payment page (you can also POST/create order on backend here)
  const orderPayload = {
    amount: totalAmount, // number
    items: productsToShow,
    shipping: formData,
  };

  if (paymentMethod === "COD") {
    // handle COD: create order backend call if required, then navigate
    navigate("/order-success", { state: { method: "COD", order: orderPayload } });
    return;
  }

  // For Razorpay / UPI via Razorpay: navigate to Payment page with state
  if (paymentMethod === "RAZORPAY" || paymentMethod === "UPI_QR") {
    navigate("/payment", { state: { orderPayload, paymentMethod } });
    return;
  }

  // fallback
  alert("Unsupported payment method selected.");
};


  useEffect(() => {
    if (!buyNowItem && cartItems.length === 0) {
      navigate("/shop");
    }
  }, []);

  return (
    <div
      className="min-h-screen py-10 px-4 md:px-12"
      style={{ background: COLORS.background }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
        {/* ---------------- LEFT SIDE — USER DETAILS ---------------- */}
        <div className="flex-1 bg-white p-8 rounded-2xl shadow-xl">
          <h2
            className="text-3xl font-bold mb-6"
            style={{ color: COLORS.primary }}
          >
            Checkout
          </h2>

          <form className="space-y-5" onSubmit={handlePlaceOrder}>
            {/* FULL NAME */}
            <div>
              <label className="block font-semibold mb-1">Full Name *</label>
              <input
                type="text"
                name="fullName"
                className="w-full px-4 py-2 border rounded-lg"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>

            {/* EMAIL + PHONE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block font-semibold mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Phone *</label>
                <input
                  type="text"
                  name="phone"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            {/* ADDRESS */}
            <div>
              <label className="block font-semibold mb-1">Address *</label>
              <textarea
                name="address"
                className="w-full px-4 py-2 border rounded-lg"
                rows="3"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street, Locality, House Number"
              ></textarea>
            </div>

            {/* CITY + PIN */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block font-semibold mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="PIN Code"
                />
              </div>
            </div>

            {/* ---------------- PAYMENT METHOD ---------------- */}
            {/* <div className="mt-6">
              <h3
                className="text-xl font-bold mb-3"
                style={{ color: COLORS.text }}
              >
                Payment Method
              </h3>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="font-medium">Cash on Delivery (COD)</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="UPI"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="font-medium">UPI / Wallet</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Razorpay"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="font-medium">Pay Online (Razorpay)</span>
                </label>
              </div>
            </div> */}

            {/* PAYMENT METHOD SELECTION */}
            <div className="bg-[#FFF3E3] p-4 rounded-xl mb-4">
              <label
                className="font-semibold block mb-2"
                style={{ color: COLORS.text }}
              >
                Payment Method
              </label>

              <div className="flex flex-col md:flex-row gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="ml-1">Cash on Delivery</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="RAZORPAY"
                    checked={paymentMethod === "RAZORPAY"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="ml-1">UPI / Card / Wallet (Razorpay)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="UPI_QR"
                    checked={paymentMethod === "UPI_QR"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="ml-1">UPI (QR)</span>
                </label>
              </div>
            </div>

            {/* ---------------- SUBMIT ---------------- */}
            <motion.button
              type="button"
              onClick={handlePlaceOrder}
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
              Continue to Payment
            </motion.button>
          </form>
        </div>

        {/* ---------------- RIGHT SIDE — ORDER SUMMARY ---------------- */}
        <div className="md:w-[400px] bg-white p-8 rounded-2xl shadow-xl h-fit sticky top-20">
          <h3 className="text-2xl font-bold mb-6 border-b pb-3">
            Order Summary
          </h3>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {productsToShow.map((item) => (
              <div
                key={item._id}
                className="flex justify-between border-b pb-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.images?.[0]}
                    className="w-14 h-14 object-cover rounded-md border"
                  />
                  <div>
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity || 1}
                    </p>
                  </div>
                </div>

                <span
                  className="font-semibold text-sm"
                  style={{ color: COLORS.primary }}
                >
                  ₹ {(item.price * (item.quantity || 1)).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t mt-5 pt-4 space-y-2">
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
            className="block text-center w-full py-3 mt-6 rounded-lg border text-[#B3541E]"
          >
            Back to Cart
          </Link>
        </div>
      </div>

      <WhatsappPage />
    </div>
  );
}

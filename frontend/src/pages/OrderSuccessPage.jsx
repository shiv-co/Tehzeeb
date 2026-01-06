import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import confetti from "canvas-confetti";

const COLORS = {
  primary: "#B3541E",
  background: "#F5EBDD",
  text: "#3E2F1C",
};

export default function OrderSuccessPage() {
  const location = useLocation();
  const orderId = new URLSearchParams(location.search).get("orderId");
  const trackingId = new URLSearchParams(location.search).get("trackingId");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
  }, []);

  const mask = (str) => str?.slice(0, 3) + "*****";

useEffect(() => {
  async function loadOrder() {
    try {
      const token = userInfo?.token;

      const { data } = await axios.get(
        // `http://localhost:5000/api/orders/tracking/${trackingId}`,
        `https://tehzeeb-pi47.vercel.app/api/orders/tracking/${trackingId}`,
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );

      setOrder(data);
    } catch (err) {
      console.error("Failed to load order:", err);
    } finally {
      setLoading(false);
    }
  }

  if (trackingId) loadOrder(); // ✅ FIXED
}, [trackingId]);

  if (loading) return <h2>Loading...</h2>;
  if (!order) return <h2>Order not found</h2>;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: COLORS.background }}
    >
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold" style={{ color: COLORS.primary }}>
          Order Successful! 🎉
        </h1>

        <p className="mt-3" style={{ color: COLORS.text }}>
          Thank you for shopping with <strong>Tehzeeb Creations</strong>.
        </p>

        {/* ORDER ID + MASKED DETAILS */}
        <div
          className="mt-5 p-4 bg-[#FFF4E6] rounded-xl shadow border-l-4"
          style={{ borderColor: COLORS.primary }}
        >
          <p>Your Order ID:</p>
          <p className="text-xl font-bold">{order._id}</p>

          <p className="mt-3">
            Phone:{" "}
            {userInfo
              ? order.shippingAddress.phone
              : mask(order.shippingAddress.phone)}
          </p>

          <p>
            Address:{" "}
            {userInfo
              ? order.shippingAddress.address
              : order.shippingAddress.address.slice(0, 10) + "..."}
          </p>
        </div>

        {/* CONTROLS */}
        <Link
          to="/shop"
          className="mt-6 block py-3 rounded-xl font-bold text-white"
          style={{ background: COLORS.primary }}
        >
          Continue Shopping
        </Link>

        <Link
            to={`/orders/details/${trackingId}`}
          className="mt-3 block py-3 rounded-xl font-bold border"
          style={{ color: COLORS.primary, borderColor: COLORS.primary }}
        >
          View Order Details
        </Link>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiEye, FiTrash2, FiCheckCircle } from "react-icons/fi";
import { Link } from "react-router-dom";


const API_BASE = "https://tehzeeb-pi47.vercel.app/api";
const COLORS = {
  primary: "#B3541E",
  secondary: "#D6A74F",
  background: "#F5EBDD",
  text: "#3E2F1C",
  accent: "#A5A58D",
};

export default function AdminManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // ✔ Fetch admin token
  const adminInfo = JSON.parse(localStorage.getItem("userInfo"));

   useEffect(() => {
    if (!adminInfo?.token) return;

    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/orders`, {
          headers: {
            Authorization: `Bearer ${adminInfo.token}`,
          },
        });

        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [adminInfo?.token]); //

  // 🗑 Delete Order
   const deleteOrder = async (id) => {
    if (!window.confirm("Delete order permanently?")) return;

    try {
      await axios.delete(`${API_BASE}/orders/${id}`, {
        headers: { Authorization: `Bearer ${adminInfo?.token}` },
      });

      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // ✔ Mark Delivered
   const markAsDelivered = async (id) => {
    try {
      await axios.put(
        `${API_BASE}/orders/${id}/deliver`,
        {},
        {
          headers: { Authorization: `Bearer ${adminInfo?.token}` },
        }
      );

      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, isDelivered: true } : o))
      );
    } catch (error) {
      console.error("Delivery update failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl font-semibold text-[#B3541E]">
        Loading orders...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen px-6 py-8"
      style={{ background: COLORS.background }}
    >
      <Link
        to="/admin/dashboard"
        className="text-sm font-semibold"
        style={{ color: COLORS.accent }}
      >
        ← Back to Dashboard
      </Link>

      <h1
        className="text-4xl font-bold text-center mt-4 mb-8"
        style={{ color: COLORS.primary }}
      >
        Manage Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center text-lg text-[#3E2F1C] mt-10">
          No orders found yet.
        </div>
      ) : (
        <div className="overflow-x-auto shadow-xl rounded-xl bg-white">
          <table className="w-full text-left">
            <thead className="sticky top-0 bg-[#B3541E] text-white text-sm">
              <tr>
                <th className="py-3 px-4">Tracking ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, i) => (
                <motion.tr
                  key={order._id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b hover:bg-[#FFF5E1] text-sm"
                >
                  <td className="py-3 px-4 font-semibold text-[#B3541E]">
                    {order.trackingId || "—"}
                  </td>

                  <td className="py-3 px-4">{order.user?.name || "Guest"}</td>

                  <td className="py-3 px-4">
                    {order.paymentMethod === "COD" ? (
                      <span className="px-2 py-1 rounded bg-yellow-200 text-yellow-800 text-xs">
                        COD (Not Paid)
                      </span>
                    ) : order.isPaid ? (
                      <span className="px-2 py-1 rounded bg-green-200 text-green-800 text-xs">
                        Paid Online
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>

                  <td className="py-3 px-4 font-semibold">
                    ₹ {order.totalPrice.toLocaleString()}
                  </td>

                  <td className="py-3 px-4">
                    {order.isDelivered ? (
                      <span className="px-2 py-1 rounded bg-green-200 text-green-800 text-xs">
                        Delivered
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded bg-orange-200 text-orange-800 text-xs">
                        Pending
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4 flex justify-center gap-3">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-[#B3541E] hover:scale-110 transition"
                    >
                      <FiEye size={18} />
                    </button>

                    {!order.isDelivered && (
                      <button
                        onClick={() => markAsDelivered(order._id)}
                        className="text-green-600 hover:scale-110 transition"
                      >
                        <FiCheckCircle size={18} />
                      </button>
                    )}

                    <button
                      onClick={() => deleteOrder(order._id)}
                      className="text-red-500 hover:scale-110 transition"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ————————— MODAL ————————— */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
          >
            {/* HEADER */}
            <h2
              className="text-2xl font-bold mb-4 border-b pb-2"
              style={{ color: COLORS.primary }}
            >
              Order Details
            </h2>

            {/* CUSTOMER INFO */}
            <div className="space-y-2 text-sm">
              <p>
                <strong>Order ID:</strong> {selectedOrder._id}
              </p>
              <p>
                <strong>Customer:</strong> {selectedOrder.user?.name || "Guest"}
              </p>
              <p>
                <strong>Email:</strong> {selectedOrder.user?.email || "N/A"}
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                {selectedOrder.shippingAddress?.phone || "N/A"}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {selectedOrder.shippingAddress?.address},{" "}
                {selectedOrder.shippingAddress?.city},{" "}
                {selectedOrder.shippingAddress?.postalCode}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {selectedOrder.isDelivered ? (
                  <span className="text-green-600 font-semibold">
                    Delivered
                  </span>
                ) : (
                  <span className="text-yellow-600 font-semibold">Pending</span>
                )}
              </p>
              <p>
                <strong>Total Price:</strong>{" "}
                <span className="font-bold text-[#B3541E]">
                  ₹ {selectedOrder.totalPrice.toLocaleString()}
                </span>
              </p>
            </div>

            {/* ORDER ITEMS */}
            <h3
              className="mt-5 text-lg font-semibold"
              style={{ color: COLORS.primary }}
            >
              Ordered Items
            </h3>

            <div className="space-y-4 mt-3">
              {selectedOrder.orderItems.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-3 border rounded-lg bg-[#FFF8EE] shadow-sm"
                >
                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md border"
                  />

                  {/* Product Info */}
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                  </div>

                  {/* Price */}
                  <div className="font-bold text-[#B3541E]">
                    ₹ {(item.price * item.qty).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* FOOTER BUTTON */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 rounded-lg bg-[#B3541E] text-white font-semibold hover:bg-[#D6A74F] transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

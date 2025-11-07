import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiEye, FiTrash2, FiCheckCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

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

  // 🧠 Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("/api/orders");
        //   console.log("Fetched orders:", data); // 👀 Debug log
        setOrders(Array.isArray(data) ? data : []); // ✅ Always ensure it's an array
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]); // fallback
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // 🗑 Delete order
  const deleteOrder = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`/api/orders/${id}`);
        setOrders((prev) => prev.filter((order) => order._id !== id));
        alert("🗑️ Order deleted successfully");
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  // ✅ Mark as delivered
  const markAsDelivered = async (id) => {
    try {
      await axios.put(`/api/orders/${id}/deliver`);
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, isDelivered: true } : order
        )
      );
      alert("✅ Order marked as delivered!");
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5EBDD] text-[#B3541E] text-2xl font-semibold">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-8 bg-[#F5EBDD]">
      <Link
        to="/admin/dashboard"
        className="inline-block mb-4 text-sm font-semibold"
        style={{ color: COLORS.accent }}
      >
        &larr; Go Back to Admin Dashboard
      </Link>
      <h1 className="text-3xl font-bold text-[#B3541E] mb-8 text-center">
        Manage Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center text-[#3E2F1C] text-lg">
          No orders have been placed yet.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="w-full border-collapse">
            <thead className="bg-[#B3541E] text-white">
              <tr>
                <th className="py-3 px-4 text-left">Order ID</th>
                <th className="py-3 px-4 text-left">Customer</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Total</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <motion.tr
                  key={order._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b hover:bg-[#FFF5E1] transition"
                >
                  <td className="py-3 px-4">{order._id.slice(-6)}</td>
                  <td className="py-3 px-4">{order.user?.name || "Guest"}</td>
                  <td className="py-3 px-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 font-semibold text-[#B3541E]">
                    ₹ {order.totalPrice.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    {order.isDelivered ? (
                      <span className="text-green-600 font-semibold">
                        Delivered
                      </span>
                    ) : (
                      <span className="text-yellow-600 font-semibold">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 flex justify-center items-center gap-3">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-[#B3541E] hover:text-[#D6A74F] transition"
                      title="View Details"
                    >
                      <FiEye size={20} />
                    </button>
                    {!order.isDelivered && (
                      <button
                        onClick={() => markAsDelivered(order._id)}
                        className="text-green-600 hover:text-green-800 transition"
                        title="Mark as Delivered"
                      >
                        <FiCheckCircle size={20} />
                      </button>
                    )}
                    <button
                      onClick={() => deleteOrder(order._id)}
                      className="text-red-500 hover:text-red-700 transition"
                      title="Delete Order"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* --- Order Details Modal --- */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md"
          >
            <h2
              className="text-2xl font-bold mb-4 border-b pb-2"
              style={{ color: COLORS.primary }}
            >
              Order Details
            </h2>
            <p>
              <strong>Customer:</strong> {selectedOrder.user?.name || "Guest"}
            </p>
            <p>
              <strong>Email:</strong> {selectedOrder.user?.email || "N/A"}
            </p>
            <p>
              <strong>Total:</strong> ₹{" "}
              {selectedOrder.totalPrice.toLocaleString()}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {selectedOrder.isDelivered ? "Delivered" : "Pending"}
            </p>

            <h3 className="mt-4 font-semibold">Items:</h3>
            <ul className="list-disc ml-5 mt-2 text-sm">
              {selectedOrder.orderItems.map((item, i) => (
                <li key={i}>
                  {item.name} × {item.qty} — ₹
                  {(item.price * item.qty).toLocaleString()}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 rounded-lg bg-[#B3541E] text-white font-semibold hover:bg-[#D6A74F] transition"
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

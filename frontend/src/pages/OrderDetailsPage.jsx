import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const { trackingId } = useParams();

  const mask = (str) => str?.slice(0, 3) + "*****";

  useEffect(() => {
    async function fetchOrder() {
      try {
        const token = userInfo?.token;

        const { data } = await axios.get(
          // `http://localhost:5000/api/orders/tracking/${trackingId}`,
          `https://tehzeeb-pi47.vercel.app/api/orders/tracking/${trackingId}`,
          { headers: token ? { Authorization: `Bearer ${token}` } : {} }
        );

        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [id]);

  if (loading) return <h2>Loading…</h2>;
  if (!order) return <h2>Order not found</h2>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Order Details</h1>

      <p>
        <strong>Order ID:</strong> {order._id}
      </p>
      <p>
        <strong>Phone:</strong>{" "}
        {userInfo
          ? order.shippingAddress.phone
          : mask(order.shippingAddress.phone)}
      </p>
      <p>
        <strong>Address:</strong>{" "}
        {userInfo
          ? order.shippingAddress.address
          : order.shippingAddress.address.slice(0, 10) + "..."}
      </p>

      <h3 className="mt-4 text-xl font-bold">Items:</h3>
      {order.orderItems.map((item, i) => (
        <div key={i}>
          {item.name} — Qty: {item.qty} — ₹{item.price}
        </div>
      ))}

      <p className="mt-4 text-lg font-bold">Total: ₹{order.totalPrice}</p>
    </div>
  );
}

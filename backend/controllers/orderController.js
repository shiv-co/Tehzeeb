import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc    Get all orders (Admin only)
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "name email");
  res.json(orders);
});

// @desc    Delete order (Admin only)
export const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    await order.deleteOne();
    res.json({ message: "Order deleted successfully" });
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Mark order as delivered (Admin only)
export const markOrderAsDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updatedOrder = await order.save();
  res.json(updatedOrder);
});


// @desc    Create new order
export const createOrder = asyncHandler(async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

   

    if (!orderItems || orderItems.length === 0) {
      console.log("❌ ERROR: No order items received");
      return res.status(400).json({ message: "No order items" });
    }

    const order = new Order({
      trackingId: "TC" + Date.now(),
      user: req.user?._id || null,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      isPaid: paymentMethod === "COD" ? false : true,
    });

    const createdOrder = await order.save();
    console.log("✅ COD Order saved:", createdOrder._id);

    return res.status(201).json(createdOrder);

  } catch (err) {
    console.error("🔥 SERVER ERROR in createOrder:", err);
    return res.status(500).json({ message: err.message });
  }
});

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  res.json(order);
});

export const getOrderByTrackingId = asyncHandler(async (req, res) => {
  const order = await Order.findOne({ trackingId: req.params.trackingId });

  if (!order) {
    res.status(404);
    throw new Error("Order not found with this Tracking ID");
  }

  res.json(order);
});

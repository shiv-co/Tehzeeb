import Razorpay from "razorpay";
import express from "express";
import crypto from "crypto";
import Order from "../models/orderModel.js";

const router = express.Router();



// Initialize Razorpay safely
let razorpay;

try {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  // console.log("✅ Razorpay initialized successfully");
} catch (err) {
  console.error("❌ Razorpay initialization FAILED:", err.message);
}

// ---------------- CREATE ORDER ----------------
router.post("/create-order", async (req, res) => {
  if (!razorpay) return res.status(500).json({ message: "Razorpay not initialized" });

  try {
    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: "rcpt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    res.json(order);

  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ message: "Failed to create Razorpay order", error: err });
  }
});

// ---------------- VERIFY SIGNATURE ----------------
// router.post("/verify", async (req, res) => {
//   try {
//     const {
//       razorpay_payment_id,
//       razorpay_order_id,
//       razorpay_signature,
//       amount,
//       shippingInfo,
//       cartItems,
//       buyNowItem,
//       userId,
//     } = req.body;

//     const sign = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSign = crypto
//       .createHmac("sha256", process.env.RAZORPAY_SECRET)
//       .update(sign)
//       .digest("hex");

//     if (expectedSign !== razorpay_signature) {
//       return res.json({ success: false, message: "Invalid signature" });
//     }

//     const orderItems = (buyNowItem ? [buyNowItem] : cartItems).map((item) => ({
//       name: item.name,
//       qty: item.quantity || 1,
//       image: item.images?.[0],
//       price: item.price,
//       product: item._id,
//     }));

//     const order = await Order.create({
//       user: userId || null,
//       orderItems,
//       shippingAddress: {
//         address: shippingInfo.address,
//         city: shippingInfo.city,
//         postalCode: shippingInfo.postalCode,
//         country: "India",
//       },
//       paymentMethod: "Razorpay",
//       paymentResult: {
//         id: razorpay_payment_id,
//         status: "Paid",
//         update_time: new Date(),
//         email_address: shippingInfo.email,
//       },
//       totalPrice: amount,
//       isPaid: true,
//       paidAt: new Date(),
//     });

//     res.json({
//       success: true,
//       orderId: order._id,
//       trackingId: order.trackingId,
//     });

//   } catch (error) {
//     // console.error("Payment verification error:", error);
//     res.status(500).json({ success: false, message: "Verification error" });
//   }
// });

router.post("/verify", async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      amount,
      shippingInfo,
      cartItems,
      buyNowItem,
      userId,
    } = req.body;

    // 1️⃣ Verify signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // 2️⃣ Normalize products (CRITICAL FIX)
    const products = buyNowItem ? [buyNowItem] : cartItems;

    const orderItems = products.map((item) => ({
      name: item.name,
      qty: item.quantity || 1,
      image: item.image || item.images?.[0] || "",
      price: item.price,
      product: item.product || item._id || item.id,
    }));

    // 3️⃣ Create order (trackingId FIX)
    const order = await Order.create({
      trackingId: "TC" + Date.now(),
      user: userId || null,
      orderItems,
      shippingAddress: {
        address: shippingInfo.address,
        city: shippingInfo.city,
        postalCode: shippingInfo.postalCode,
        country: "India",
        phone: shippingInfo.phone,
        fullName: shippingInfo.fullName,
        email: shippingInfo.email,
      },
      paymentMethod: "Razorpay",
      paymentResult: {
        id: razorpay_payment_id,
        status: "Paid",
        update_time: new Date(),
        email_address: shippingInfo.email,
      },
      totalPrice: amount,
      isPaid: true,
      paidAt: new Date(),
    });

    // 4️⃣ Respond
    res.json({
      success: true,
      orderId: order._id,
      trackingId: order.trackingId,
    });

  } catch (error) {
    console.error("🔥 Razorpay verify failed:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});



export default router;

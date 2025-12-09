import Razorpay from 'razorpay';
import express from 'express';
import crypto from "crypto";

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

router.post('/create-order', async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // amount in paisa
      currency: 'INR',
      receipt: `order_rcptid_${Math.floor(Math.random() * 10000)}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create Razorpay order', error: err });
  }
});

router.post("/verify", async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = req.body;

    // Matching signature using the secret key
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign === razorpay_signature) {
      return res.json({ success: true, message: "Payment verified successfully" });
    } else {
      return res.json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ success: false, message: "Verification error" });
  }
});



export default router;

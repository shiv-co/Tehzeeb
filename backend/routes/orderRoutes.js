import express from "express";
import {
  getAllOrders,
  deleteOrder,
  markOrderAsDelivered,
  createOrder,
  getOrderById,
  getOrderByTrackingId
} from "../controllers/orderController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC ROUTE → tracking id (guest users allowed)
router.get("/tracking/:trackingId", getOrderByTrackingId);

// Admin + logged in user routes
router.route("/")
  .get(protect, admin, getAllOrders)
  .post(protect, createOrder);

// Logged In users only
router.route("/:id")
  .get(protect, getOrderById)
  .delete(protect, admin, deleteOrder);

router.put("/:id/deliver", protect, admin, markOrderAsDelivered);

export default router;

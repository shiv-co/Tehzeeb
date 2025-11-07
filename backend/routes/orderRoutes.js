import express from "express";
import {
  getAllOrders,
  deleteOrder,
  markOrderAsDelivered,
  createOrder,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin routes
router.route("/").get(protect, admin, getAllOrders).post(protect, createOrder);
router
  .route("/:id")
  .delete(protect, admin, deleteOrder);

router.put("/:id/deliver", protect, admin, markOrderAsDelivered);

export default router;

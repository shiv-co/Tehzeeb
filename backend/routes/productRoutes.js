import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  createProduct, // <-- 1. Import new controller function
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js'; // <-- 2. Import middleware

// Route for getting all products
router
  .route('/')
  .get(getProducts)
  .post(protect, admin, createProduct); // <-- 3. Add POST route (Admin only)

// Route for getting a single product by its ID
router.route('/:id').get(getProductById);

export default router;

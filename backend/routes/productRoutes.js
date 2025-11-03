import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// Public Routes
router.route('/').get(getProducts);

// Admin Routes
router
  .route('/')
  .post(protect, admin, createProduct); // Create product (Admin only)

router
  .route('/:id')
  .get(getProductById) // Get product by ID
  .put(protect, admin, updateProduct) // Update product
  .delete(protect, admin, deleteProduct); // Delete product

export default router;

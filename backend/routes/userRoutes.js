import express from 'express';
const router = express.Router();
import {  
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers, } from '../controllers/userController.js';
  import { protect, admin } from '../middleware/authMiddleware.js';

// Route for /api/users/register
router.post('/register', registerUser);

// Route for /api/users/login
router.post('/login', loginUser);
router.post('/logout', logoutUser);

router
  .route('/profile')
  .get(protect, getUserProfile) // GET /api/users/profile
  .put(protect, updateUserProfile); // PUT /api/users/profile



// Admin-only routes
router.route('/').get(protect, admin, getUsers);   
export default router;

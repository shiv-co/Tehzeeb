import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

/**
 * @desc    Middleware to protect routes
 * @access  Private
 *
 * This function checks for a valid JWT in the request headers.
 * If the token is valid, it attaches the user's data (minus the password)
 * to the request object (req.user) so that subsequent routes can access it.
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for the 'Authorization' header, and if it starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get the token part from the header (e.g., "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user from the ID in the token
      // and attach them to the request object.
      // We explicitly exclude the password.
      req.user = await User.findById(decoded.userId).select('-password');

      // Call the next middleware or route handler
      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      res.status(401); // 401 Unauthorized
      throw new Error('Not authorized, token failed');
    }
  }

  // If no token is found at all
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

/**
 * @desc    Middleware to check if user is an admin
 * @access  Private (Admin)
 *
 * This middleware should be used *after* the 'protect' middleware.
 * It checks if the logged-in user (req.user) has the 'isAdmin' flag set to true.
 */
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // User is an admin, proceed
  } else {
    res.status(403); // 403 Forbidden
    throw new Error('Not authorized as an admin');
  }
};

export { protect, admin };

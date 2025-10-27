import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
// We don't need 'jwt' here, as generateToken handles it
// import jwt from 'jsonwebtoken'; 

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    // --- THIS IS THE FIX ---
    // 1. Capture the token returned from your Canvas file
    const token = generateToken(res, user._id); 

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      // 2. Send the captured token in the response
      token: token, 
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Auth user (login) & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // This 'matchPassword' method is in the userModel.js file below
  if (user && (await user.matchPassword(password))) {
    // --- THIS IS THE FIX ---
    // 1. Capture the token
    const token = generateToken(res, user._id); 

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      // 2. Send the captured token
      token: token,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// Fixed the export to be one line
export { registerUser, loginUser };


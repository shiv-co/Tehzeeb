import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  // .find({}) gets all products
  const products = await Product.find({});
  res.json(products);
});

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    // We use the error middleware
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  // We get all the product data from the request body
  // This includes the 'images' array you send from Postman
  const {
    name,
    price,
    description,
    images,
    brand,
    category,
    countInStock,
  } = req.body;

  // We create a new product instance
  const product = new Product({
    name: name,
    price: price,
    user: req.user._id, // Get the admin user's ID from the 'protect' middleware
    images: images, // <-- This is the crucial line
    brand: brand,
    category: category,
    countInStock: countInStock,
    numReviews: 0,
    description: description,
  });

  // Save the new product to the database
  const createdProduct = await product.save();

  // Send a 201 'Created' status and the new product back
  res.status(201).json(createdProduct);
});

// --- NEW ADMIN FUNCTION: UPDATE PRODUCT ---
// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    images,
    brand,
    category,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.images = images;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// --- NEW ADMIN FUNCTION: DELETE PRODUCT ---
// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// --- UPDATED EXPORTS ---
export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};


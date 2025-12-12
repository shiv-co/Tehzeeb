import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Fetch single product by ID                              
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json(product);
});

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    images,
    brand,
    category,
    countInStock,
    originalPrice,
    discount,
    rating,
    reviews,
    isNew,
    // attributes,
    colors,
    sizes,
  } = req.body;

  const product = new Product({
    user: req.user._id,
    name,
    price,
    description,
    images,
    brand,
    category,
    countInStock,

    // NEW FIELDS
    originalPrice,
    discount,
    rating,
    reviews,
    isNew,
    // attributes,
    colors,
    sizes,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Extract fields from request body
  const {
    name,
    price,
    originalPrice,
    description,
    images,
    brand,
    category,
    countInStock,
    rating,
    reviews,
    isNew,
    colors,
    sizes,
  } = req.body;

  // Update only if provided
  product.name = name ?? product.name;
  product.price = price ?? product.price;
  product.originalPrice = originalPrice ?? product.originalPrice;
  product.description = description ?? product.description;
  product.images = images ?? product.images;
  product.brand = brand ?? product.brand;
  product.category = category ?? product.category;
  product.countInStock = countInStock ?? product.countInStock;

  // NEW FIELDS (MUST MATCH MODEL)
  product.rating = rating ?? product.rating;
  product.reviews = reviews ?? product.reviews;
  product.isNew = isNew ?? product.isNew;
  product.colors = colors ?? product.colors;
  product.sizes = sizes ?? product.sizes;

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});


// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  await Product.deleteOne({ _id: req.params.id });
  res.json({ message: 'Product removed' });
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

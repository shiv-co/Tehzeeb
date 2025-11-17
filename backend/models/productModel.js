import mongoose from 'mongoose';

const attributeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    values: { type: [String], required: true },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    name: {
      type: String,
      required: true,
    },

    // Array of image URLs
    images: {
      type: [String],
      required: true,
    },

    brand: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    originalPrice: {
      type: Number,
      default: null,
    },

    discount: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 0,
    },

    reviews: {
      type: Number,
      default: 0,
    },

    isNew: {
      type: Boolean,
      default: false,
    },

    // // Flexible attributes (Color, Size etc.)
    // attributes: {
    //   type: [attributeSchema],
    //   default: [],
    // },

    // Direct color & size fields (easy for UI)
    colors: {
      type: [String],
      default: [],
    },

    sizes: {
      type: [String],
      default: [],
    },

    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;

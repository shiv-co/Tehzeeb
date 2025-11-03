import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiUpload, FiTrash2 } from 'react-icons/fi';
import { fetchProductById } from '../redux/productsSlice'; // To get product data
import { updateProduct, uploadProductImages, clearAdminError } from '../redux/adminSlice'; // Admin actions
import { toast } from 'react-toastify';

// Your Brand's Color Theme
const COLORS = {
  primary: '#B3541E',
  secondary: '#D6A74F',
  accent: '#A5A58D',
  text: '#3E2F1C',
  background: '#F5EBDD',
};

export default function ProductEditPage() {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Component state for the form
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]); // Array of Cloudinary URLs

  // Get state from Redux
  const {
    product,
    loading: productLoading,
    error: productError,
  } = useSelector((state) => state.products.selectedProduct);

  const {
    productUpdateLoading,
    imageUploadLoading,
    error: adminError,
  } = useSelector((state) => state.admin);

  useEffect(() => {
    // Clear any previous admin errors
    dispatch(clearAdminError());

    // If product is not loaded, or not the correct one, fetch it
    if (!product || product._id !== productId) {
      dispatch(fetchProductById(productId));
    } else {
      // Product is loaded, populate the form
      setName(product.name);
      setPrice(product.price);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
      setImages(product.images);
    }
  }, [dispatch, product, productId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        brand,
        category,
        countInStock,
        description,
        images,
      })
    )
      .unwrap()
      .then(() => {
        alert('Product updated successfully!');
        navigate('/admin/products');
      })
      .catch((err) => {
        // Error is already set in adminSlice, just log it
        console.error('Failed to update product:', err);
      });
  };

  const uploadFileHandler = async (e) => {
    const files = e.target.files;
    if (files.length === 0) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }

    dispatch(uploadProductImages(formData))
      .unwrap()
      .then((newImageUrls) => {
        // Add new URLs to the existing ones
        setImages((prevImages) => [...prevImages, ...newImageUrls]);
      })
      .catch((err) => {
        console.error('Failed to upload images:', err);
      });
  };

  const removeImageHandler = (urlToRemove) => {
    if (window.confirm('Are you sure you want to remove this image?')) {
      setImages((prevImages) =>
        prevImages.filter((url) => url !== urlToRemove)
      );
    }
  };

  if (productLoading === 'pending') return <p>Loading product details...</p>;
  if (productError) return <p style={{ color: 'red' }}>Error: {productError}</p>;

  return (
    <div
      className="min-h-screen p-4 md:p-8"
      style={{ background: COLORS.background }}
    >
      <div className="max-w-3xl mx-auto">
        <Link
          to="/admin/products"
          className="inline-block mb-4 text-sm font-semibold"
          style={{ color: COLORS.accent }}
        >
          &larr; Go Back to Product List
        </Link>
        <h1
          className="text-3xl font-bold mb-6"
          style={{ color: COLORS.primary }}
        >
          Edit Product
        </h1>
        <form
          onSubmit={submitHandler}
          className="bg-white rounded-xl shadow-lg p-6 md:p-8 space-y-4"
        >
          {adminError && <p style={{ color: 'red' }}>Error: {adminError}</p>}

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium"
              style={{ color: COLORS.text }}
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
              style={{ borderColor: COLORS.accent }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium"
                style={{ color: COLORS.text }}
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
                style={{ borderColor: COLORS.accent }}
              />
            </div>
            <div>
              <label
                htmlFor="countInStock"
                className="block text-sm font-medium"
                style={{ color: COLORS.text }}
              >
                Count In Stock
              </label>
              <input
                type="number"
                id="countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
                style={{ borderColor: COLORS.accent }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="brand"
                className="block text-sm font-medium"
                style={{ color: COLORS.text }}
              >
                Brand
              </label>
              <input
                type="text"
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
                style={{ borderColor: COLORS.accent }}
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium"
                style={{ color: COLORS.text }}
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
                style={{ borderColor: COLORS.accent }}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium"
              style={{ color: COLORS.text }}
            >
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
              style={{ borderColor: COLORS.accent }}
            ></textarea>
          </div>

          {/* Image Upload and Preview */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: COLORS.text }}
            >
              Images
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 mb-2">
              {images.map((url) => (
                <div key={url} className="relative aspect-square">
                  <img
                    src={url}
                    alt="Product preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImageHandler(url)}
                    className="absolute -top-2 -right-2 p-1 bg-red-600 rounded-full text-white"
                  >
                    <FiTrash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
            <label
              htmlFor="image-upload"
              className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition"
              style={{ background: COLORS.accent, color: COLORS.text }}
            >
              <FiUpload />
              {imageUploadLoading ? 'Uploading...' : 'Upload New Images'}
            </label>
            <input
              type="file"
              id="image-upload"
              multiple
              onChange={uploadFileHandler}
              className="hidden"
              accept="image/png, image/jpeg, image/webp"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={productUpdateLoading}
              className="w-full flex justify-center items-center px-4 py-3 rounded-lg font-semibold text-white transition"
              style={{ background: COLORS.primary }}
            >
              {productUpdateLoading ? 'Updating...' : 'Update Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

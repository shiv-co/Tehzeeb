import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiUpload, FiTrash2 } from 'react-icons/fi';
import { fetchProductById } from '../redux/productsSlice';
import { updateProduct, uploadProductImages, clearAdminError } from '../redux/adminSlice';

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

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  const [rating, setRating] = useState(4.5);
  const [reviews, setReviews] = useState(0);
  const [isNew, setIsNew] = useState(false);

  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

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
    dispatch(clearAdminError());

    if (!product || product._id !== productId) {
      dispatch(fetchProductById(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setOriginalPrice(product.originalPrice || 0);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
      setImages(product.images || []);

      setRating(product.rating || 4.5);
      setReviews(product.reviews || 0);
      setIsNew(product.isNew || false);

      setColors(product.colors || []);
      setSizes(product.sizes || []);
    }
  }, [dispatch, product, productId]);

  // Auto-calc discount but DO NOT save to backend
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const submitHandler = (e) => {
  e.preventDefault();

  const updatedProduct = {
    name,
    price,
    originalPrice,
    description,
    brand,
    category,
    countInStock,
    images,
    rating,
    reviews,
    isNew,
    colors,
    sizes,
  };

  dispatch(
    updateProduct({
      id: productId,       // MUST BE "id"
      updatedData: updatedProduct,
    })
  )
    .unwrap()
    .then(() => {
      alert("Product updated successfully!");
      navigate("/admin/products");
    })
    .catch((err) => console.error("Failed to update product:", err));
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
        setImages((prev) => [...prev, ...newImageUrls]);
      })
      .catch((err) => console.error('Failed to upload images:', err));
  };

  const removeImageHandler = (urlToRemove) => {
    if (window.confirm('Remove this image?')) {
      setImages(images.filter((url) => url !== urlToRemove));
    }
  };

  if (productLoading === 'pending') return <p>Loading...</p>;
  if (productError) return <p style={{ color: 'red' }}>Error: {productError}</p>;

  return (
  <div className="min-h-screen p-4 md:p-8" style={{ background: COLORS.background }}>
  <div className="max-w-3xl mx-auto">

    {/* Back Button */}
    <Link
      to="/admin/products"
      className="inline-flex items-center gap-1 mb-4 text-sm font-semibold hover:underline"
      style={{ color: COLORS.accent }}
    >
      ← Back to Products
    </Link>

    {/* Page Title */}
    <h1
      className="text-3xl md:text-4xl font-bold mb-8 tracking-wide"
      style={{ color: COLORS.primary }}
    >
      Edit Product
    </h1>

    {/* FORM CONTAINER */}
    <form
      onSubmit={submitHandler}
      className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6 border border-[#E8DCC7]"
    >

      {/* NAME */}
      <div>
        <label className="block font-semibold mb-1" style={{ color: COLORS.text }}>
          Product Name
        </label>
        <input
          className="w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none transition"
          style={{ borderColor: COLORS.accent }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* PRICE SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold mb-1" style={{ color: COLORS.text }}>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none transition"
            style={{ borderColor: COLORS.accent }}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" style={{ color: COLORS.text }}>
            Original Price
          </label>
          <input
            type="number"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none transition"
            style={{ borderColor: COLORS.accent }}
          />
        </div>
      </div>

      {/* DISCOUNT INFO */}
      <p className="text-sm font-semibold mt-1 text-green-700">
        Discount: {discount}% (Auto-calculated)
      </p>

      {/* BRAND & CATEGORY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div>
          <label className="block font-semibold mb-1">Brand</label>
          <input
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none transition"
            style={{ borderColor: COLORS.accent }}
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Category</label>
          <input
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none transition"
            style={{ borderColor: COLORS.accent }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>

      {/* STOCK */}
      <div>
        <label className="block font-semibold mb-1">Stock Quantity</label>
        <input
          type="number"
          value={countInStock}
          onChange={(e) => setCountInStock(Number(e.target.value))}
          className="w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none transition"
          style={{ borderColor: COLORS.accent }}
        />
      </div>

      {/* RATING + REVIEWS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold mb-1">Rating</label>
          <input
            type="number"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none transition"
            style={{ borderColor: COLORS.accent }}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Reviews</label>
          <input
            type="number"
            value={reviews}
            onChange={(e) => setReviews(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none transition"
            style={{ borderColor: COLORS.accent }}
          />
        </div>
      </div>

      {/* IS NEW CHECKBOX */}
      <label className="flex items-center gap-2 font-medium cursor-pointer">
        <input
          type="checkbox"
          checked={isNew}
          onChange={(e) => setIsNew(e.target.checked)}
          className="w-4 h-4"
        />
        Mark as <span className="font-semibold">New Arrival</span>
      </label>

      {/* COLORS */}
      <div>
        <label className="block font-semibold mb-1">Available Colors</label>
        <input
          className="w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none transition"
          style={{ borderColor: COLORS.accent }}
          value={colors.join(', ')}
          onChange={(e) => setColors(e.target.value.split(',').map((c) => c.trim()))}
        />
      </div>

      {/* SIZES */}
      <div>
        <label className="block font-semibold mb-1">Available Sizes</label>
        <input
          className="w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none transition"
          style={{ borderColor: COLORS.accent }}
          value={sizes.join(', ')}
          onChange={(e) => setSizes(e.target.value.split(',').map((c) => c.trim()))}
        />
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="block font-semibold mb-1">Description</label>
        <textarea
          rows="4"
          className="w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none transition resize-none"
          style={{ borderColor: COLORS.accent }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* IMAGE UPLOAD */}
      <div>
        <label className="block font-semibold mb-2">Product Images</label>

        {/* Image Previews */}
        <div className="grid grid-cols-4 gap-3 mb-3">
          {images.map((url) => (
            <div key={url} className="relative">
              <img
                src={url}
                className="w-full h-24 object-cover rounded-lg border shadow-sm"
                style={{ borderColor: COLORS.accent }}
              />
              <button
                onClick={() => removeImageHandler(url)}
                className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full shadow"
              >
                <FiTrash2 size={12} />
              </button>
            </div>
          ))}
        </div>

        {/* Upload Button */}
        <label
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer font-medium shadow-md hover:opacity-90 transition"
          style={{ background: COLORS.secondary, color: COLORS.text }}
        >
          <FiUpload />
          {imageUploadLoading ? 'Uploading...' : 'Upload Images'}
          <input type="file" multiple className="hidden" onChange={uploadFileHandler} />
        </label>
      </div>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        className="w-full py-3 rounded-lg text-white font-semibold text-lg shadow-lg hover:opacity-90 transition"
        style={{ background: COLORS.primary }}
      >
        {productUpdateLoading ? 'Updating...' : 'Update Product'}
      </button>
    </form>
  </div>
</div>

  );
}

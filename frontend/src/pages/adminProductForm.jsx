import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createProduct, updateProduct } from "../redux/adminSlice";
import { toast } from "react-toastify";
import { FiUpload, FiTrash2 } from "react-icons/fi";

const COLORS = {
  primary: "#B3541E",
  secondary: "#D6A74F",
  accent: "#A5A58D",
  text: "#3E2F1C",
  background: "#FFF8F3",
};

const ProductForm = ({ existingProduct, onSuccess }) => {
  const dispatch = useDispatch();
  const isEditMode = !!existingProduct;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    brand: "",
    category: "",
    stock: "",
    rating: "",
    reviews: "",
    isNew: false,
    images: [],
    colors: [],
    sizes: [],
  });

  // AUTO-CALCULATED DISCOUNT
  const discount =
    formData.originalPrice && formData.price
      ? Math.round(
          ((formData.originalPrice - formData.price) /
            formData.originalPrice) *
            100
        )
      : 0;

  useEffect(() => {
    if (isEditMode && existingProduct) {
      setFormData({
        name: existingProduct.name || "",
        description: existingProduct.description || "",
        price: existingProduct.price || "",
        originalPrice: existingProduct.originalPrice || "",
        brand: existingProduct.brand || "",
        category: existingProduct.category || "",
        stock: existingProduct.countInStock || "",
        rating: existingProduct.rating || "",
        reviews: existingProduct.reviews || "",
        isNew: existingProduct.isNew || false,
        images: existingProduct.images || [],
        colors: existingProduct.colors || [],
        sizes: existingProduct.sizes || [],
      });
    }
  }, [existingProduct, isEditMode]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, checked, files } = e.target;

    if (name === "images" && files.length > 0) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      setFormData({ ...formData, images: [...formData.images, ...newImages] });
      return;
    }

    if (name === "isNew") {
      setFormData({ ...formData, isNew: checked });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  // Remove image
  const removeImage = (img) => {
    if (window.confirm("Remove this image?")) {
      setFormData({
        ...formData,
        images: formData.images.filter((i) => i !== img),
      });
    }
  };

  // Submit handling
  const handleSubmit = (e) => {
    e.preventDefault();

    const sendData = {
      ...formData,
      countInStock: formData.stock,
    };

    if (isEditMode) {
      dispatch(updateProduct({ id: existingProduct._id, updatedData: sendData }))
        .unwrap()
        .then(() => {
          toast.success("Product updated successfully!");
          if (onSuccess) onSuccess();
        })
        .catch(() => toast.error("Error updating product"));
    } else {
      dispatch(createProduct(sendData))
        .unwrap()
        .then(() => {
          toast.success("Product created successfully!");
          if (onSuccess) onSuccess();
        })
        .catch(() => toast.error("Error creating product"));
    }
  };

  return (
    <div
      className="max-w-3xl mx-auto shadow-xl rounded-2xl p-8 border mt-6"
      style={{ background: COLORS.background, borderColor: "#EADBC8" }}
    >
      <h2
        className="text-3xl font-bold text-center mb-8"
        style={{ color: COLORS.primary }}
      >
        {isEditMode ? "Edit Product" : "Create Product"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* PRODUCT NAME */}
        <div>
          <label className="block font-semibold mb-1" style={{ color: COLORS.text }}>
            Product Name
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 shadow-sm"
            style={{ borderColor: COLORS.accent }}
          />
        </div>

        {/* PRICE SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 shadow-sm"
              style={{ borderColor: COLORS.accent }}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Original Price</label>
            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 shadow-sm"
              style={{ borderColor: COLORS.accent }}
            />
          </div>
        </div>

        <p className="text-green-700 font-semibold text-sm">
          Discount: {discount}% (auto-calculated)
        </p>

        {/* BRAND / CATEGORY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            name="brand"
            placeholder="Brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 shadow-sm"
            style={{ borderColor: COLORS.accent }}
          />
          <input
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 shadow-sm"
            style={{ borderColor: COLORS.accent }}
          />
        </div>

        {/* STOCK */}
        <div>
          <label className="block font-semibold mb-1">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 shadow-sm"
            style={{ borderColor: COLORS.accent }}
          />
        </div>

        {/* RATING + REVIEWS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            name="rating"
            type="number"
            step="0.1"
            placeholder="Rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 shadow-sm"
            style={{ borderColor: COLORS.accent }}
          />
          <input
            name="reviews"
            type="number"
            placeholder="Reviews Count"
            value={formData.reviews}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 shadow-sm"
            style={{ borderColor: COLORS.accent }}
          />
        </div>

        {/* IS NEW */}
        <label className="flex items-center gap-2 font-medium mb-2">
          <input
            type="checkbox"
            name="isNew"
            checked={formData.isNew}
            onChange={handleChange}
          />
          Mark as New Arrival
        </label>

        {/* COLORS */}
        <div>
          <label className="block font-semibold mb-1">Colors (comma separated)</label>
          <input
            name="colors"
            value={formData.colors.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                colors: e.target.value.split(",").map((c) => c.trim()).filter((s) => s !== ""),
              })
            }
            className="w-full border rounded-lg p-3 shadow-sm"
            style={{ borderColor: COLORS.accent }}
          />
        </div>

        {/* SIZES */}
        <div>
          <label className="block font-semibold mb-1">Sizes (comma separated)</label>
          <input
            name="sizes"
            value={formData.sizes.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                sizes: e.target.value.split(",").map((s) => s.trim()).filter((s) => s !== ""),
              })
            }
            className="w-full border rounded-lg p-3 shadow-sm"
            style={{ borderColor: COLORS.accent }}
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 shadow-sm resize-none"
            style={{ borderColor: COLORS.accent }}
          />
        </div>

        {/* IMAGE UPLOAD */}
        <div>
          <label className="block font-semibold mb-2">Product Images</label>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-2">
            {formData.images.map((img) => (
              <div key={img} className="relative">
                <img
                  src={img}
                  className="w-full h-24 object-cover rounded-lg border"
                  style={{ borderColor: COLORS.accent }}
                />
                <button
                  onClick={() => removeImage(img)}
                  className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full"
                >
                  <FiTrash2 size={12} />
                </button>
              </div>
            ))}
          </div>

          <label
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer font-medium shadow-md"
            style={{ background: COLORS.secondary, color: COLORS.text }}
          >
            <FiUpload /> Upload Images
            <input type="file" multiple name="images" className="hidden" onChange={handleChange} />
          </label>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg text-white font-semibold text-lg shadow-lg"
          style={{ background: COLORS.primary }}
        >
          {isEditMode ? "Update Product" : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createProduct, updateProduct } from "../redux/adminSlice";
import { toast } from 'react-toastify';

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
    category: "",
    brand: "",
    image: "",
    stock: "",
  });

  useEffect(() => {
    if (isEditMode && existingProduct) {
      setFormData({
        name: existingProduct.name || "",
        description: existingProduct.description || "",
        price: existingProduct.price || "",
        category: existingProduct.category || "",
        brand: existingProduct.brand || "",
        image: existingProduct.image || "",
        stock: existingProduct.stock || "",
      });
    }
  }, [isEditMode, existingProduct]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation before sending to backend
    if (!formData.name || !formData.brand || !formData.category || !formData.description) {
      alert("Please fill in all required fields.");
      return;
    }

    if (isEditMode) {
      dispatch(updateProduct({ id: existingProduct._id, updatedData: formData }))
        .unwrap()
        .then(() => {
          toast.success("Product updated successfully!");
          if (onSuccess) onSuccess();
        })
        .catch((err) => console.error("Error updating product:", err));
    } else {
      dispatch(createProduct(formData))
        .unwrap()
        .then(() => {
          toast.success("Product created successfully!");
          setFormData({
            name: "",
            description: "",
            price: "",
            category: "",
            brand: "",
            image: "",
            stock: "",
          });
          if (onSuccess) onSuccess();
        })
        .catch((err) => console.error("Error creating product:", err));
    }
  };

  return (
    <div
      className="max-w-3xl mx-auto shadow-lg rounded-2xl p-8 border"
      style={{
        background: COLORS.background,
        borderColor: "#EADBC8",
      }}
    >
      <h2
        className="text-2xl font-semibold text-center mb-6"
        style={{ color: COLORS.primary }}
      >
        {isEditMode ? "Edit Product" : "Create New Product"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Product Name */}
        <div>
          <label className="block font-medium mb-1" style={{ color: COLORS.text }}>
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-[#EADBC8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#C8A97E]"
          />
        </div>

        {/* Brand */}
        <div>
          <label className="block font-medium mb-1" style={{ color: COLORS.text }}>
            Brand
          </label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="e.g., Tehzeeb"
            required
            className="w-full border border-[#EADBC8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#C8A97E]"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1" style={{ color: COLORS.text }}>
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="3"
            className="w-full border border-[#EADBC8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#C8A97E]"
          />
        </div>

        {/* Price & Stock */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1" style={{ color: COLORS.text }}>
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full border border-[#EADBC8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#C8A97E]"
            />
          </div>
          <div>
            <label className="block font-medium mb-1" style={{ color: COLORS.text }}>
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              className="w-full border border-[#EADBC8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#C8A97E]"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1" style={{ color: COLORS.text }}>
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g., Sarees, Kurtis, Lehenga, Dupatta"
            required
            className="w-full border border-[#EADBC8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#C8A97E]"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium mb-1" style={{ color: COLORS.text }}>
            Product Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border border-[#EADBC8] rounded-lg p-2"
          />
          {formData.image && (
            <div className="mt-3">
              <img
                src={formData.image}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-md border border-[#EADBC8]"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg font-semibold text-white transition duration-300"
          style={{
            backgroundColor: COLORS.primary,
            boxShadow: "0 4px 10px rgba(179, 84, 30, 0.2)",
          }}
        >
          {isEditMode ? "Update Product" : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;

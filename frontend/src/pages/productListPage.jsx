import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";
import { fetchProducts } from "../redux/productsSlice";
import { createProduct, deleteProduct } from "../redux/adminSlice";

const COLORS = {
  primary: "#B3541E",
  secondary: "#D6A74F",
  accent: "#A5A58D",
  text: "#3E2F1C",
  background: "#F5EBDD",
};

export default function ProductListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);

  const {
    productDeleteLoading,
    productCreateLoading,
    error: adminError,
  } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Delete Handler
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id))
        .unwrap()
        .then(() => dispatch(fetchProducts()))
        .catch((err) => console.log(err));
    }
  };

  // Create Handler
  const createHandler = async () => {
    if (window.confirm("Create a new blank product?")) {
      try {
        const newProduct = await dispatch(createProduct()).unwrap();
        navigate(`/admin/product/${newProduct._id}/edit`);
      } catch (e) {
        alert("Error creating product");
      }
    }
  };

  return (
    <div
      className="min-h-screen p-4 md:p-8"
      style={{ background: COLORS.background }}
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <Link
            to="/admin/dashboard"
            className="inline-block mb-4 text-sm font-semibold"
            style={{ color: COLORS.accent }}
          >
            ← Go Back
          </Link>

          <h1 className="text-3xl font-bold" style={{ color: COLORS.primary }}>
            Manage Products
          </h1>

          <button
            onClick={createHandler}
            disabled={productCreateLoading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition"
            style={{ background: COLORS.primary }}
          >
            <FiPlus size={18} />
            {productCreateLoading ? "Creating..." : "Create Product"}
          </button>
        </div>

        {/* Errors */}
        {loading === "pending" && <p>Loading products...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}
        {adminError && (
          <p className="text-red-600">Admin Error: {adminError}</p>
        )}

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead style={{ background: COLORS.background }}>
              <tr>
                {[
                  "Image",
                  "Name",
                  "Price",
                  "Original",
                  "Discount",
                  "Rating",
                  "Stock",
                  "Category",
                  "Brand",
                  "Colors",
                  "Sizes",
                  "New?",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase"
                    style={{ color: COLORS.text }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product._id}>
                  {/* IMAGE */}
                  <td className="px-4 py-3">
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md border"
                    />
                  </td>

                  {/* NAME */}
                  <td className="px-4 py-3 font-semibold">{product.name}</td>

                  {/* PRICE */}
                  <td className="px-4 py-3 font-bold text-green-700">
                    ₹{product.price}
                  </td>

                  {/* ORIGINAL PRICE */}
                  <td className="px-4 py-3 line-through text-gray-500">
                    {product.originalPrice ? `₹${product.originalPrice}` : "-"}
                  </td>

                  {/* DISCOUNT */}
                  <td className="px-4 py-3 font-semibold text-red-600">
                    {product.originalPrice && product.price
                      ? `${Math.round(
                          ((product.originalPrice - product.price) /
                            product.originalPrice) *
                            100
                        )}%`
                      : "-"}
                  </td>

                  {/* RATING */}
                  <td className="px-4 py-3">⭐ {product.rating || 0}</td>

                  {/* STOCK */}
                  <td className="px-4 py-3">{product.countInStock}</td>

                  {/* CATEGORY */}
                  <td className="px-4 py-3">{product.category}</td>

                  {/* BRAND */}
                  <td className="px-4 py-3">{product.brand}</td>

                  {/* COLORS */}
                  <td className="px-4 py-3 text-xs">
                    {product.colors?.length
                      ? product.colors.join(", ")
                      : "-"}
                  </td>

                  {/* SIZES */}
                  <td className="px-4 py-3 text-xs">
                    {product.sizes?.length
                      ? product.sizes.join(", ")
                      : "-"}
                  </td>

                  {/* NEW BADGE */}
                  <td className="px-4 py-3">
                    {product.isNew ? (
                      <span className="bg-green-200 text-green-700 text-xs px-2 py-1 rounded-md">
                        NEW
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>

                  {/* ACTION BUTTONS */}
                  <td className="px-4 py-3 flex gap-3">
                    <Link
                      to={`/admin/product/${product._id}/edit`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FiEdit size={18} />
                    </Link>

                    <button
                      onClick={() => deleteHandler(product._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

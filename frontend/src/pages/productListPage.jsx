import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { fetchProducts } from '../redux/productsSlice';
import { createProduct, deleteProduct } from '../redux/adminSlice';

// Brand Color Palette
const COLORS = {
  primary: '#B3541E',
  secondary: '#D6A74F',
  accent: '#A5A58D',
  text: '#3E2F1C',
  background: '#F5EBDD',
};

export default function ProductListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: products, loading, error } = useSelector(
    (state) => state.products
  );
  const {
    productDeleteLoading,
    productCreateLoading,
    error: adminError,
  } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Delete Product Handler
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id))
        .unwrap()
        .then(() => {
          dispatch(fetchProducts());
        })
        .catch((err) => console.error('Failed to delete product: ', err));
    }
  };

  // Create Product Handler
  const createHandler = async () => {
    if (window.confirm('Do you want to create a new blank product?')) {
      try {
        const newProduct = await dispatch(createProduct()).unwrap();
        // Navigate to Edit Page for the newly created product
        navigate(`/admin/product/${newProduct._id}/edit`);
      } catch (error) {
        console.error('Failed to create product:', error);
        alert('Error creating product. Please try again.');
      }
    }
  };

  return (
    <div
      className="min-h-screen p-4 md:p-8"
      style={{ background: COLORS.background }}
    >
      <div className="max-w-7xl mx-auto xl:max-w-[1440px] 2xl:max-w-[1720px]">
        {/* HEADER SECTION */}
        <div className="flex justify-between items-center mb-6">
          <Link
                    to="/admin/dashboard"
                    className="inline-block mb-4 text-sm font-semibold"
                    style={{ color: COLORS.accent }}
                  >
                    &larr; Go Back to Admin Dashboard
                  </Link>
          <h1 className="text-lg  md:text-4xl font-bold mb-8" style={{ color: COLORS.primary }}>
            Manage Products
          </h1>

          <button
            onClick={createHandler}
            disabled={productCreateLoading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition-all duration-300"
            style={{
              background: COLORS.primary,
              boxShadow: '0 4px 6px rgba(0,0,0,0.15)',
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.background = COLORS.secondary)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background = COLORS.primary)
            }
          >
            <FiPlus size={18} />
            {productCreateLoading ? 'Creating...' : 'Create Product'}
          </button>
        </div>

        {/* STATUS MESSAGES */}
        {loading === 'pending' && <p>Loading products...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {adminError && <p style={{ color: 'red' }}>Admin Error: {adminError}</p>}
        {productDeleteLoading && <p>Deleting product...</p>}

        {/* PRODUCTS TABLE */}
        <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead style={{ background: COLORS.background }}>
              <tr>
                {['Image','ID', 'Name', 'Price', 'Quantity', 'Category', 'Brand', 'Actions'].map(
                  (header) => (
                    <th
                      key={header}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: COLORS.text }}
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody
              className="bg-white divide-y divide-gray-200"
              style={{ color: COLORS.text }}
            >
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md border border-[#EAD8C0]"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {product._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    ₹{product.price.toLocaleString()}
                  </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {product.countInStock.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {product.brand}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                    <Link
                      to={`/admin/product/${product._id}/edit`}
                      className="inline-flex items-center p-2 rounded-md transition"
                      style={{ color: COLORS.primary }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.background = COLORS.background)
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.background = 'transparent')
                      }
                    >
                      <FiEdit size={18} />
                    </Link>
                    <button
                      onClick={() => deleteHandler(product._id)}
                      className="inline-flex items-center p-2 rounded-md transition"
                      style={{ color: COLORS.secondary }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.background = COLORS.background)
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.background = 'transparent')
                      }
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

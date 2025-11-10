import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { data } from 'react-router-dom';

// Get user info from auth state to include token
const getToken = (getState) => {
  const { userInfo } = getState().auth;
  return userInfo ? userInfo.token : null;
};

// Helper function to create auth config
const getAuthConfig = (getState) => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken(getState)}`,
  },
});

// --- API URLs ---
// const API_URL = 'https://tehzeeb-m4q8.vercel.app/api';
const API_URL = 'https://tehzeeb.onrender.com/api';
// const API_URL = 'http://localhost:5000/api';

// --- Async Thunk for Fetching All Users ---
export const fetchUsers = createAsyncThunk(
  'admin/fetchUsers',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { data } = await axios.get(
        `${API_URL}/users`,
        getAuthConfig(getState)
      );
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// --- NEW: Async Thunk for Creating a Product ---
// --- NEW: Async Thunk for Creating a Product ---
export const createProduct = createAsyncThunk(
  'admin/createProduct',
  async (_, { getState, rejectWithValue }) => {
    try {
      const config = getAuthConfig(getState);

      // Send a default product with all required fields
      const defaultProduct = {
        name: 'New Ethnic Wear',
        price: 0,
        description: 'Add a detailed description for this product',
        brand: 'Tehzeeb Creations',
        category: 'Women Ethnic Wear',
        countInStock: 0,
        images: [], // You can upload images later from edit page
      };

      const { data } = await axios.post(`${API_URL}/products`, defaultProduct, config);
      console.log('Product created:', data);

      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      console.error('Failed to create product:', message);
      return rejectWithValue(message);
    }
  }
);


// --- NEW: Async Thunk for Deleting a Product ---
export const deleteProduct = createAsyncThunk(
  'admin/deleteProduct',
  async (productId, { getState, rejectWithValue }) => {
    try {
      await axios.delete(
        `${API_URL}/products/${productId}`,
        getAuthConfig(getState)
      );
      return productId; // Return the ID of the deleted product
    } catch (error) {
      const message =
        error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// --- NEW: Async Thunk for Updating a Product ---
export const updateProduct = createAsyncThunk(
  'admin/updateProduct',
  async (productData, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${API_URL}/products/${productData._id}`,
        productData,
        getAuthConfig(getState)
      );
      console.log(data)
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// --- NEW: Async Thunk for Uploading Product Images ---
export const uploadProductImages = createAsyncThunk(
  'admin/uploadProductImages',
  async (formData, { getState, rejectWithValue }) => {
    // We use 'Content-Type': 'multipart/form-data' for file uploads
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getToken(getState)}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${API_URL}/upload`,
        formData,
        config
      );
      return data.images; // Returns an array of Cloudinary URLs
    } catch (error) {
      const message =
        error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// Define the initial state
const initialState = {
  users: [],
  userListLoading: 'idle',
  userListError: null,

  // NEW: States for product management
  productDeleteLoading: false,
  productCreateLoading: false,
  productUpdateLoading: false, // <-- NEW
  imageUploadLoading: false, // <-- NEW
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    // Reducer to clear errors if needed
    clearAdminError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Cases for fetchUsers
      .addCase(fetchUsers.pending, (state) => {
        state.userListLoading = 'pending';
        state.userListError = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.userListLoading = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.userListLoading = 'failed';
        state.userListError = action.payload;
      })

      // --- NEW: Cases for Delete Product ---
      .addCase(deleteProduct.pending, (state) => {
        state.productDeleteLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.productDeleteLoading = false;
        // Note: We refresh the list from the component
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.productDeleteLoading = false;
        state.error = action.payload;
      })
      
      // --- NEW: Cases for Create Product ---
      .addCase(createProduct.pending, (state) => {
        state.productCreateLoading = true;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.productCreateLoading = false;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.productCreateLoading = false;
        state.error = action.payload;
      })

      // --- NEW: Cases for Update Product ---
      .addCase(updateProduct.pending, (state) => {
        state.productUpdateLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.productUpdateLoading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.productUpdateLoading = false;
        state.error = action.payload;
      })

      // --- NEW: Cases for Image Upload ---
      .addCase(uploadProductImages.pending, (state) => {
        state.imageUploadLoading = true;
      })
      .addCase(uploadProductImages.fulfilled, (state) => {
        state.imageUploadLoading = false;
      })
      .addCase(uploadProductImages.rejected, (state, action) => {
        state.imageUploadLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAdminError } = adminSlice.actions;
export default adminSlice.reducer;


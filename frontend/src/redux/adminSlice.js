// adminSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ---------------- GET TOKEN ----------------
const getToken = (getState) => {
  const { userInfo } = getState().auth;
  return userInfo ? userInfo.token : null;
};

// -------------- AUTH HEADERS ---------------
const getAuthConfig = (getState) => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken(getState)}`,
  },
});

// ---------------- API URL ------------------
const API_URL = "https://tehzeeb-pi47.vercel.app/api/";
// const API_URL = "http://localhost:5000/api";

// -------------------------------------------------
//                FETCH USERS (ADMIN)
// -------------------------------------------------
export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { data } = await axios.get(
        `${API_URL}/users`,
        getAuthConfig(getState)
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// -------------------------------------------------
//                CREATE PRODUCT
// -------------------------------------------------
export const createProduct = createAsyncThunk(
  "admin/createProduct",
  async (_, { getState, rejectWithValue }) => {
    try {
      const config = getAuthConfig(getState);

      // Default empty product with NEW FIELDS
      const defaultProduct = {
        name: "New Product",
        price: 0,
        originalPrice: 0,
        description: "Add product description",
        brand: "Brand",
        category: "Ethnic Wear",
        countInStock: 0,
        images: [],
        rating: 0,
        reviews: 0,
        isNew: false,
        colors: [],
        sizes: [],
      };

      const { data } = await axios.post(
        `${API_URL}/products`,
        defaultProduct,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// -------------------------------------------------
//                DELETE PRODUCT
// -------------------------------------------------
export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (productId, { getState, rejectWithValue }) => {
    try {
      await axios.delete(
        `${API_URL}/products/${productId}`,
        getAuthConfig(getState)
      );
      return productId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// -------------------------------------------------
//                UPDATE PRODUCT  (FIXED)
// -------------------------------------------------
export const updateProduct = createAsyncThunk(
  "admin/updateProduct",
  async ({ id, updatedData }, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${API_URL}/products/${id}`,
        updatedData,
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


// -------------------------------------------------
//                UPLOAD IMAGES
// -------------------------------------------------
export const uploadProductImages = createAsyncThunk(
  "admin/uploadProductImages",
  async (formData, { getState, rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken(getState)}`,
        },
      };

      const { data } = await axios.post(`${API_URL}/upload`, formData, config);

      return data.images; // Array of Cloudinary URLs
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// -------------------------------------------------
//                       SLICE
// -------------------------------------------------
const initialState = {
  users: [],
  userListLoading: "idle",
  userListError: null,

  // Product states
  productDeleteLoading: false,
  productCreateLoading: false,
  productUpdateLoading: false,
  imageUploadLoading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearAdminError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // FETCH USERS
      .addCase(fetchUsers.pending, (state) => {
        state.userListLoading = "pending";
        state.userListError = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.userListLoading = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.userListLoading = "failed";
        state.userListError = action.payload;
      })

      // CREATE PRODUCT
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

      // DELETE PRODUCT
      .addCase(deleteProduct.pending, (state) => {
        state.productDeleteLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.productDeleteLoading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.productDeleteLoading = false;
        state.error = action.payload;
      })

      // UPDATE PRODUCT (FIXED)
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

      // UPLOAD PRODUCT IMAGES
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

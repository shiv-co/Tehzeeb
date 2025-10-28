import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // <-- 1. Import axios

// Get user info from localStorage (if they were logged in before)
const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userInfo,
  loading: false,
  error: null,
};

// --- Async Thunk for Registration (using axios) ---
export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      // 2. Set config for POST request
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // 3. Make POST request with axios - UPDATED for CORS
      const { data } = await axios.post(
        // 'http://localhost:5000/api/users/register',
        "https://tehzeeb-m4q8-hawxh3zvr-shivam-singhs-projects-e9ef9bb8.vercel.app/api/users",
        // "https://tehzeeb-m4q8-msedqhuwf-shivam-singhs-projects-e9ef9bb8.vercel.app/api/users",
         // <-- Use full URL
        { name, email, password },
        config
      );

      // Save user to localStorage
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (error) {
      // 4. Handle axios-specific errors
      const message =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(message);
    }
  }
);

// --- Async Thunk for Login (using axios) ---
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // UPDATED for CORS and with correct endpoint
      const { data } = await axios.post(
        // 'http://localhost:5000/api/users/login',
        // "https://tehzeeb-m4q8-msedqhuwf-shivam-singhs-projects-e9ef9bb8.vercel.app/api/users/login",
        "https://tehzeeb-m4q8-hawxh3zvr-shivam-singhs-projects-e9ef9bb8.vercel.app/api/users/login", // <-- Use full URL and /login
        { email, password },
        config
      );

      // Save user to localStorage
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
      // Note: We'll also need to hit a backend /logout route to clear the cookie
    },
  },
  extraReducers: (builder) => {
    builder
      // Register cases (no change here)
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login cases (no change here)
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;


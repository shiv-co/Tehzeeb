import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../redux/productsSlice.js';
import cartReducer from "../redux/cartSlice.js"
import authReducer from "../redux/authSlice.js"
import adminReducer from '../redux/adminSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
    admin: adminReducer
  },
});

export default store;
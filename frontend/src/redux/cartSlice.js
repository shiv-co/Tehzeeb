import { createSlice } from '@reduxjs/toolkit';

// Function to get cart from localStorage
const getInitialCart = () => {
  try {
    const cart = localStorage.getItem('cart');
    if (cart) {
      return JSON.parse(cart);
    }
  } catch (e) {
    console.error('Failed to parse cart from localStorage', e);
  }
  // Return default state if empty or error
  return {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
  };
};

const initialState = getInitialCart();

// Helper function to update state and localStorage
const updateStateAndStorage = (state) => {
  // Recalculate totals
  let totalQuantity = 0;
  let totalAmount = 0;
  state.cartItems.forEach((item) => {
    totalQuantity += item.quantity;
    totalAmount += item.quantity * item.price;
  });

  state.cartTotalQuantity = totalQuantity;
  state.cartTotalAmount = totalAmount;

  // Save to localStorage
  localStorage.setItem('cart', JSON.stringify(state));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // This is the main fix
    addToCart(state, action) {
      const product = action.payload; // This is the product from ProductCard
      const existingItem = state.cartItems.find(
        (item) => item.id === product._id
      );

      if (existingItem) {
        // If item already in cart, increase quantity
        existingItem.quantity += 1;
      } else {
        // --- THIS IS THE FIX ---
        // Create a new cartItem object with the correct structure
        state.cartItems.push({
          id: product._id, // Map _id to id
          name: product.name,
          price: product.price,
          image: product.images[0], // <-- Get the *first image* from the array
          quantity: 1,
        });
      }
      // Recalculate totals and save to localStorage
      updateStateAndStorage(state);
    },

    removeFromCart(state, action) {
      const itemIdToRemove = action.payload; // This is item.id
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== itemIdToRemove
      );
      // Recalculate totals and save to localStorage
      updateStateAndStorage(state);
    },

    // You can add these later for quantity buttons
    decreaseQuantity(state, action) {
      const itemToDecrease = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (itemToDecrease.quantity > 1) {
        itemToDecrease.quantity -= 1;
      } else {
        // If quantity is 1, remove it
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      }
      updateStateAndStorage(state);
    },

    increaseQuantity(state, action) {
      const itemToIncrease = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (itemToIncrease) {
        itemToIncrease.quantity += 1;
      }
      updateStateAndStorage(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;


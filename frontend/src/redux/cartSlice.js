import { createSlice } from '@reduxjs/toolkit';

// Helper function to update totals
const updateCart = (state) => {
  state.totalItems = state.cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  state.totalPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  
  // Save to local storage
  localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
  return state;
};

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  totalItems: 0,
  totalPrice: 0,
};

// Recalculate initial totals
const initialTotals = initialState.cartItems.reduce(
  (acc, item) => {
    acc.totalItems += item.quantity;
    acc.totalPrice += item.price * item.quantity;
    return acc;
  },
  { totalItems: 0, totalPrice: 0 }
);

initialState.totalItems = initialTotals.totalItems;
initialState.totalPrice = initialTotals.totalPrice;


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // payload will be an object: { ...product, qty: 3 }
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item._id === newItem._id
      );

      if (existingItem) {
        // If item exists, update its quantity
        existingItem.quantity = newItem.quantity;
      } else {
        // Otherwise, add it as a new item
        // Note: productCard sends a product, details page sends { ...product, qty }
        // We need to handle both.
        state.cartItems.push({
          ...newItem,
          quantity: newItem.quantity || 1, // Default to 1 if no qty is passed
        });
      }
      // Update totals
      updateCart(state);
    },

    // payload will be just the item's _id
    removeFromCart(state, action) {
      const itemIdToRemove = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== itemIdToRemove
      );
      // Update totals
      updateCart(state);
    },
    
    // payload will be { _id, quantity }
    updateCartQuantity(state, action) {
      const { _id, quantity } = action.payload;
      const itemToUpdate = state.cartItems.find((item) => item._id === _id);

      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
      updateCart(state);
    },

    clearCart(state) {
      state.cartItems = [];
      updateCart(state);
    },
  },
});

export const { addToCart, removeFromCart, updateCartQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

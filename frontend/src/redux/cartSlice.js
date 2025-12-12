import { createSlice } from "@reduxjs/toolkit";

const getInitialCart = () => {
  try {
    const cart = localStorage.getItem("cart");
    if (cart) return JSON.parse(cart);
  } catch (e) {
    console.error("Failed to parse cart", e);
  }

  return {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
  };
};

const initialState = {
  ...getInitialCart(),
  buyNowItem: null,
};

const updateTotals = (state) => {
  state.cartTotalQuantity = state.cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  state.cartTotalAmount = state.cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  localStorage.setItem("cart", JSON.stringify(state));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const p = action.payload;

      const existingItem = state.cartItems.find(
        (item) => item.product === p._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({
          product: p._id,              // ALWAYS store product ID here
          name: p.name,
          image: p.images?.[0] || "",
          price: p.price,
          quantity: 1,
        });
      }

      updateTotals(state);
    },

    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.product !== action.payload
      );
      updateTotals(state);
    },

    increaseQuantity(state, action) {
      const item = state.cartItems.find(
        (i) => i.product === action.payload
      );
      if (item) item.quantity += 1;
      updateTotals(state);
    },

    decreaseQuantity(state, action) {
      const item = state.cartItems.find(
        (i) => i.product === action.payload
      );

      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(
          (i) => i.product !== action.payload
        );
      }

      updateTotals(state);
    },

    clearCart(state) {
      state.cartItems = [];
      updateTotals(state);
    },

    setBuyNowItem(state, action) {
      const p = action.payload;
      state.buyNowItem = {
        product: p._id,
        name: p.name,
        image: p.images?.[0],
        price: p.price,
        quantity: 1,
      };
    },

    clearBuyNowItem(state) {
      state.buyNowItem = null;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  setBuyNowItem,
  clearBuyNowItem,
} = cartSlice.actions;

export default cartSlice.reducer;

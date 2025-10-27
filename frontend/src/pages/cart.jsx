import React from "react";
// 1. IMPORT useSelector, useDispatch
import { useSelector, useDispatch } from "react-redux";
// 2. IMPORT the new 'removeFromCart' action
import { removeFromCart } from "../redux/cartSlice"; // <-- Check this path!

// Color Theme
const COLORS = {
  primary: "#B3541E",      // Terracotta
  secondary: "#D6A74F",    // Mustard Gold
  accent: "#A5A58D",       // Sage Green
  text: "#3E2F1C",         // Deep Brown
  background: "#F5EBDD",   // Linen / Sand
};
export default function CartPage() {
  // 3. GET dispatch function
  const dispatch = useDispatch();
  
  // Get cart items from Redux store
  const { cartItems } = useSelector((state) => state.cart);

  // Calculate total
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 4. CREATE handler function
  const handleRemove = (id) => {
    dispatch(removeFromCart(id)); // Dispatch the action with the item's id
  };

  return (
    <div className="min-h-screen flex shadow-2xl shadow-[#D6A74F]/40 flex-col items-center py-8 px-2 bg-[#F5EBDD]">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-[#B3541E] mb-8 text-center">
          My Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center text-[#3E2F1C] text-lg">
            Your cart is empty.
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-center gap-4 border-b pb-4"
                >
                  {/* THIS WILL WORK NOW because 'item.image' exists */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md shadow"
                  />
                  <div className="flex-1 flex flex-col items-start">
                    {/* THIS WILL WORK NOW because 'item.name' exists */}
                    <div className="font-bold text-[#3E2F1C] text-lg mb-1">
                      {item.name}
                    </div>
                    {/* (Add color/size later if you need them) */}
                    <div className="flex items-center gap-3">
                      <span className="text-[#B3541E] font-semibold">
                        ₹ {item.price.toLocaleString()}
                      </span>
                      <span className="mx-2 text-[#A5A58D]">×</span>
                      <span className="text-[#3E2F1C]">{item.quantity}</span>
                    </div>
                  </div>
                  
                  {/* 5. ADD the onClick to the button */}
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-[#D6A74F] font-semibold hover:text-[#B3541E] transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="mt-8 flex flex-col items-center justify-between gap-6">
              <div className="text-xl font-bold text-[#B3541E]">
                Total: ₹ {total.toLocaleString()}
              </div>
              <a
                href="/checkout"
                className="px-8 py-3 rounded-lg text-lg bg-[#B3541E] text-white font-bold hover:bg-[#D6A74F] transition shadow"
              >
                Proceed to Checkout
              </a>
              <a
                href="/shop"
                className="px-8 py-3 rounded-lg bg-[#B3541E] text-white font-bold hover:bg-[#D6A74F] transition shadow"
              >
                Continue to Shopping
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
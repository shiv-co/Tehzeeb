import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from '../redux/cartSlice'; // <-- Check this path!
import { Link } from 'react-router-dom';

// Color Theme

export default function CartPage() {
  const dispatch = useDispatch();

  // Get cart items AND the calculated total from the Redux store
  const { cartItems, cartTotalAmount } = useSelector((state) => state.cart);

  // Handler function for removing
  const handleRemove = (id) => {
    dispatch(removeFromCart(id)); // Dispatch the action with the item's id
  };

  // Handlers for quantity
  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };
  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };

  return (
    <div
      className="min-h-screen flex shadow-2xl shadow-[#D6A74F]/40 flex-col items-center py-8 px-2 bg-[#F5EBDD]"
    >
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
                  {/* This will now work because item.image is a valid string */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md shadow"
                  />
                  <div className="flex-1 flex flex-col items-start">
                    <div className="font-bold text-[#3E2F1C] text-lg mb-1">
                      {item.name}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[#B3541E] font-semibold">
                        ₹ {item.price.toLocaleString()}
                      </span>
                      <span className="mx-2 text-[#A5A58D]">×</span>
                      {/* --- ADDED QUANTITY CONTROLS --- */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDecrease(item.id)}
                          className="w-6 h-6 rounded-full font-bold text-[#B3541E] bg-[#A5A58D]"
                       
                        >
                          -
                        </button>
                        <span className="text-[#3E2F1C] w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleIncrease(item.id)}
                          className="w-6 h-6 rounded-full font-bold text-[#B3541E] bg-[#A5A58D]"
                       
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

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
              {/* --- THIS IS THE FIX FOR THE TOTAL --- */}
              <div className="text-xl font-bold text-[#B3541E]">
                Total: ₹ {cartTotalAmount.toLocaleString()}
              </div>
              <Link
                to="/checkout"
                className="px-8 py-3 rounded-lg text-lg bg-[#B3541E] text-white font-bold hover:bg-[#D6A74F] transition shadow"
              >
                Proceed to Checkout
              </Link>
              <Link
                to="/shop"
                className="px-8 py-3 rounded-lg bg-[#B3541E] text-white font-bold hover:bg-[#D6A74F] transition shadow"
              >
                Continue to Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}


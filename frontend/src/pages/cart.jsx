import React from "react";
import Antima1 from "../assets/product_Images/Antima_product1.jpg"
import Antima2 from "../assets/product_Images/Antima_product2.jpg"

// Example cart data, replace with your real cart state or context
const cartItems = [
  {
    id: 1,
    name: "Aadhira Polki Pearl Necklace Set",
    image: Antima1,
    price: 6649,
    quantity: 1,
    color: "Brown",
    size: "M",
  },
  {
    id: 2,
    name: "Classic Tennis Necklace Set",
    image: Antima2,
    price: 4150,
    quantity: 2,
    color: "Magenta Pink",
    size: "S",
  },
];

export default function CartPage() {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen flex  shadow-2xl shadow-[#3B7046] flex-col items-center py-8 px-2">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-[#3B7046] mb-8 text-center">
          My Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center text-[#3B7046] text-lg">
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
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md shadow"
                  />
                  <div className="flex-1 flex flex-col items-start">
                    <div className="font-bold text-[#3B7046] text-lg mb-1">{item.name}</div>
                    <div className="flex gap-4 text-sm text-[#63B17B] mb-2">
                      <span>Color: <span className="font-semibold">{item.color}</span></span>
                      <span>Size: <span className="font-semibold">{item.size}</span></span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[#3B7046] font-semibold">₹ {item.price.toLocaleString()}</span>
                      <span className="mx-2 text-[#F9A9AC]">×</span>
                      <span className="text-[#3B7046]">{item.quantity}</span>
                    </div>
                  </div>
                  {/* Remove/Quantity Controls (optional) */}
                  <button
                    className="text-[#F9A9AC] font-semibold hover:text-[#FF5C5C] transition"
                    // onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="mt-8 flex flex-col md:flex-col items-center justify-between gap-6">
              <div className="text-xl font-bold text-[#3B7046]">
                Total: ₹ {total.toLocaleString()}
              </div>
              <a
                href="/checkout"
                className="px-8 py-3 rounded-lg text-lg bg-[#3B7046] text-white font-bold hover:bg-[#63B17B] transition shadow"
              >
                Proceed to Checkout
              </a>
               <a
                href="/shop"
                className="px-8 py-3 rounded-lg bg-[#3B7046] text-white font-bold hover:bg-[#63B17B] transition shadow"
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
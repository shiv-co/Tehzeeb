import React, { useState } from "react";
// import antima from "/assets/product_Images/ANTIMA_1/"
// import antima from "../../public/ANTIMA _1"
// E:\Tehzeeb\frontend\src\assets\product_Images\ANTIMA _1\2.jpg
// Sample product images (replace with your real product image URLs)
const productImages = [
  
  "/ANTIMA _1/1.jpg",
  "/ANTIMA _1/2.jpg",
  "/ANTIMA _1/3.jpg",
  "/ANTIMA _1/4.jpg",
   "/ANTIMA _1/5.jpg",
];

const colors = [
  { name: "Brown", colorClass: "bg-[#B0886A]" },
  { name: "Magenta Pink", colorClass: "bg-[#F9A9AC]" },
  { name: "Red", colorClass: "bg-red-500" },
  { name: "Sky Blue", colorClass: "bg-sky-400" },
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ProductPreview() {
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState(colors[0].name);
  const [selectedSize, setSelectedSize] = useState("XS");
  const [quantity, setQuantity] = useState(1);
  const [detailsOpen, setDetailsOpen] = useState({
    product: false,
    shipping: false,
    trivia: false,
  });

  const price = 4599;
  const originalPrice = 6499;
  const savings = originalPrice - price;

  return (
    <div className="min-h-screen bg-[#FDD7D7] flex flex-col items-center py-6 px-2">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-5 gap-8 p-6 md:p-10">
        {/* Thumbnails */}
        <div className="flex md:flex-col gap-2 md:gap-4 md:col-span-1 order-2 md:order-1 justify-center">
          {productImages.map((img, idx) => (
            <button
              key={img}
              onClick={() => setSelectedImg(idx)}
              className={`border-2 rounded-lg overflow-hidden w-16 h-20 md:w-20 md:h-28 focus:outline-none ${selectedImg === idx ? "border-[#63B17B]" : "border-transparent"}`}
            >
              <img src={img} alt="Thumbnail" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>

        {/* Main Image */}
        <div className="md:col-span-2 flex justify-center items-center order-1 md:order-2">
          <img
            src={productImages[selectedImg]}
            alt="Product Main"
            className="w-full h-[350px] md:h-[500px] object-cover rounded-xl shadow"
          />
        </div>

        {/* Product Details */}
        <div className="md:col-span-2 flex flex-col justify-between order-3">
          <div>
            <nav className="text-sm text-[#3B7046] mb-2">
              Home &gt; Swati Rathi in Viscose Georgette Mukai…
            </nav>
            <h2 className="text-2xl md:text-3xl font-bold text-[#3B7046] mb-2">
              Swati Rathi in Viscose Georgette Mukaish Set With Resham Thread Handwork
            </h2>
            <div className="flex items-baseline gap-3 mb-3">
              <span className="line-through text-gray-400 text-lg">Rs. {originalPrice.toLocaleString()}</span>
              <span className="text-2xl text-[#3B7046] font-bold">Rs. {price.toLocaleString()}</span>
              <span className="text-[#63B17B] font-semibold">
                Save Rs. {savings.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-5">
              <span className="h-2 w-2 rounded-full bg-[#F9A9AC] inline-block"></span>
              <span className="text-[#3B7046] text-xs">In Stock</span>
            </div>
            {/* Color */}
            <div className="mb-4">
              <div className="font-semibold text-[#3B7046] mb-1">Color</div>
              <div className="flex gap-2 flex-wrap">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-2 px-3 py-1 rounded-full border transition
                      ${selectedColor === c.name
                        ? "border-[#63B17B] bg-[#FDD7D7]"
                        : "border-gray-200 bg-white"}
                    `}
                  >
                    <span className={`h-4 w-4 rounded-full border ${c.colorClass}`}></span>
                    <span className="text-xs">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
            {/* Size */}
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-[#3B7046] mb-1">Size</div>
                <a href="#" className="text-xs text-[#3B7046] underline">Size Chart</a>
              </div>
              <div className="flex gap-2 flex-wrap">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-1 rounded border transition font-semibold
                      ${selectedSize === s
                        ? "border-[#3B7046] bg-[#3B7046] text-white"
                        : "border-gray-200 bg-white text-[#3B7046] hover:bg-[#FDD7D7]"}
                    `}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            {/* Quantity */}
            <div className="mb-5">
              <div className="font-semibold text-[#3B7046] mb-1">Quantity</div>
              <div className="flex items-center w-[120px] border rounded">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="flex-1 py-1 text-[#3B7046] font-bold text-xl"
                >-</button>
                <span className="flex-1 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="flex-1 py-1 text-[#3B7046] font-bold text-xl"
                >+</button>
              </div>
            </div>
            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 mb-6">
              <button className="w-full py-3 rounded bg-[#3B7046] text-white font-bold hover:bg-[#63B17B] transition">
                Add To Cart
              </button>
              <button className="w-full py-3 rounded border-2 border-[#3B7046] text-[#3B7046] font-bold hover:bg-[#FDD7D7] transition">
                Buy It Now
              </button>
            </div>
          </div>
          {/* Expandable Details */}
          <div>
            <button
              className="flex justify-between items-center w-full py-3 border-b text-[#3B7046] font-semibold"
              onClick={() => setDetailsOpen(d => ({ ...d, product: !d.product }))}
            >
              Product Details
              <span>{detailsOpen.product ? "▲" : "▼"}</span>
            </button>
            {detailsOpen.product && (
              <div className="py-2 text-[#3B7046] text-sm">
                Beautiful viscose georgette set with intricate mukaish and resham thread handwork. Includes kurta, pants, and dupatta.
              </div>
            )}
            <button
              className="flex justify-between items-center w-full py-3 border-b text-[#3B7046] font-semibold"
              onClick={() => setDetailsOpen(d => ({ ...d, shipping: !d.shipping }))}
            >
              Shipping & Delivery
              <span>{detailsOpen.shipping ? "▲" : "▼"}</span>
            </button>
            {detailsOpen.shipping && (
              <div className="py-2 text-[#3B7046] text-sm">
                Orders are dispatched within 2-4 business days. Delivery is estimated to take 6-10 business days.
              </div>
            )}
            <button
              className="flex justify-between items-center w-full py-3 border-b text-[#3B7046] font-semibold"
              onClick={() => setDetailsOpen(d => ({ ...d, trivia: !d.trivia }))}
            >
              More Information/Trivia
              <span>{detailsOpen.trivia ? "▲" : "▼"}</span>
            </button>
            {detailsOpen.trivia && (
              <div className="py-2 text-[#3B7046] text-sm">
                Each piece is handcrafted by skilled artisans, giving you a unique and luxurious look.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
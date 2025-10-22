import React from "react";
import Antima1 from "../assets/product_Images/Antima_product1.jpg"
import Antima2 from "../assets/product_Images/Antima_product2.jpg"
import Garima1 from "../assets/product_Images/Garima_product1.jpg"
import Garima2 from "../assets/product_Images/Garima_product2.jpg"

// Sample product data (replace with API data as needed)
const products = [
  {
    id: 1,
    title: "Antique Gold Three Layer Kanauti",
    image: Antima1,
    price: 1750,
    originalPrice: 2099,
    status: "soldout",
  },
  {
    id: 2,
    title: "Baghira Pearl Drop Earrings",
    image: Garima1,
    price: 900,
    originalPrice: 1000,
    status: "soldout",
  },
  {
    id: 3,
    title: "Aadhira Polki Pearl Necklace Set",
    image: Antima2,
    price: 6649,
    originalPrice: 8400,
    status: "sale",
  },
  {
    id: 4,
    title: "Classic Tennis Necklace Set",
    image: Garima2,
    price: 4150,
    originalPrice: 4800,
    status: "sale",
  },
  {
    id: 5,
    title: "Leher Kanauti with Ear Cuffs",
    image: Antima1,
    price: 1850,
    originalPrice: 2100,
    status: "sale",
  },
  {
    id: 6,
    title: "White Maurya Ear Cuff Jhumka",
    image: Antima2,
    price: 2150,
    originalPrice: 2500,
    status: "sale",
  },
  {
    id: 7,
    title: "Ruhi White Pearl Earrings",
    image: Garima2,
    price: 1350,
    originalPrice: null,
    status: "sale",
  },
  {
    id: 8,
    title: "Ruby Square Cut Necklace Set",
    image: Garima1,
    price: 3250,
    originalPrice: 3600,
    status: "soldout",
  },
];

const statusColors = {
  sale: "bg-[#3B7046] text-white",
  soldout: "bg-[#D6B3D6] text-[#3B7046]", // Using a soft pink for "sold out"
};

const btnColors = {
  sale: "border-[#3B7046] text-[#3B7046] hover:bg-[#3B7046] hover:text-white",
  soldout: "border-[#F9A9AC] text-[#F9A9AC] cursor-not-allowed",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#ffffff]  py-8 px-2 md:px-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center text-[#3B7046] mb-10">
        Shop Our Collection
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  lg:gap-12 gap-4 md:pl-20 lg:pr-20 ">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow flex flex-col overflow-hidden"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-60 lg:h-full object-cover"
              />
              <span
                className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
                  product.status === "soldout"
                    ? "bg-[#D6B3D6] text-[#3B7046]"
                    : "bg-[#3B7046] text-white"
                }`}
              >
                {product.status === "sale" ? "Sale" : "Sold out"}
              </span>
            </div>
            <div className="p-2  flex flex-col flex-grow">
              <h2 className="font-semibold text-[#3B7046] text-lg mb-2">
                {product.title}
              </h2>
              <div className="mb-2">
                {product.originalPrice && product.originalPrice > product.price ? (
                  <>
                    <span className="line-through text-[#9CA3AF] mr-2">
                      ₹ {product.originalPrice.toLocaleString()}
                    </span>
                    <span className="font-bold text-[#3B7046] text-lg">
                      ₹ {product.price.toLocaleString()}
                    </span>
                  </>
                ) : (
                  <span className="font-bold text-[#3B7046] text-lg">
                    ₹ {product.price.toLocaleString()}
                  </span>
                )}
              </div>
              <button
                disabled={product.status === "soldout"}
                className={`mt-auto w-full px-4 py-2 border-2 rounded-lg font-semibold transition 
                  ${
                    product.status === "soldout"
                      ? "border-[#F9A9AC] text-[#F9A9AC] bg-[#F9A9AC]/10 cursor-not-allowed"
                      : "border-[#3B7046] text-[#3B7046] bg-[#FDD7D7] hover:bg-[#3B7046] hover:text-white"
                  }
                `}
              >
                {product.status === "soldout" ? "Sold out" : "Add to cart"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
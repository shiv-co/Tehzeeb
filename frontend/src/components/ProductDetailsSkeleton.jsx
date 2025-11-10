import React from "react";

const COLORS = {
  primary: "#B3541E",
  secondary: "#D6A74F",
  background: "#F5EBDD",
};

const ProductDetailsSkeleton = () => {
  return (
    <div className="min-h-screen py-12 px-4 animate-pulse" style={{ background: COLORS.background }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">

        {/* --- Image Gallery Skeleton --- */}
        <div className="flex-1 flex flex-col md:flex-row gap-4">
          {/* Thumbnail placeholders */}
          <div className="grid grid-cols-5 gap-3 md:flex md:flex-col md:order-1 order-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="aspect-square md:w-24 md:h-24 rounded-md bg-gray-300"
              ></div>
            ))}
          </div>

          {/* Main Image Placeholder */}
          <div className="w-full md:flex-1 order-1 md:order-2 flex items-center justify-center">
            <div className="w-full h-[480px] bg-gray-300 rounded-md shadow-inner"></div>
          </div>
        </div>

        {/* --- Product Info Skeleton --- */}
        <div className="flex-1 flex flex-col space-y-5">
          <div className="h-8 bg-gray-300 rounded w-3/4"></div> {/* Product Name */}
          <div className="h-6 bg-gray-300 rounded w-1/3"></div> {/* Price */}
          <div className="h-5 bg-gray-300 rounded w-1/4"></div> {/* Status */}

          {/* Description */}
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-300 rounded w-full"></div>
            ))}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mt-4">
            <div className="h-5 w-24 bg-gray-300 rounded"></div>
            <div className="h-8 w-16 bg-gray-300 rounded"></div>
          </div>

          {/* Buttons */}
          <div className="space-y-3 mt-6">
            <div className="w-full h-12 bg-gray-300 rounded-lg"></div>
            <div className="w-full h-12 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;

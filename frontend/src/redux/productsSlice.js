// // import { createSlice } from '@reduxjs/toolkit';
// // import Antima1Img1 from "../assets/product_Images/ANTIMA_1/1.jpg";
// // import Antima1Img2 from "../assets/product_Images/ANTIMA_1/2.jpg";
// // import Antima1Img3 from "../assets/product_Images/ANTIMA_1/3.jpg";
// // import Antima1Img4 from "../assets/product_Images/ANTIMA_1/4.jpg";
// // import Antima1Img5 from "../assets/product_Images/ANTIMA_1/5.jpg";

// // import Antima2Img1 from "../assets/product_Images/ANTIMA_2/1.jpg";
// // import Antima2Img2 from "../assets/product_Images/ANTIMA_2/2.jpg";
// // import Antima2Img3 from "../assets/product_Images/ANTIMA_2/3.jpg";
// // import Antima2Img4 from "../assets/product_Images/ANTIMA_2/4.jpg";
// // import Antima2Img5 from "../assets/product_Images/ANTIMA_2/5.jpg";

// // import Garima1Img1 from "../assets/product_Images/GARIMA_1/1.jpg";
// // import Garima1Img2 from "../assets/product_Images/GARIMA_1/2.jpg";
// // import Garima1Img3 from "../assets/product_Images/GARIMA_1/3.jpg";
// // import Garima1Img4 from "../assets/product_Images/GARIMA_1/4.jpg";

// // import Garima2Img1 from "../assets/product_Images/GARIMA_2/1.jpg";
// // import Garima2Img2 from "../assets/product_Images/GARIMA_2/2.jpg";
// // import Garima2Img3 from "../assets/product_Images/GARIMA_2/3.jpg";
// // import Garima2Img4 from "../assets/product_Images/GARIMA_2/4.jpg";
// // import Garima2Img5 from "../assets/product_Images/GARIMA_2/5.jpg";

// // // Add more product images and details as needed

// // const initialState = {
// //   items: [
// //     {
// //       id: 1,
// //       title: "Antique Gold Three Layer Kanauti",
// //       subtitle: "Kashmiri Aari Embroidery Stole",
// //       images: [Antima1Img1, Antima1Img2, Antima1Img3, Antima1Img4, Antima1Img5],
// //       price: 1750,
// //       originalPrice: 2099,
// //       discount: 16,
// //       isNew: true,
// //       isAd: true,
// //       rating: 4.5,
// //       reviews: 120,
// //       colors: [
// //         { name: "Terracotta", color: "#B3541E" },
// //         { name: "Mustard Gold", color: "#D6A74F" }
// //       ],
// //       sizes: ["XS", "S", "M", "L", "XL", "XXL"],
// //       inStock: true,
// //       details: "Beautiful Kashmiri Aari embroidery stole with antique gold three-layer Kanauti.",
// //       shipping: "Dispatched within 2-4 business days. Delivery in 6-10 business days.",
// //       trivia: "Each stole is hand-embroidered by skilled artisans.",
// //     },
// //     {
// //       id: 2,
// //       title: "Baghira Pearl Drop Earrings",
// //       subtitle: "Women Churidar Length Leggings",
// //       images: [Antima2Img1, Antima2Img2, Antima2Img3, Antima2Img4, Antima2Img5],
// //       price: 900,
// //       originalPrice: 1000,
// //       discount: 10,
// //       isNew: false,
// //       isAd: true,
// //       rating: 4.2,
// //       reviews: 60,
// //       colors: [
// //         { name: "Sage Green", color: "#A5A58D" },
// //         { name: "Deep Brown", color: "#3E2F1C" }
// //       ],
// //       sizes: ["XS", "S", "M", "L"],
// //       inStock: true,
// //       details: "Elegant pearl drop earrings with classic Baghira design.",
// //       shipping: "Dispatched within 1-3 business days. Delivery in 5-9 business days.",
// //       trivia: "Features authentic freshwater pearls.",
// //     },
// //     {
// //       id: 3,
// //       title: "Baghira Pearl Drop Earrings",
// //       subtitle: "Women Churidar Length Leggings",
// //       images: [Garima1Img1, Garima1Img2, Garima1Img3, Garima1Img4],
// //       price: 1900,
// //       originalPrice: 3000,
// //       discount: 10,
// //       isNew: false,
// //       isAd: true,
// //       rating: 4.2,
// //       reviews: 60,
// //       colors: [
// //         { name: "Linen/Sand", color: "#F5EBDD" }
// //       ],
// //       sizes: ["S", "M", "L"],
// //       inStock: true,
// //       details: "Women churidar length leggings with classic comfort.",
// //       shipping: "Ships next business day.",
// //       trivia: "Best-selling leggings in the region.",
// //     },
// //     {
// //       id: 4,
// //       title: "Antique Gold Three Layer Kanauti",
// //       subtitle: "Kashmiri Aari Embroidery Stole",
// //       images: [Garima2Img1, Garima2Img2, Garima2Img3, Garima2Img4, Garima2Img5],
// //       price: 1750,
// //       originalPrice: 2099,
// //       discount: 16,
// //       isNew: true,
// //       isAd: true,
// //       rating: 4.5,
// //       reviews: 120,
// //       colors: [
// //         { name: "Terracotta", color: "#B3541E" }
// //       ],
// //       sizes: ["XS", "S", "M", "L", "XL", "XXL"],
// //       inStock: true,
// //       details: "Another version of the antique gold three-layer Kanauti with unique embroidery.",
// //       shipping: "Usually dispatched within 2 days.",
// //       trivia: "A customer favorite for festive occasions.",
// //     },
// //     // ...add other products here as needed
// //   ],
// //   imageIndexes: {},
// //   selectedProductId: 1, // default selected product (first one)
// // };

// // const productsSlice = createSlice({
// //   name: 'products',
// //   initialState,
// //   reducers: {
// //     setImageIndex: (state, action) => {
// //       const { productId, imgIndex } = action.payload;
// //       state.imageIndexes[productId] = imgIndex;
// //     },
// //     resetImageIndex: (state, action) => {
// //       const { productId } = action.payload;
// //       state.imageIndexes[productId] = 0;
// //     },
// //     setSelectedProduct: (state, action) => {
// //       state.selectedProductId = action.payload;
// //     },
// //   }
// // });

// // export const { setImageIndex, resetImageIndex, setSelectedProduct } = productsSlice.actions;
// // export const selectSelectedProduct = state =>
// //   state.products.items.find(p => p.id === state.products.selectedProductId);

// // export default productsSlice.reducer;




// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // --- Thunk for fetching ALL products ---
// export const fetchProducts = createAsyncThunk(
//   'products/fetchProducts',
//   async (_, { rejectWithValue }) => {
//     try {
//       // Note: We use the full URL because we're using CORS
//       const { data } = await axios.get('http://localhost:5000/api/products');
//       return data;
//     } catch (error) {
//       const message =
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message;
//       return rejectWithValue(message);
//     }
//   }
// );

// // --- Thunk for fetching a SINGLE product ---
// export const fetchProductById = createAsyncThunk(
//   'products/fetchProductById',
//   async (id, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
//       return data;
//     } catch (error) {
//       const message =
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message;
//       return rejectWithValue(message);
//     }
//   }
// );


// const initialState = {
//   items: [], // This will hold all our products
//   product: null, // This will hold the single product for the details page
//   loading: 'idle', // 'idle' | 'pending' | 'succeeded' | 'failed'
//   error: null,
// };

// const productsSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {
//     // We can add reducers for creating/updating products later
//   },
//   extraReducers: (builder) => {
//     builder
//       // Cases for fetching all products
//       .addCase(fetchProducts.pending, (state) => {
//         state.loading = 'pending';
//         state.error = null;
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.loading = 'succeeded';
//         state.items = action.payload; // Load the products into state
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.loading = 'failed';
//         state.error = action.payload;
//       })
//       // Cases for fetching a single product
//       .addCase(fetchProductById.pending, (state) => {
//         state.loading = 'pending';
//         state.error = null;
//       })
//       .addCase(fetchProductById.fulfilled, (state, action) => {
//         state.loading = 'succeeded';
//         state.product = action.payload;
//       })
//       .addCase(fetchProductById.rejected, (state, action) => {
//         state.loading = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export default productsSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// --- THUNK FOR ALL PRODUCTS ---
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      // Fetches all products
      const { data } = await axios.get(
        // 'http://localhost:5000/api/products'
        'https://tehzeeb-m4q8-mwuoovcuv-shivam-singhs-projects-e9ef9bb8.vercel.app/api/products',
        
        {
        withCredentials: true,
    });
      return data;
    } catch (error) {
      // Handle errors
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// --- THUNK FOR ONE PRODUCT ---
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId, { rejectWithValue }) => {
    try {
      // Fetches a single product by its ID
      const { data } = await axios.get(
        // `http://localhost:5000/api/products/${productId}`,
        `https://tehzeeb-m4q8-mwuoovcuv-shivam-singhs-projects-e9ef9bb8.vercel.app/api/products/${productId}`,
        
      );
      return data;
    } catch (error) {
      // Handle errors
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Define the initial state for this slice
const initialState = {
  // State for the main shop page
  items: [],
  loading: 'idle', // 'idle' | 'pending' | 'succeeded' | 'failed'
  error: null,
  
  // State for the single product details page
  selectedProduct: {
    product: null,
    loading: 'idle',
    error: null,
  },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // We can add reducers here later if needed (e.g., clearSelectedProduct)
  },
  // Handle the different states of our async thunks
  extraReducers: (builder) => {
    builder
      // Cases for fetchProducts (all products)
      .addCase(fetchProducts.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.items = action.payload; // Store the array of products
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload; // Store the error message
      })
      
      // Cases for fetchProductById (single product)
      .addCase(fetchProductById.pending, (state) => {
        state.selectedProduct.loading = 'pending';
        state.selectedProduct.error = null;
        state.selectedProduct.product = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct.loading = 'succeeded';
        state.selectedProduct.product = action.payload; // Store the single product object
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.selectedProduct.loading = 'failed';
        state.selectedProduct.error = action.payload; // Store the error message
      });
  },
});

export default productsSlice.reducer;


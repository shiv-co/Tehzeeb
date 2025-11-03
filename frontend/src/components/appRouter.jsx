import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your pages
import Navbar from "./navbar";
import HomePage from "../pages/home";
import ProductsPage from "../pages/productPage";
import ProductPreview from "../pages/productPreview";
import LoginPage from "../auth/login";
import SignUpPage from "../auth/signUp";
import AboutUs from "../pages/aboutUs";
import Footer from "../pages/footer";
import CartPage from "../pages/cart";
import ProfileEditPage from "../pages/profileEdit";
import BlogPage from "../pages/blog";                               
import ContactUsPage from "../pages/contactUs";
import AdminDashboard from "./adminDashboard";
import AdminRoute from "./adminRoute";
import UserListPage from "../pages/userListPage";
import ProductListPage from "../pages/productListPage";
import ProductEditPage from "../pages/productEditPage";
// import ManageProductsScreen from "../pages/manageProductScreen";
// import ProductEditScreen from "../pages/productEditScreen";

// Optional: Add a NotFound component for unmatched routes
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDD7D7]">
      <h1 className="text-3xl text-[#3B7046] font-bold">404 - Page Not Found</h1>
    </div>
  );
}

export default function AppRouter() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductPreview />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfileEditPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="*" element={<NotFound />} />

         <Route path="" element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserListPage />} />
          <Route path="/admin/products" element={<ProductListPage />} /> 
          <Route path="/admin/product/:id/edit" element={<ProductEditPage />} />
          <Route path="/admin/product/create" element={<ProductEditPage />} />


          {/* <Route path="/admin/products" element={<ManageProductsScreen />} />
          <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} /> */}

          {/*<Route path="/admin/orders" element={<OrderListPage />} /> 
          */}
        </Route>                                                                      
      </Routes>
    </Router>
  );
}
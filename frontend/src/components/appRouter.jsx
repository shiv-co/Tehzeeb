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
import CheckoutPage from "../pages/checkout";
import AdminManageOrders from "../pages/AdminManageOrders";
import ScrollToTop from "./ScrollToTop";
import CancelRefundPage from "../pages/CancelRefundPage";
import TermsConditionsPage from "../pages/TermsConditionsPage";
import ShippingPolicyPage from "../pages/shippingPolicyPage";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";

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
    // <Router>
    <>
      <Navbar />
      <ScrollToTop />
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
        <Route path="/cancellation-refund" element={<CancelRefundPage />} />
        <Route path="/terms-and-conditions" element={<TermsConditionsPage />} />
        <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        

        <Route path="/footer" element={<Footer />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<NotFound />} />

         <Route path="" element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserListPage />} />
          <Route path="/admin/products" element={<ProductListPage />} /> 
             <Route path="/admin/orders" element={<AdminManageOrders />} /> 
          <Route path="/admin/product/:id/edit" element={<ProductEditPage />} />
          <Route path="/admin/product/create" element={<ProductEditPage />} />


          {/* <Route path="/admin/products" element={<ManageProductsScreen />} />
          <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} /> */}

          {/*<Route path="/admin/orders" element={<OrderListPage />} /> 
          */}
        </Route>                                                                      
      </Routes>
 
    </>
  );
}
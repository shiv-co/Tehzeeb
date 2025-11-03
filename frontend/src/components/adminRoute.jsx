import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

// This component is a "wrapper" for your admin pages.
// It checks if the user is an admin. If they are, it shows the
// page (using <Outlet />). If not, it redirects them.

export default function AdminRoute() {
  const { userInfo } = useSelector((state) => state.auth);

  // Check if user is logged in AND is an admin
  return userInfo && userInfo.isAdmin ? (
    <Outlet /> // This renders the child route (e.g., <AdminDashboard />)
  ) : (
    <Navigate to="/login" replace /> // Or redirect to homepage '/'
  );
}

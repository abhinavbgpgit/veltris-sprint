import React from "react";
import { Navigate } from "react-router-dom";

/**
 * Only renders children if the user is NOT logged in.
 * If logged in, redirects to /dashboard.
 */
const GuestOnlyRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export default GuestOnlyRoute;
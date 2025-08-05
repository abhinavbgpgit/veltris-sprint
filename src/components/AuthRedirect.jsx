import React from "react";
import { Navigate } from "react-router-dom";

/**
 * If the user is logged in, redirect to the main dashboard.
 * Otherwise, render the children (e.g., the Login page).
 */
const AuthRedirect = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (isLoggedIn) {
    // You can change "/dashboard" to "/" if your main page is at "/"
    return <Navigate to="/" replace />;
  }
  return children;
};

export default AuthRedirect;
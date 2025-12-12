import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user");

  if (!user) {
    toast.error("Please login first!");
    return <Navigate to="/" replace />;
  }

  return children;
}

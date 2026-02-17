import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  try {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) return children;

    const user = JSON.parse(storedUser);
    const role = user.role || user.user?.role;

    if (role === "patient") {
      return <Navigate to="/home" replace />;
    } else if (role === "doctor") {
      return <Navigate to="/doctor-dashboard" replace />;
    }

    return children;
  } catch (error) {
    console.error("Error in PublicRoute:", error);
    return children;
  }
};

export default PublicRoute;

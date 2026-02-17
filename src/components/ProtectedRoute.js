import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ role, children }) => {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    return <Navigate to="/login/choice" replace />;
  }

  const user = JSON.parse(storedUser);
  const userRole = user.role || user.user?.role;

  if (role && userRole !== role) {
    return <Navigate to="/login/choice" replace />;
  }

  return children;
};

export default ProtectedRoute;

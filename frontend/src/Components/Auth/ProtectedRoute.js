// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const ProtectedRoute = ({ children, allowedRoles, userRole }) => {
  const { isAuthenticated } = useKindeAuth();

  // if (!isAuthenticated) {
  //   return <Navigate to="/" />;
  // }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;

import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles, }) {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user")||"{}")
  if (!user) {
    // ✅ Not logged in → send to login
    return <Navigate to="/adminlogin" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // ✅ Logged in but not authorized
    return <Navigate to="/adminlogin" replace />;
  }

  // ✅ Authorized → render the nested route
  return <Outlet />;
}

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getIsAdmin } from "../services/userService";

export default function ProtectedRoutes(props) {
  const isAuthenticated = getIsAdmin();

  if (!isAuthenticated) {
    Swal.fire({
      icon: "error",
      title: "Access Denied",
      color: "#FF0000",
      text: "Admin Only Section",
      showClass: {
        popup: "animate__animated animate__fadeIn",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOut",
      },
    });
    
    return <Navigate to="/" />;
  }
  
  return <Outlet />;
}

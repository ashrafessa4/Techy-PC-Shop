import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function UserProtectedRoutes(props) {
  const isLogged = sessionStorage.getItem("token");
  const [isAuthenticated, setAuthenticated] = useState(isLogged);
  if (isAuthenticated) {
    if (props == "login"){
      Swal.fire({
        icon: "error",
        title: "You Are Already Logged In",
        color: "#FF0000",
        text: "You Cant Login When Already Logged In",
        showClass: {
          popup: "animate__animated animate__fadeIn",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOut",
        },
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "You Are Already Registered In",
        color: "#FF0000",
        text: "You Cant Register When Already Registered In",
        showClass: {
          popup: "animate__animated animate__fadeIn",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOut",
        },
      });
    }
    
    return <Navigate to="/" />;
  }
  return <Outlet />;
}
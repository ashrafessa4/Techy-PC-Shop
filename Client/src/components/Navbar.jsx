import React, { useContext, useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../css/navbar.css";
import "../css/home.css";
import { getProductsInCart } from "../services/cartService";
import { TokenContext, UserContext } from "../App";

function Navbar(props) {
  const setToken = useContext(TokenContext);
  const userDetails = useContext(UserContext);
  const storedUserDetails = localStorage.getItem('userName');
  const [isChanged, setIsChanged] = useState(false);
  const [cart, setCart] = useState("");
  const navigate = useNavigate();
  const isLogged = sessionStorage.getItem("token");
  const cartChange = props.cartChange;
  const cartRender = props.cartRender;
  // Handle logout, clear storage, redirect.
  const handleLogout = () => {
    setIsChanged(!isChanged);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("isAdmin");
    localStorage.removeItem("userName");
    setToken("");
    Swal.fire({
      position: "center",
      icon: "success",
      title: `You Logged Out Successfully, ${storedUserDetails}`,
      showClass: {
        popup: "animate__animated animate__fadeIn",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOut",
      },
      timer: 2000,
      timerProgressBar: true,
    });
    navigate("/");
  };
  // Fetches and sets cart data
  React.useEffect(() => {
    if (isLogged) {
      getProductsInCart()
        .then((result) => {
          setCart(result.data);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops... Something went wrong!",
            color: "#FF0000",
            text: err,
            showClass: {
              popup: "animate__animated animate__fadeIn",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOut",
            },
          });
        });
    }
  }, [isChanged, cartChange, cartRender]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark" id="navBar">
        <div className="container">
          <NavLink className="navbar-brand " to="/">
            <img
              className="navLogo img-fluid "
              src="../../Logo.png"
              alt="Logo"
            />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/CPU">
                  <i className="fa-solid fa-microchip"></i> CPU
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/GPU">
                  <i className="fa-sharp fa-solid fa-images"></i> GPU
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/RAM">
                  <i className="fa-solid fa-memory"></i> RAM
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Motherboard">
                  <i className="fa-sharp fa-solid fa-chess-board"></i>{" "}
                  Motherboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/PSU">
                  <i className="fa-solid fa-bolt"></i> PSU
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Case">
                  <i className="fa-solid fa-box-open"></i> Case
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/SSD">
                  <i className="fa-solid fa-memory"></i> SSD
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About/Contact
                </NavLink>
              </li>
            </ul>
            <div className="nav-item dropdown text-light">
              {/*Display cart icon with badge.*/}
              <NavLink className="position-relative navLink" to="/cart">
                {cart.length ? (
                  <>
                    <i className="fa-solid fa-cart-arrow-down fa-lg hoverIcon navLink"></i>
                    <span className="badge translate-middle rounded-pill text-bg-danger">
                      {cart.length}
                    </span>
                  </>
                ) : (
                  <i className="fa-solid fa-cart-arrow-down fa-lg hoverIcon"></i>
                )}
              </NavLink>
            </div>
            <div className="nav-item dropdown text-light">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa-solid fa-circle-user"></i>
                <span>
                  &nbsp;&nbsp;{isLogged ? storedUserDetails : null}
                </span>
              </a>
              <ul className="dropdown-menu">
                {/*Render login/register when not logged in*/}
                {isLogged ? null : (
                  <>
                    <NavLink className="dropdown-item" to="/login">
                      <li className="text-center">
                        <span className="display-6">Login</span>
                      </li>
                    </NavLink>
                    <NavLink className="dropdown-item" to="/register">
                      <li className="text-center">
                        <span className="display-6">Register</span>
                      </li>
                    </NavLink>
                  </>
                )}
                {/*
                   Render logout when logged in
                   Render admin panel if admin
                */}
                {isLogged ? (
                  <>
                    <li className="dropdown-item text-center">
                      <a onClick={handleLogout} className="">
                        <i className="fa-solid fa-power-off"></i> Logout
                      </a>
                    </li>
                    <hr className="m-1" />
                    {userDetails.isAdmin ? (
                      <li className="dropdown-item">
                        <NavLink className="text-danger" to="/admin-panel">
                          Admin Panel
                        </NavLink>
                      </li>
                    ) : null}
                  </>
                ) : null}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

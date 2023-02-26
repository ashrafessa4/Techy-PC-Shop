import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../src/pages/Home";
import Products from "../src/pages/Products";
import ProductDetails from "../src/pages/ProductDetails";
import Cart from "../src/pages/Cart";
import About from "../src/pages/About";
import Register from "../src/pages/Register";
import Login from "../src/pages/Login";
import AdminPanel from "../src/pages/AdminPanel";
import EditProduct from "../src/pages/EditProduct";
import AddProduct from "../src/pages/AddProduct";
import Pnf from "../src/pages/Pnf";
import AdminProtectedRoutes from "./components/AdminProtectedRoutes";
import UserProtectedRoutes from "./components/UserProtectedRoutes";
import { getUser } from "../src/services/userService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export const TokenContext = React.createContext();
export const UserContext = React.createContext();

function App() {
  const [userDetails, setUserDetails] = useState("");
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  React.useEffect(() => {
    const isLogged = sessionStorage.getItem("token");
    

    if (isLogged) {
      getUser()
        .then((result) => {
          setUserDetails(result.data);
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
    } else {
      setUserDetails("");
    }
  }, [token]);

  return (
    <div
      className="App"
      style={{
        background: "linear-gradient(to bottom, black, #0b1116)",
      }}
    >
      <UserContext.Provider value={userDetails}>
        <TokenContext.Provider value={setToken}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/CPU" element={<Products category={"CPU"} />} />
              <Route path="/GPU" element={<Products category={"GPU"} />} />
              <Route path="/RAM" element={<Products category={"RAM"} />} />
              <Route path="/PSU" element={<Products category={"PSU"} />} />
              <Route
                path="/Motherboard"
                element={<Products category={"Motherboard"} />}
              />
              <Route path="/Case" element={<Products category={"Case"} />} />
              <Route path="/SSD" element={<Products category={"SSD"} />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />
              <Route element={<UserProtectedRoutes user={userDetails} />}>
                <Route path="/register" element={<Register props="register"/>} />
                <Route path="/login" element={<Login setToken={setToken} props="login" />} />
              </Route>
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route element={<AdminProtectedRoutes user={userDetails} />}>
                <Route path="/admin-panel" element={<AdminPanel />} />
                <Route path="/admin-panel/edit/:id" element={<EditProduct />} />
                <Route path="/add-product" element={<AddProduct />} />
              </Route>
              <Route path="*" element={<Pnf />} />
            </Routes>
          </Router>
        </TokenContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;

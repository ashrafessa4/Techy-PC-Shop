import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import {getUser, login } from "../services/userService";
import "../css/loginRegister.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext } from "react";
import { TokenContext} from "../App";
import React, { useEffect } from "react";
import "../css/noscroll.css";

function Login() {
  useEffect(() => {
    document.body.classList.add("noscroll");
    return () => {
      document.body.classList.remove("noscroll");
    };
  }, []);
  const setToken = useContext(TokenContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().required().min(2).email(),
      password: yup.string().required().min(8),
    }),
    onSubmit: (values) => {
      login(values)
        .then((result) => {
          sessionStorage.setItem("token", result.data.token);     
          setToken(result.data.token);
          getUser()
            .then((userInfo) => {
              localStorage.setItem("userName", userInfo.data.name);
              Swal.fire({
                position: "center",
                icon: "success",
                title: `Welcome ${userInfo.data.name}!`,
                text: "You Have Logged Successfully",
                showClass: {
                  popup: "animate__animated animate__fadeIn",
                },
                hideClass: {
                  popup: "animate__animated animate__fadeOut",
                },
                timer: 2000,
                timerProgressBar: true,
              });
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

          navigate("/");
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Email or password are incorrect, Please try again.",
            showClass: {
              popup: "animate__animated animate__fadeIn",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOut",
            },
          });
        });
    },
  });

  return (
    <>
      <Navbar />
        <video autoPlay loop muted className="my-video">
          <source src="/first.mp4" type="video/mp4" />
        </video>
        <div className="container main">
          <div className="row mainForm">
            <div className="col-lg-6 col-sm-12">
              <h1 className="boldTitle text-center pt-3">
                <span className="title text-white">Welcome to <span className="text-success"> Techy</span> </span>
              </h1>
              <h6 className="text-center pb-3 text-white">
                Technology is one log-in away
              </h6>
              <form onSubmit={formik.handleSubmit}>
                <div className="form-floating mb-3 mt-4">
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="email"
                    name="email"
                    value={formik.values.email.toLowerCase()}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <p className="text-danger">{formik.errors.email}</p>
                  ) : null}
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <p className="text-danger">{formik.errors.password}</p>
                  ) : null}
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="button text-center">
                  <button type="submit" className="btn btn-success  w-100 mt-3">
                    Login
                  </button>
                </div>
              </form>
              <hr className="mt-4" />

              <p className="text-center mt-3 cartItemName text-white">
                New Techy's Member?&nbsp;&nbsp;
                <Link className="registerLoginForm text-success" to="/register">
                Click Here To Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      <Footer />
    </>
  );
}

export default Login;

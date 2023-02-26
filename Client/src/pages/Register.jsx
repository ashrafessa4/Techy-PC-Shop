import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { addUser } from "../services/userService";
import "../css/loginRegister.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React, { useEffect } from "react";
import "../css/noscroll.css";

function Register() {
  useEffect(() => {
    document.body.classList.add("noscroll");
    return () => {
      document.body.classList.remove("noscroll");
    };
  }, []);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      name: yup.string().required().min(2),
      email: yup.string().required().email(),
      password: yup
        .string()
        .required(
          "Password Contain Minimum 8 Characters, 1 Uppercase letter, 1 Lowercase letter "
        )
        .min(8)
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d{4})(?=.*[^A-Za-z0-9]).{8,}$/),
    }),
    onSubmit: (values) => {
      let user = { ...values, isAdmin: false };
      addUser(user)
        .then((result) => {
          localStorage.setItem("userName", user.name);
          sessionStorage.setItem("token", result.data.token);
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Welcome To Our Website, ${values.name}!`,
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
          navigate("/");
        })
        .catch((err) => {
          
        });
        Swal.fire({
          icon: "error",
          title: "Oops... Something went wrong!",
          color: "#FF0000",
          text: "Email Already Used",
          showClass: {
            popup: "animate__animated animate__fadeIn",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOut",
          },
        });
    },
  });

  return (
    <>
      <Navbar />
      <video autoPlay loop muted className="my-video">
        <source src="/second.mp4" type="video/mp4" />
      </video>
      <div className="container main">
        <div className="row mainForm">
          <div className="col-lg-6 col-sm-12">
            <h1 className="boldTitle text-center pt-3">
              <span className="title text-white">Create New Account</span>
            </h1>
            <h6 className="text-center pb-4 text-white">
              Become an enthusiastic pc builder today with <span className="text-success">Techy</span>
            </h6>
            
            <form onSubmit={formik.handleSubmit}>
              {/*name*/}
              <div className="form-floating mb-2 mt-4">
                <input
                  className="form-control"
                  id="name"
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                  <p className="text-danger">{formik.errors.name}</p>
                ) : null}
                <label htmlFor="floatingInput">Full Name</label>
              </div>
              {/*email*/}
              <div className="form-floating mb-2">
                <input
                  className="form-control"
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className="text-danger">{formik.errors.email}</p>
                ) : null}
                <label htmlFor="floatingInput">Email address</label>
              </div>
              {/*password*/}
              <div className="form-floating">
                <input
                  className="form-control"
                  id="password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <p className="text-danger">
                    {
                      "* Password must contain: 1 Uppercase, 1 Lowercase, 4 Digits and 1 Special Character. "
                    }
                  </p>
                ) : null}
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="button text-center">
                <button type="submit" className="btn btn-success  w-100 mt-3">
                  Register
                </button>
              </div>
            </form>
            <hr className="mt-4" />
            <p className="text-center mt-3 cartItemName text-white">
              Already a Techy's Member? &nbsp;
              <Link className="registerLoginForm text-success" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;

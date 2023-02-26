import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";

import { getProductById, editProduct } from "../services/productsService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    category: "",
    description: "",
    image: "",
    inStock: false,
  });

  React.useEffect(() => {
    getProductById(id)
      .then((result) => setProduct(result.data))
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
  }, []);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      image: product.image,
      inStock: product.inStock,
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      name: yup.string().required().min(2),
      price: yup.number().required().min(2),
      category: yup.string().required().min(2),
      description: yup.string().required().min(6),
      image: yup.string().required(),
      inStock: yup.boolean().required(),
    }),
    onSubmit: (values) => {
      let product = { ...values, _id: id };
      editProduct(product)
        .then((result) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Product Updated Successfully!`,
            showClass: {
              popup: "animate__animated animate__fadeIn",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOut",
            },
            timer: 2500,
            timerProgressBar: true,
          });
          navigate("/admin-panel");
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
    },
  });

  return (
    <>
      <Navbar />
      <video autoPlay loop muted className="my-video">
        <source src="/third.mp4" type="video/mp4" />
      </video>
      <div className="container main text-center">
        <h1 className="boldTitle text-center pt-3 mt-3">
          <span className="tapered2 text-white">Edit Product</span>
        </h1>
        <button
          onClick={() => window.history.back()}
          className="btn btn-secondary mx-1"
        >
          Go Back
        </button>
        <div className="row">
          <div className="col-lg-9 col-sm-12 mt-5 mb-5">
            <form className="mt-4" onSubmit={formik.handleSubmit}>
              <div className="form-floating mb-3 mt-1 mx-auto">
                <input
                  id="name"
                  type="name"
                  className="form-control"
                  placeholder="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                  <p className="text-danger">{formik.errors.name}</p>
                ) : null}
                <label htmlFor="floatingInput">Product Name</label>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-floating mb-3 mt-1 mx-auto">
                    <select
                      className="form-select form-select-lg"
                      aria-label=".form-select-sm example"
                      name="inStock"
                      id="inStock"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.inStock}
                    >
                      <option disabled>Choose Stock Status:</option>
                      <option value={true}>In Stock</option>
                      <option value={false}>Out Of Stock</option>
                    </select>
                    <label htmlFor="floatingInput">Stock</label>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12">
                  <div className="form-floating mb-3 mt-1 mx-auto">
                    <input
                      id="price"
                      type="number"
                      className="form-control"
                      placeholder="price"
                      name="price"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.price && formik.errors.price ? (
                      <p className="text-danger">{formik.errors.price}</p>
                    ) : null}
                    <label htmlFor="floatingInput">Price</label>
                  </div>
                </div>
                <div className="col">
                  <div className="form-floating mb-3 mt-1 mx-auto">
                    <select
                      className="form-select form-select-lg"
                      aria-label=".form-select-sm example"
                      name="category"
                      id="category"
                      value={formik.values.category}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option disabled>Choose Category:</option>
                      <option value="GPU">GPU</option>
                      <option value="CPU">CPU</option>
                      <option value="RAM">RAM</option>
                      <option value="Motherboard">Motherboard</option>
                      <option value="PSU">PSU</option>
                      <option value="Case">Case</option>
                      <option value="SSD">SSD</option>
                    </select>
                    <label htmlFor="floatingInput">Category</label>
                  </div>
                </div>
              </div>

              <div className="mb-3 mt-1 mx-auto">
                <textarea
                  id="description"
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  cols="20"
                  rows="5"
                ></textarea>

                {formik.touched.description && formik.errors.description ? (
                  <p className="text-danger">{formik.errors.description}</p>
                ) : null}
              </div>

              <div className="form-floating mb-3 mt-1 mx-auto">
                <input
                  id="image"
                  type="text"
                  className="form-control"
                  placeholder="image"
                  name="image"
                  value={formik.values.image}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.image && formik.errors.image ? (
                  <p className="text-danger">{formik.errors.image}</p>
                ) : null}
                <label htmlFor="floatingInput">Image (e.g 867px X 889px)</label>
              </div>

              {formik.values.category === "CPU" ||
                formik.values.category === "GPU" ||
                formik.values.category === "RAM" ||
                formik.values.category === "Motherboard" ||
                formik.values.category === "PSU" ||
                formik.values.category === "Case" ||
                formik.values.category === "SSD"}

              <div className="form-group mt-4 text-center">
                <button
                  className="btn btn-success btn-lg w-50 adminBtn text-white"
                  type="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                >
                  <i className="fa-solid fa-user-pen"></i> Edit Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EditProduct;

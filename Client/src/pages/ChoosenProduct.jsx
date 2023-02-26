import React, { useState } from "react";
import { addToUserCart } from "../services/cartService";
import { Link } from "react-router-dom";

function CurrentProduct(props) {
  const products = props.products;
  // Updates Cart Badge After Adding To Cart
  const cartChange = props.cartChange;
  const setCartChange = props.setCartChange;
  const isLogged = sessionStorage.getItem("token");
  const [quantity, setQuantity] = useState(1);

  const HandleAddToCart = (product) => {
    product.quantity = quantity;
    product.productId = products._id;
    addToUserCart(product)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Product Added Successfully!`,
          showClass: {
            popup: "animate__animated animate__fadeIn",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOut",
          },
          timer: 1500,
          timerProgressBar: true,
        });
        setCartChange(!cartChange);
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
  };
  return (
    <>
      <div className="row content my-4">
        <div className="col-xl-5 col-md-12 col-sm-12 text-white">
          
          <h1 className="text-center">
            <strong>{products.name}</strong>
          </h1>

          <h5 className="mt-2">Description:</h5>
          <p>{products.description}</p>

            {products.inStock ? (
              <span className="inStock">
                <strong>In Stock!</strong>
              </span>
            ) : (
              <span className="outOfStock">&nbsp; Out Of Stock!</span>
            )}
            <p className="text-muted">
            Product SKU: {products._id}
            </p>
          

          <hr className="mt-4 mb-5 horzline" />
          {products.inStock == false ? (
            <button className="btn btn-dark  w-100" disabled>
              Out Of Stock - Check Again Later
            </button>
          ) : isLogged ? (
            <a
              onClick={() => HandleAddToCart(products)}
              className="btn btn-success btn-lg w-100"
            >
              Add To Cart
              <h2 className="productDetailsTxt fw-bold mt-1">
                Price: {products.price} ₪
              </h2>
            </a>
          ) : (
            <Link to="/login" className="btn  btn-dark btn-lg w-100 ">
              Login To Continue Shopping
            </Link>
          )}
          <div className="text-center">
            <button
              onClick={() => window.history.back()}
              className="btn btn-secondary mt-4 text-center"
            >
              Go Back
            </button>
          </div>
          <hr className="mt-4 horzline" />
        </div>
        <div className="col-5 ">
          <img
            className="productDetailsImage img-fluid w-75"
            src={products.image}
            alt="ProductImage"
          />
        </div>
      </div>
    </>
  );
}

export default CurrentProduct;

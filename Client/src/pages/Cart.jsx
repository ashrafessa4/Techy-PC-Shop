import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/cart.css";
import {
  getProductsInCart,
  deleteProducts,
  deleteProductFromCart,
} from "../services/cartService";
import Loading from "../components/Loading";

function Cart() {
  const [products, setProducts] = useState([]);
  const isLogged = sessionStorage.getItem("token");
  const [isChanged, setIsChanged] = useState(false);
  const [cart, setCart] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const sum = cart ? cart.reduce((total, item) => total + item.price, 0) : null;

  const handleDelete = () => {
    deleteProducts(cart)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Payment Successfull!`,
          text: `You Paid: ${sum}`,
          showClass: {
            popup: "animate__animated animate__fadeIn",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOut",
          },
          timer: 2500,
          timerProgressBar: true,
        });
        setIsChanged(!isChanged);
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

  const handleDeleteProductFromCart = (product) => {
    deleteProductFromCart(product)
      .then(() => {
        getProductsInCart().then((result) => {
          setCart(result.data);
        });
        Swal.fire({
          position: "center",
          icon: "success",
          imageUrl: `${product.image}`,
          imageHeight: 200,
          title: `Product Removed Successfully!`,
          text: `${product.name}`,
          imageAlt: `${product.name}`,
          showClass: {
            popup: "animate__animated animate__fadeIn",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOut",
          },
          timer: 1500,
          timerProgressBar: true,
        });
        setIsChanged(!isChanged);
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

  React.useEffect(() => {
    if (isLogged) {
      getProductsInCart()
        .then((result) => {
          setCart(result.data);
          setIsLoading(true);
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
      setIsLoading(true);
    }
  }, [isChanged]);

  return (
    <>
      <Navbar cartRender={isChanged} />
      {isLoading ? (
        <div className="container h-100 d-flex justify-content-center align-items-center">
          {cart.length ? (
            <div className="px-4 px-lg-0">
              <h1 className="boldTitle text-center pt-3 pb-3 text-success">
                <span className="title">Shopping cart</span>
              </h1>
              <div className="pb-5">
                <div className="container">
                  <div className="p-4 bg-white cartContainer rounded shadow-sm mt-3">
                    <div className="col-lg-12">
                      <div className="container cart-page mb-4">
                        <table className="w-100">
                          <tbody>
                            <tr className="text-center bg-light text-uppercase cartContainer2">
                              <th style={{ width: "15%" }}>Image</th>
                              <th style={{ width: "50%" }}>Description</th>
                              <th style={{ width: "20%" }}>Price</th>
                              <th style={{ width: "15%" }}>Remove</th>
                            </tr>
                            {cart.map((product) => {
                              return (
                                <tr key={product._id}>
                                  <td>
                                    <img
                                      className="cartItemImg"
                                      src={product.image}
                                      alt="Product"
                                    />
                                  </td>
                                  <td>
                                    <div className="prodName text-center">
                                      <h6 className="dots">{product.name}</h6>
                                    </div>
                                  </td>
                                  <td className="text-center w-25">
                                    <strong>{product.price} </strong>₪
                                  </td>
                                  <td
                                    onClick={() =>
                                      handleDeleteProductFromCart(product)
                                    }
                                    className="text-center"
                                  >
                                    <i className="fa-solid fa-trash-can-arrow-up text-danger fa-lg"></i>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      <div className="bg-light px-4 py-2 mt-4 text-uppercase fw-bold cartContainer2 text-center">
                        <h4 className="paymentspace">
                          <strong>Payment</strong>
                        </h4>
                      </div>
                      <div className="p-4">
                        <p className="font-italic mb-4 cartItemName text-center">
                          All prices displayed in the website are including
                          taxes (17%)
                        </p>
                        <ul className="list-unstyled mb-4">
                          <li className="d-flex justify-content-between py-3 border-bottom">
                            <strong className="text-dark">
                              Price Before tax
                            </strong>
                            <h5 className="cartItemName">
                              {(sum / 1.17).toFixed(2)} ₪
                            </h5>
                          </li>

                          <li className="d-flex justify-content-between py-3 border-bottom">
                            <strong className="text-dark">Tax</strong>
                            <h5 className="cartItemName">
                              {(sum - sum / 1.17).toFixed(2)} ₪
                            </h5>
                          </li>
                          <li className="d-flex justify-content-between py-3 border-bottom">
                            <strong className="text-dark">Total</strong>
                            <h5 className="fw-bold cartItemName">{sum}.00 ₪</h5>
                          </li>
                        </ul>
                        <div className="text-center">
                          <button
                            className="btn btn-success btn-lg"
                            onClick={() => handleDelete(products)}
                          >
                            Check Out
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {cart.length == 0 && isLogged? (
            <div className="text-center row">
              <h1 className="boldTitle text-center pt-3 pb-3 text-success">
                <span className="title">Shopping cart</span>
              </h1>
              <h4 className="text-center mt-3 text-success boldTitle">
                Your cart is empty!
              </h4>
            </div>
          ) : null}
          {!isLogged ? (
            <div className="text-center row">
              <h6 className="text-center text-success">
              Please Login to view your cart and start shopping.
            </h6>
            </div>
          ) : null}
        </div>
      ) : (
        <Loading />
      )}

      <Footer />
    </>
  );
}

export default Cart;

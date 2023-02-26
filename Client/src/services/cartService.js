import axios from "axios";
import _ from "lodash";

const api = import.meta.env.VITE_API_BASE_URL || "";

// ADD PRODUCT TO CART
export const addToUserCart = (product) => {
  let body = _.omit(product, [
    "_id",
    "inStock",
  ]);
  return axios.post(`${api}carts`, body, {
    headers: { Authorization: `${sessionStorage.getItem("token")}` },
  });
};

// GET ALL
export const getProductsInCart = () => {
  return axios.get(`${api}carts`, {
    headers: {
      Authorization: `${sessionStorage.getItem("token")}`,
    },
  });
};

// DELETE PRODUCT FROM CART
export const deleteProductFromCart = (product) => {
  return axios.delete(`${api}carts/delete-product/${product.productId}`, {
    headers: { Authorization: `${sessionStorage.getItem("token")}` },
  });
};

// DELETE ALL PRODUCTS FROM CART
export const deleteProducts = () => {
  return axios.delete(`${api}carts`, {
    headers: {
      Authorization: `${sessionStorage.getItem("token")}`,
    },
  });
};

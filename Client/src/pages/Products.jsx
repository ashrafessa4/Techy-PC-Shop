import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getAllProducts } from "../services/productsService";
import Card from "../components/Card";

function Product({ category }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sortType, setSortType] = useState("asc");
  const [key, setKey] = useState(Date.now());
  const productsApi = async (productCategory) => {
    const request = await getAllProducts();
    if (request.status === 200) {
      const productsList = request.data.filter((item) => {
        return item.category === productCategory;
      });
      setProducts(productsList);
      setIsLoading(true);
    }
  };
  const handleSort = () => {
    if (sortType === "asc") {
      setSortType("desc");
      const sortedProducts = [...products].sort((a, b) => b.price - a.price);
      setProducts(sortedProducts);
    } else {
      setSortType("asc");
      const sortedProducts = [...products].sort((a, b) => a.price - b.price);
      setProducts(sortedProducts);
    }
  };
  useEffect(() => {
    setKey(Date.now()); // update key when category changes tp match background video
  }, [category]);
  React.useEffect(() => {
    productsApi(category);
  }, [category]);

  return (
    <>
      <Navbar />
      <video
        key={key}
        autoPlay
        loop
        muted
        className="my-video"
        style={{ background: "black" }}
      >
        <source src={`/${category}.mp4`} type="video/mp4" />
      </video>
      {isLoading ? (
        <div
          className={`container main ${
            products.length == 0
              ? "d-flex justify-content-center align-items-center"
              : null
          }`}
        >
          {/* SEARCH BAR  + SORTING */}
          {products.length > 0 ? (
            <div className="search pt-3">
              <div className="d-flex justify-content-center">
                <div className="input-group w-75">
                  <span className="input-group-text" id="addon-wrapping">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </span>
                  <input
                    onChange={(e) => setSearch(e.target.value)}
                    type="search"
                    className="form-control search-Control"
                    placeholder="Search Product..."
                    aria-label="Search"
                    aria-describedby="addon-wrapping"
                  />
                  <button
                    className="btn btn-success btn-lg ms-3"
                    onClick={() => handleSort("asc")}
                  >
                    Sort by price ({sortType})
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          {/* PRODUCTS */}
          {products && products.length > 0 ? (
            <div className="products container mt-3">
              {products
                .filter((item) => {
                  return search.toLowerCase() == "" ||
                    search.toUpperCase() == ""
                    ? item
                    : item.name.toLowerCase().includes(search) ||
                        item.name.toUpperCase().includes(search);
                })
                .map((product) => {
                  return (
                    <Card
                      _id={product._id}
                      image={product.image}
                      category={product.category}
                      description={product.description}
                      name={product.name}
                      price={product.price}
                      inStock={product.inStock}
                      key={product._id}
                    />
                  );
                })}
            </div>
          ) : (
            <h2 className="text-center mt-5 text-white">
              <strong>
                No products found, Consider consulting an admin to add products
              </strong>
            </h2>
          )}
        </div>
      ) : (
        <div className="spinner">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Product;

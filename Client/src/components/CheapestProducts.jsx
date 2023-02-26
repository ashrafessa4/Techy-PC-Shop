import React, { useState } from "react";
import { getAllProducts } from "../services/productsService";
import Card from "./Card";

function CheapestProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all products and set state
  React.useEffect(() => {
    getAllProducts()
      .then((result) => {
        setProducts(result.data);
        setIsLoading(true);
      })
      .catch((err) => {
        // Display error message if something went wrong
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

  // Sort products by price and select the cheapest 4 in-stock products
  const sortedProducts = products.sort((a, b) => a.price - b.price);
  const selectedProducts = sortedProducts
    .filter((product) => product.inStock)
    .slice(0, 4);

  return (
    <>
      {isLoading ? (
        <>
          <div className="container"></div>

          {/* Display title */}
          <h1 className="boldTitle text-center mb-3">
            <span className="tapered2 responsiveTitle text-white">
              Budget Products
            </span>
          </h1>

          {/* Display selected products */}
          <div className="products mt-1">
            {selectedProducts.map((product) => {
              return (
                <Card
                  _id={product._id}
                  hot={product.hot}
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
        </>
      ) : (
        // Display spinner while loading
        <div className="spinner">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
}

export default CheapestProducts;

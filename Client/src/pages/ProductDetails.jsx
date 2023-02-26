import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChoosenProduct from "./ChoosenProduct";
import CheapestProducts from "../components/CheapestProducts";
import Loading from "../components/Loading";

function ProductDetails() {
  const { id } = useParams();
  const api = import.meta.env.VITE_API_BASE_URL || "";
  const [products] = useFetch(`${api}products/${id}`);
  const [isLoading, setIsLoading] = useState(false);
  const [cartChange, setCartChange] = useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
      document.documentElement.scrollTop = 0;
    }, 100);
  }, []);
  return (
    <>
      <Navbar cartChange={cartChange} />
      <video autoPlay loop muted className="my-video">
        <source src="/third.mp4" type="video/mp4" />
      </video>
      {isLoading ? (
        <div className="container main text-center">
          
          <ChoosenProduct
            products={products}
            setCartChange={setCartChange}
            cartChange={cartChange}
          />
          <CheapestProducts />
        </div>
      ) : (
        <Loading />
      )}

      <Footer />
    </>
  );
}

export default ProductDetails;

import React, {useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/admin.css";
import { getAllProducts, deleteProduct } from "../services/productsService";

import { Link } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import Loading from "../components/Loading";

function AdminPanel() {
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState();
  const [isChanged, setIsChanged] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  cmnt
  React.useEffect(() => {
    getAllProducts()
      .then((result) => {
        setProducts(result.data);
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
  }, [isChanged]);

  const handleDeleteProduct = (product) => {
    deleteProduct(product)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          imageUrl: `${values.image}`,
          imageWidth: 400,
          imageHeight: 200,
          title: `Product Deleted Successfully!`,
          text: `${values.name}`,
          imageAlt: `${values.name}`,
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

  return (
    <>
      <Navbar />
      <video autoPlay loop muted className="my-video">
        <source src="/16th.mp4" type="video/mp4" />
      </video>
      {isLoading ? (
        <div className="container main ">
          {/* add product button */}
          
          <div className="text-center m-3 ">
            <button className="btn btn-secondary">
              <Link
                to={"/add-product"}
                className="btn btn-secondary btn-lg"
                style={{ textDecoration: "none" }}
              >
                Add Product
              </Link>
            </button>
          </div>

          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
              tabIndex="0"
            >
              {/* SEARCH BAR */}
              <div className="search pb-3">
                <div className="input-group flex-nowrap ">
                  <span className="input-group-text" id="addon-wrapping">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </span>
                  <input
                    onChange={(e) => setSearch(e.target.value)}
                    type="search"
                    className="form-control w-75 search-Control"
                    placeholder="Search Product..."
                    aria-label="Search"
                    aria-describedby="addon-wrapping"
                  />
                  {/* FILTER */}
                  <select
                    className="text-center mx-1"
                    aria-label="Default select example"
                    onChange={(e) => setSelect(e.target.value)}
                  >
                    <option value={""}>All</option>
                    <option value="CPU">CPU</option>
                    <option value="GPU">GPU</option>
                    <option value="RAM">RAM</option>
                    <option value="Motherboard">Motherboard</option>
                    <option value="PSU">PSU</option>
                    <option value="Case">Case</option>
                    <option value="SSD">SSD</option>
                  </select>
                </div>
              </div>
              {/*filtered cards */}
              <div className="products container">
                {products
                  .filter((item) => {
                    return search.toLowerCase() == ""
                      ? item
                      : item.name.toLowerCase().includes(search);
                  })
                  .filter((selected) => {
                    return select == undefined
                      ? selected
                      : selected.category.includes(select);
                  })

                  .map((product) => {
                    return (
                      <div className="product-card2" key={product._id}>
                        <div>
                          <Link
                            key={product._id}
                            to={`/product/${product._id}`}
                            className="remove-underline"
                          >
                            <img
                              className="productImg"
                              src={product.image}
                              alt="Item"
                            />

                            <div className="product-details">
                              <div className="row">
                                <div className="col-9">
                                  <span className="product-catagory text-center text-success">
                                    {product.category}
                                  </span>
                                </div>
                              </div>
                              <h4 className="text-center">{product.name}</h4>
                              <p>{product.description}</p>
                              <div className="bottom">
                                <div className="col">
                                  {product.inStock ? (
                                    <div className="inStock mt-1 text-center">
                                      In Stock
                                    </div>
                                  ) : (
                                    <div className="outOfStock mt-1 text-center">
                                      Out Of Stock!
                                    </div>
                                  )}
                                </div>
                                <div className="col text-center">
                                  <span className="product-price">
                                    {product.price}₪
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                        <div className="btns text-center mt-1">
                          <div className="row">
                            {/*edit button in card*/}
                            <div className="col w-33 d-flex justify-content-center">
                              <Link
                                to={`edit/${product._id}`}
                                className="btn btn-secondary mx-1 w-100"
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
                                Edit
                              </Link>
                            </div>
                            {/*delete product button */}
                            <div className="col w-33 d-flex justify-content-center">
                              <DeleteModal
                                handleDeleteProduct={handleDeleteProduct}
                                product={product}
                                className=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}

      <Footer />
    </>
  );
}

export default AdminPanel;

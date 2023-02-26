import { Link } from "react-router-dom";
import "../css/card.css";

function Card(props) {
  return (
    <>
      <Link to={`/product/${props._id}`} className="remove-underline">
        <div className="product-card">
          <img className="productImg" src={props.image} alt="Item" />

          {/* Product Details */}
          <div className="product-details">
            {/* Product Category */}
            <div className="row">
              <div className="col-9">
                <span className="product-catagory text-center text-success">
                  {props.category}
                </span>
              </div>
            </div>

            {/* Product Name and Description */}
            <h4 className="text-center">{props.name}</h4>
            <p className="text-center text-dark">{props.description}</p>

            {/* Product Stock and Price */}
            <div className="bottom">
              <div className="col">

                {/* In Stock or Out of Stock */}
                {props.inStock ? (
                  <div className="inStock mt-1 text-center">In Stock</div>
                ) : (
                  <div className="outOfStock mt-1 text-center">
                    Out Of Stock!
                  </div>
                )}
              </div>

              {/* Product Price */}
              <div className="col text-center">
                <span className="product-price">{props.price}₪</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default Card;

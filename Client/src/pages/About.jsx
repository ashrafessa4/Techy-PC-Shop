import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/about.css";
function AboutUs() {
  return (
    <>
      <Navbar />
      <video autoPlay loop muted className="my-video">
        <source src="/16th.mp4" type="video/mp4" />
      </video>
      <div className="container pt-2 pb-4 main">
        <div className="text-center pt-5 text-success">
          {/*header*/}
          <span className="display-4">Techy</span>
          <h6 className="m-0">Technology at it's finest</h6>
          <h6>For any budget</h6>
        </div>
        <hr className="mt-4 mb-5 horzline" />
        <div className="row my-5">
          {/*Contact us*/}
          <div className="contact-us-container">
            <h2 className="contact-us-header text-center text-success display-5">
              CONTACT US
            </h2>
            <div className="contact-us-info text-center d-flex justify-content-between display-6">
              <div className="contact-us-left">
                <i
                  className="fas fa-phone-alt fa-lg contact-us-icon align-left2"
                  style={{ color: "green" }}
                ></i>
                &nbsp;&nbsp;
                <span className="text-white contact-us-text">{`0509617061`}</span>
                <br />
                <i
                  className="fas fa-user fa-lg contact-us-icon align-left1"
                  style={{ color: "green" }}
                ></i>
                &nbsp;
                <span className="text-white contact-us-text">{`Ashraf Essa`}</span>
              </div>
              <div className="contact-us-right">
                <a
                  href="mailto:ashrafataessa@live.com"
                  className="text-white contact-us-text"
                  style={{ textDecoration: "none" }}
                >{`ashrafataessa@live.com`}</a>
                &nbsp;
                <i
                  className="fas fa-envelope fa-lg contact-us-icon align-right2"
                  style={{ color: "green" }}
                ></i>
                <br />
                &nbsp;
                <a
                  href="https://github.com/ashrafessa4"
                  className="text-white contact-us-text"
                  style={{ textDecoration: "none" }}
                >{`https://github.com/ashrafessa4`}</a>
                <i
                  className="fab fa-github fa-lg contact-us-icon align-right1"
                  style={{ color: "green" }}
                ></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 pb-5">
          <h3 className="text-center mb-0">
            <span className="display-5 text-white">
              Website Functionalities
            </span>
          </h3>
        </div>
        <div className="row text-center">
          <div className="card col-12 col-md-6 col-lg-3 my-card bg-success">
            <h4 className="m-1">Home</h4>
            <p className="">
              The landing page that displays recently added products.
            </p>
          </div>
          <div className="card col-12 col-md-6 col-lg-3 my-card bg-info">
            <h4 className="m-1">Register</h4>
            <p className="">Allows new users to create an account.</p>
          </div>
          <div className="card col-12 col-md-6 col-lg-3 my-card bg-success">
            <h4 className="m-1">Sorting By Price</h4>
            <p className="">Allows users to sort products by price</p>
          </div>
          <div className="card col-12 col-md-6 col-lg-3 my-card bg-info">
            <h4 className="m-1">Navbar Products</h4>
            <p className="">
              Displays a list of products based on category (CPU, GPU, RAM, PSU)
              etc..
            </p>
          </div>
          <div className="card col-12 col-md-6 col-lg-3 my-card bg-success">
            <h4 className="m-1">Product Details</h4>
            <p className="">
              Displays more detailed information about a specific product.
            </p>
          </div>
          <div className="card col-12 col-md-6 col-lg-3 my-card bg-info">
            <h4 className="m-1">About</h4>
            <p className="">Provides some information about the website.</p>
          </div>
          <div className="card col-12 col-md-6 col-lg-3 my-card bg-success">
            <h4 className="m-1">Cart</h4>
            <p className="">
              Allows users to view the items in their cart and proceed to
              checkout.
            </p>
          </div>
          <div className="card col-12 col-md-6 col-lg-3 my-card bg-info">
            <h4 className="m-1">Admin Panel</h4>
            <p className="">
              A page that is only accessible to administrators. Provides access
              to manage the products in the store.
            </p>
          </div>
          <div className="card col-12 col-md-6 col-lg-3 my-card bg-success">
            <h4 className="m-1">PNF</h4>
            <p className="">
              A "page not found" page that is displayed when the user navigates
              to a page that doesn't exist.
            </p>
          </div>
        </div>
        <div className="col-12 pb-5 pt-5">
          <h3 className="text-center mb-0">
            <span className="display-5 text-white">Shop Now</span>
          </h3>
        </div>
        <div className="explaination">
          <h4 className="text-center text-white">
            the ultimate destination for technology enthusiasts of all levels.
            Whether you're a seasoned tech guru or a beginner just starting to
            explore the world of technology, Techy has something for everyone.
            Our mission is to provide you with the latest and greatest in tech,
            at a price point that fits any budget.
            <hr className="mt-2 mb-2 horzline" />
            At Techy, we believe that technology should be accessible to
            everyone, which is why we offer an extensive selection of products
            and services that cater to all kinds of tech needs. From the latest
            laptops and smartphones to cutting-edge gaming consoles and smart
            home devices, our range of products is second to none.
            <hr className="mt-2 mb-2 horzline" />
            But that's not all – we also offer a variety of resources and tools
            to help you get the most out of your tech. Our team of experts is
            always on hand to provide advice and guidance, and our website is
            packed with informative articles, tutorials, and reviews to keep you
            up to date on the latest tech trends.
            <hr className="mt-2 mb-2 horzline" />
            So whether you're looking to upgrade your existing tech or dive
            headfirst into the world of technology, Techy is your one-stop-shop
            for all things tech. Join our community today and experience
            technology at its finest!
          </h4>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AboutUs;

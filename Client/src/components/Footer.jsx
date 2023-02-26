import { Link } from "react-router-dom";
import "../css/footer.css";

function Footer() {
  return (
    <>
      <footer className="footer-section">
        <div className="container">
          <div className="footer-content pt-2 pb-2">
            <div className="row">
              <div className="col-xl-1 pb">
                <Link to="/"> {/* logo link */}
                  <img
                    className="navLogofooter img-fluid "
                    src="../../Logo.png"
                    alt="Logo"
                  />
                </Link>
              </div>
              <div className="col-xl-8 mb-50">
                <div className="footer-widget">
                  <div className="footer-text">
                    <p>
                      {/* footer text */}
                      <span className="text-success">Techy</span> is a one-stop-shop for all your technology needs, offering a wide range of cutting-edge gadgets, devices, and accessories. From smartphones and laptops to smart home devices and gaming gear, <span className="text-success">Techy</span> has everything you need to stay up-to-date with the latest trends and innovations in the tech world,
                      At <span className="text-success">Techy</span>, we pride ourselves on offering the best products at the best prices, with unbeatable customer service and support.
                      Whether you're a tech enthusiast or a casual user, <span className="text-success">Techy</span> has everything you need to stay connected and productive in today's digital world
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 mb-50">
                <div className="footer-widget">
                  <div className="footer-widget-heading">
                    <h3 className="text-center">Links</h3> 
                    <div className="text-center">
                      <div>
                        <Link className="link" to="/CPU">
                          CPU
                        </Link>
                      </div>
                      <div>
                        <Link className="link" to="/GPU"> 
                          GPU
                        </Link>
                      </div>
                      <div>
                        <Link className="link" to="/RAM"> 
                          RAM
                        </Link>
                      </div>
                      <div>
                        <Link className="link" to="/PSU">
                          PSU
                        </Link>
                      </div>
                      <div>
                        <Link className="link" to="/About"> 
                          About/Contact-us
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="end-area">
          <div className="container">
            <div className="text-center">
              <div className="end-text">
                <span className="text-white">Created By Ashraf Essa Copyright 2023</span> {/* below footer text */}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;

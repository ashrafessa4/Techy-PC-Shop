import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/card.css";
import { getAllProducts } from "../services/productsService";

import Card from "../components/Card";
import Loading from "../components/Loading";

function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const CPUCAT = products.filter((item) => item.category == "CPU");
  const GPUCAT = products.filter((item) => item.category == "GPU");
  const RAMCAT = products.filter((item) => item.category == "RAM");
  const MotherCAT = products.filter((item) => item.category == "Motherboard");
  const PSUCAT = products.filter((item) => item.category == "PSU");
  const CaseCAT = products.filter((item) => item.category == "Case");
  const SSDCAT = products.filter((item) => item.category == "SSD");

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
  }, []);

  return (
    <>
      <Navbar />
      {/*background video*/}
      <video autoPlay loop muted className="my-video">
        <source src="/third.mp4" type="video/mp4" />
      </video>
      {isLoading ? (
        <div className="container main">
          <div className="mb-4 m-1">
            <h1 className="text-center pt-3">
              <span className="tapered2 text-white display-1">
                Budget PC Building
              </span>
            </h1>
            <p className="text-center mb-3 text-white display-6">
              All Components To Build A Cheap PC
            </p>
          </div>

          <h1 className="boldTitle text-center m-4">
            <span className="tapered2 text-white">
              <u>Central Processing Unit</u>
            </span>
          </h1>

          <div className="row width mx-auto">
            <div className="col-8 px-5">
              <h5 className="text-success text-center">
                i3 13100F Processor: Performance and Affordability Combined
              </h5>
              <div
                style={{ maxHeight: "32rem", overflow: "hidden" }}
                className="text-white text-center"
              >
                <p>
                  The i3 13100F is a powerful processor that has recently been
                  released by Intel. With its quad-core and eight-thread
                  architecture, this processor can handle a wide range of tasks
                  with ease, from everyday browsing and office work to more
                  demanding tasks such as gaming and content creation. What
                  makes the i3 13100F particularly attractive is its affordable
                  price point, making it accessible to budget-conscious PC
                  builders who want to get the most out of their machines
                  without breaking the bank.
                </p>
                <hr />
                <p>
                  At its core, the i3 13100F has a base clock speed of 3.6 GHz
                  and can reach up to 4.2 GHz in turbo mode. It also has 6 MB of
                  L3 cache and supports DDR4 memory at speeds of up to 3200 MHz.
                  When paired with a dedicated graphics card, the i3 13100F can
                  deliver impressive gaming performance, thanks to its support
                  for Intel's Hyper-Threading technology, which allows for
                  efficient multitasking and improved performance in threaded
                  applications.
                </p>
                <hr />
                <p>
                  The i3 13100F is also built on Intel's 10th generation Comet
                  Lake architecture, which means it has access to features such
                  as Intel Quick Sync Video, Intel Virtualization Technology,
                  and Intel Optane Memory. These features help to further
                  enhance the performance of the processor and provide a more
                  responsive and efficient computing experience.
                </p>
              </div>
            </div>
            <div className="col-4 text-center">
            {CPUCAT.filter((item) => item.inStock)
                .sort((a, b) => a.price - b.price)
                .slice(0, 1).length ? (
                CPUCAT.filter((item) => item.inStock)
                  .sort((a, b) => a.price - b.price)
                  .slice(0, 1)
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
                  })
              ) : (
                <Loading />
              )}
            </div>
          </div>

          <hr className="horzline mt-4 mb-4 mx-auto w-75" />

          <div className="row width mx-auto">
            <div className="col-4 text-center">
            {GPUCAT.filter((item) => item.inStock)
                .sort((a, b) => a.price - b.price)
                .slice(0, 1).length ? (
                GPUCAT.filter((item) => item.inStock)
                  .sort((a, b) => a.price - b.price)
                  .slice(0, 1)
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
                  })
              ) : (
                <Loading />
              )}
            </div>
            <div className="col-8 px-5">
              <h5 className="text-success text-center">
                GT 730 Graphics Card: Enhanced Visual Experience
              </h5>
              <div
                style={{ maxHeight: "32rem", overflow: "hidden" }}
                className="text-white text-center"
              >
                <p>
                  The GT 730 is a budget-friendly graphics card from Nvidia that
                  delivers enhanced visual performance for your PC. With its 384
                  CUDA cores, this graphics card is capable of running games at
                  1080p and handling high definition video playback with ease.
                  It also supports DirectX 12 and OpenGL 4.4, which makes it
                  compatible with a wide range of games and applications.
                </p>
                <hr />
                <p>
                  The GT 730 is built on Nvidia's Kepler architecture and comes
                  with 2GB of DDR3 memory. It has a base clock speed of 902 MHz
                  and a memory clock speed of 1600 MHz. It also supports
                  Nvidia's Adaptive V-Sync technology, which eliminates screen
                  tearing and stuttering for a smoother gaming experience.
                </p>
                <hr />
                <p>
                  In addition to gaming, the GT 730 is also a great choice for
                  video editing and other graphic-intensive applications. It
                  supports Nvidia's CUDA technology, which enables faster video
                  rendering and editing. It also has a low power consumption of
                  only 49 watts, which makes it a great option for systems with
                  limited power supplies.
                </p>
              </div>
            </div>
          </div>

          <hr className="horzline mt-4 mb-4 mx-auto w-75" />
          <h1 className="boldTitle text-center m-4">
            <span className="tapered2 text-white">
              <u>Random Access Memory</u>
            </span>
          </h1>

          <div className="row width mx-auto">
            <div className="col-8 px-5">
              <h5 className="text-success text-center">
                Kingston ValueRAM 8GB DDR4 3200MHz CL22: Efficient and Reliable
                Memory
              </h5>
              <div
                style={{ maxHeight: "32rem", overflow: "hidden" }}
                className="text-white text-center"
              >
                <p>
                  Kingston ValueRAM 8GB DDR4 3200MHz CL22 is a reliable and
                  efficient memory module that is designed to work with a
                  variety of systems. With a speed of 3200MHz and a CAS latency
                  of 22, this memory module provides fast and efficient
                  performance for demanding applications, such as gaming and
                  content creation. It is also compatible with Intel XMP
                  profiles, which allows for easy overclocking and optimization.
                </p>
                <hr />
                <p>
                  The Kingston ValueRAM 8GB DDR4 3200MHz CL22 is made with
                  high-quality components and undergoes rigorous testing to
                  ensure reliability and performance. It is also backed by a
                  limited lifetime warranty, giving you peace of mind knowing
                  that you are getting a quality product.
                </p>
                <hr />
                <p>
                  If you are looking to upgrade your system's memory, the
                  Kingston ValueRAM 8GB DDR4 3200MHz CL22 is an excellent
                  choice. With its fast and efficient performance, compatibility
                  with a variety of systems, and reliable design, it is sure to
                  meet your needs and exceed your expectations.
                </p>
              </div>
            </div>
            <div className="col-4 text-center">
            {RAMCAT.filter((item) => item.inStock)
                .sort((a, b) => a.price - b.price)
                .slice(0, 1).length ? (
                RAMCAT.filter((item) => item.inStock)
                  .sort((a, b) => a.price - b.price)
                  .slice(0, 1)
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
                  })
              ) : (
                <Loading />
              )}
            </div>
          </div>
          <hr className="horzline mt-4 mb-4 mx-auto w-75" />
          <h1 className="boldTitle text-center m-4">
            <span className="tapered2 text-white">
              <u>Motherboard</u>
            </span>
          </h1>
          <div className="row width mx-auto">
            <div className="col-4 text-center">
            {MotherCAT.filter((item) => item.inStock)
                .sort((a, b) => a.price - b.price)
                .slice(0, 1).length ? (
                MotherCAT.filter((item) => item.inStock)
                  .sort((a, b) => a.price - b.price)
                  .slice(0, 1)
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
                  })
              ) : (
                <Loading />
              )}
            </div>
            <div className="col-8 px-5">
              <h5 className="text-success text-center">
                Gigabyte H610M H Rev 1.0 DDR4 LGA1700
              </h5>
              <p
                style={{ maxHeight: "32rem", overflow: "hidden" }}
                className="text-white text-center"
              >
                The Gigabyte H610M H Rev 1.0 is a micro-ATX motherboard that
                supports the latest 11th Gen Intel Core processors with LGA 1700
                socket. It features dual-channel DDR4 memory support and PCIe
                4.0 M.2 and PCIe 3.0 x16 slots for high-speed data transfer.
                With its Realtek Gigabit LAN and Realtek ALC887 audio codec,
                this motherboard offers stable and reliable connectivity and
                audio performance. It also has HDMI 2.0 and DVI-D ports for
                smooth 4K video playback and dual-display support.
              </p>
            </div>
          </div>

          <hr className="horzline mt-4 mb-4 mx-auto w-75" />
          <h1 className="boldTitle text-center m-4">
            <span className="tapered2 text-white">
              <u>Power Supply Unit</u>
            </span>
          </h1>
          <div className="row width mx-auto">
            <div className="col-8 px-5">
              <h5 className="text-success text-center">Antec Atom B650 12cm</h5>
              <p
                style={{ maxHeight: "32rem", overflow: "hidden" }}
                className="text-white text-center"
              >
                The Antec Atom B650 12cm is a high-performance power supply unit
                with a 120mm fan for efficient cooling and quiet operation. It
                delivers a continuous power output of 650W and features an 80
                PLUS Bronze certification for high efficiency and low power
                consumption. It also has a full range of protection features,
                including over voltage, under voltage, over power, short
                circuit, and over temperature protection, ensuring stable and
                safe operation. With its fully modular cables, this PSU offers
                easy cable management and a clean build.
              </p>
            </div>
            <div className="col-4 text-center">
            {PSUCAT.filter((item) => item.inStock)
                .sort((a, b) => a.price - b.price)
                .slice(0, 1).length ? (
                PSUCAT.filter((item) => item.inStock)
                  .sort((a, b) => a.price - b.price)
                  .slice(0, 1)
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
                  })
              ) : (
                <Loading />
              )}
            </div>
          </div>

          <hr className="horzline mt-4 mb-4 mx-auto w-75" />
          <h1 className="boldTitle text-center m-4">
            <span className="tapered2 text-white">
              <u>Case</u>
            </span>
          </h1>
          <div className="row width mx-auto">
            <div className="col-4 text-center">
            {CaseCAT.filter((item) => item.inStock)
                .sort((a, b) => a.price - b.price)
                .slice(0, 1).length ? (
                CaseCAT.filter((item) => item.inStock)
                  .sort((a, b) => a.price - b.price)
                  .slice(0, 1)
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
                  })
              ) : (
                <Loading />
              )}
            </div>
            <div className="col-8 px-5">
              <h5 className="text-success text-center">
                Sharkoon RGB Slider ATX: Style and Functionality Combined
              </h5>
              <div
                style={{ maxHeight: "32rem", overflow: "hidden" }}
                className="text-white text-center"
              >
                <p>
                  The Sharkoon RGB Slider ATX is a stylish and functional case
                  that is perfect for any gaming PC build. With its sleek black
                  design and customizable RGB lighting, this case will make your
                  PC stand out from the rest. But it's not just about looks -
                  this case is also packed with features that make building and
                  maintaining your PC a breeze.
                </p>
                <hr />
                <p>
                  The Sharkoon RGB Slider ATX has plenty of room for all your
                  components, including graphics cards up to 380mm in length and
                  CPU coolers up to 160mm in height. It also comes with two
                  pre-installed 120mm fans and has room for up to six fans in
                  total, so you can keep your system running cool and quiet.
                  Plus, with its tool-free design and cable management system,
                  this case makes building and upgrading your PC easy and
                  hassle-free.
                </p>
                <hr />
                <p>
                  Other features of the Sharkoon RGB Slider ATX include a
                  tempered glass side panel, a removable dust filter, and
                  support for liquid cooling systems. Whether you're a seasoned
                  PC builder or just starting out, this case has everything you
                  need to create a powerful and stylish gaming PC.
                </p>
              </div>
            </div>
          </div>
          <h1 className="boldTitle text-center m-4">
            <span className="tapered2 text-white">
              <u>SSD</u>
            </span>
          </h1>
          <div className="row width mx-auto">
            <div className="col-8 px-5">
              <h5 className="text-success text-center">
                Samsung 870 EVO 2.5 1TB: Fast and Reliable SSD
              </h5>
              <div
                style={{ maxHeight: "32rem", overflow: "hidden" }}
                className="text-white text-center"
              >
                <p>
                  The Samsung 870 EVO 2.5 1TB is a fast and reliable SSD that's
                  perfect for anyone looking to speed up their system. With its
                  1TB capacity, it has plenty of room for all your files, and
                  with read and write speeds of up to 560MB/s and 530MB/s
                  respectively, it's one of the fastest SSDs on the market.
                </p>
                <hr />
                <p>
                  The 870 EVO also features Samsung's latest V-NAND technology,
                  which provides up to 30% higher endurance and up to 20% faster
                  random write speeds than the previous generation. And with a
                  5-year limited warranty, you can be sure that your investment
                  is protected.
                </p>
              </div>
            </div>
            <div className="col-4 text-center">
              {SSDCAT.filter((item) => item.inStock)
                .sort((a, b) => a.price - b.price)
                .slice(0, 1).length ? (
                SSDCAT.filter((item) => item.inStock)
                  .sort((a, b) => a.price - b.price)
                  .slice(0, 1)
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
                  })
              ) : (
                <Loading />
              )}
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

export default Home;

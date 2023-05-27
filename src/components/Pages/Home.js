import React from "react";
import { RecentCar } from "../Home/RecentCar"
import FunFacts from "../Home/FunFacts"
import Testimonial from "../Home/Testimonial";
import Header from "../Menu/Header";
import Footer from "../Menu/Footer";
const Home = () => {
  return (
    <div>
      <Header />
      <div className="">
        <section id="banner" className="banner-section">
          <div className="container">
            <div className="div_zindex">
              <div className="row">
                <div className="col-md-5 col-md-push-7">
                  <div className="banner_content">
                    <h1>&nbsp;</h1>
                    <p>&nbsp; </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <RecentCar />
        <FunFacts />
        <Testimonial />
      </div>
      <Footer />
    </div>
  );
};
export default Home;

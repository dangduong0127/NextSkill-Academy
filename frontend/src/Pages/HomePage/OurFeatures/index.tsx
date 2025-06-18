import React from "react";
import "./styles.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const OurFeatures = () => {
  return (
    <React.Fragment>
      <section className="OurFeatures-section">
        <div className="container">
          <div className="heading">
            <h2>Our Featured Courses</h2>
            <p>
              Explore our most popular courses designed to help you develop new
              skills and achieve your goals.
            </p>
          </div>

          <Swiper spaceBetween={50} slidesPerView={1}>
            <SwiperSlide></SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
          </Swiper>
        </div>
      </section>
    </React.Fragment>
  );
};

export default OurFeatures;

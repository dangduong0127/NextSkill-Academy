import React from "react";
import "./styles.scss";
// import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

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
          {/* carousel */}
          {/* <Swiper spaceBetween={50} slidesPerView={1}>
            <SwiperSlide>slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
          </Swiper> */}

          <div className="courses-featured-container">
            <div className="course-card">
              <div className="card-header">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-20 w-20 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>

                <div className="tag-status-course">BESTSELLER</div>
              </div>

              <div className="card-body">
                <div className="card-tag">Web Development</div>
                <div className="card-rating">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-yellow-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  4.9
                </div>

                <div className="card-title">
                  <h3>Full-Stack Web Development Bootcamp</h3>
                </div>
                <div className="card-description">
                  Master HTML, CSS, JavaScript, React, Node.js and more to
                  become a professional web developer.
                </div>
              </div>
              <div className="card-footer">
                <div className="card-price">$89.99</div>
                <Button variant="contained">Enroll now</Button>
              </div>
            </div>

            <div className="course-card">
              <div className="card-header">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-20 w-20 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>

                <div className="tag-status-course">BESTSELLER</div>
              </div>

              <div className="card-body">
                <div className="card-tag">Web Development</div>
                <div className="card-rating">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-yellow-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  4.9
                </div>

                <div className="card-title">
                  <h3>Full-Stack Web Development Bootcamp</h3>
                </div>
                <div className="card-description">
                  Master HTML, CSS, JavaScript, React, Node.js and more to
                  become a professional web developer.
                </div>
              </div>
              <div className="card-footer">
                <div className="card-price">$89.99</div>
                <Button variant="contained">Enroll now</Button>
              </div>
            </div>

            <div className="course-card">
              <div className="card-header">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-20 w-20 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>

                <div className="tag-status-course">BESTSELLER</div>
              </div>

              <div className="card-body">
                <div className="card-tag">Web Development</div>
                <div className="card-rating">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-yellow-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  4.9
                </div>

                <div className="card-title">
                  <h3>Full-Stack Web Development Bootcamp</h3>
                </div>
                <div className="card-description">
                  Master HTML, CSS, JavaScript, React, Node.js and more to
                  become a professional web developer.
                </div>
              </div>
              <div className="card-footer">
                <div className="card-price">$89.99</div>
                <Button variant="contained">Enroll now</Button>
              </div>
            </div>

            <div className="view-all-courses">
              <Button component={Link} to="/courses" variant="outlined">
                View All Course
              </Button>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default OurFeatures;

import React from "react";
import { Typography, Button } from "@mui/material";
import "./styles.scss";
const HeroSection = () => {
  return (
    <React.Fragment>
      <section className="hero-section">
        <div className="container">
          <div className="hero-inner">
            <div className="col-hero-left">
              <Typography component={"h1"}>
                Unlock Your Potential with Excellence Academy
              </Typography>
              <Typography component={"p"}>
                Discover a world of knowledge with our expert-led courses
                designed to help you achieve your goals and advance your career.
              </Typography>
              <div className="group-button">
                <Button className="btn-explore" variant="contained">
                  Explore Course
                </Button>
                <Button className="btn-learnMore" variant="outlined">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="col-hero-right">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-64 w-64 md:h-96 md:w-96 text-white opacity-90"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                ></path>
                <circle cx="12" cy="12" r="8" strokeWidth="1"></circle>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M9 12l2 2 4-4"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default HeroSection;

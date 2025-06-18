import React from "react";
import { Typography } from "@mui/material";
import "./styles.scss";
const Statistics = () => {
  return (
    <React.Fragment>
      <section className="statistics-section">
        <div className="container">
          <div className="statistics-inner">
            <div className="col-inner">
              <Typography component={"span"}>50+</Typography>
              <Typography component={"p"}>Expert Instructors</Typography>
            </div>

            <div className="col-inner">
              <Typography component={"span"}>200+</Typography>
              <Typography component={"p"}>Courses Available</Typography>
            </div>

            <div className="col-inner">
              <Typography component={"span"}>15k+</Typography>
              <Typography component={"p"}>Students Enrolled</Typography>
            </div>

            <div className="col-inner">
              <Typography component={"span"}>98%</Typography>
              <Typography component={"p"}>Satisfaction Rate</Typography>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Statistics;

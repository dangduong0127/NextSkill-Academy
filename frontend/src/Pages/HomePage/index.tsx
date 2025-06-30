// import { Typography, Container, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import type { AppDispatch } from "../../app/store";
import { fetchAllUsers } from "../../features/users/userSlice";
import { checkAuthThunk } from "../../features/auth/authSlice";
import "./styles.scss";
import HeroSection from "./Hero";
import Statistics from "./Statistics";
import OurFeatures from "./OurFeatures";
import AboutSection from "./About";
import TestimonialsSection from "./Testimonials";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();

  // const { loading, error } = useSelector((state: RootState) => state.users);
  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(checkAuthThunk());
  }, [dispatch]);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <p>Error occurred</p>;

  return (
    <>
      {/* <Container>
        <Typography variant="h1" component="h1">
          Trang chủ
        </Typography>

        <ul>
          {users.map((user: IUser) => {
            return (
              <li key={user._id}>
                {user.name} {user._id}
              </li>
            );
          })}
        </ul>

        <Button
          onClick={() =>
            dispatch(
              updateUserThunk({
                userId: "682c491533989fa58d3c9909",
                data: {
                  name: "Danny Dang",
                  email: "jondang@gmail.com",
                },
              })
            )
          }
        >
          Update User
        </Button>
      </Container> */}
      {/* {imageUrl && (
        <div className="view-image-container">
          <img
            src={import.meta.env.VITE_API_URL + "/src/uploads/" + imageUrl}
          />
          <CancelIcon
            className="close-image"
            onClick={() => setImageUrl(null)}
          />
        </div>
      )} */}
      <HeroSection />
      <Statistics />
      <OurFeatures />
      <AboutSection />
      <TestimonialsSection />
      <section style={{ display: "flex", justifyContent: "center" }}>
        <div className="container">
          <video autoPlay loop style={{ width: "100%", borderRadius: "10px" }}>
            <source
              src={`${import.meta.env.VITE_API_URL}/src/uploads/Purple Orange Modern Online Course Video.mp4`}
              type="video/mp4"
            />
          </video>
        </div>
      </section>
    </>
  );
};

export default HomePage;

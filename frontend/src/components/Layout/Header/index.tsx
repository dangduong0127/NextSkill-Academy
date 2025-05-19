import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import { Container } from "@mui/material";

const Header = () => {
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(
        "https://duhocinec.com/wp-json/wp/v2/country"
      );
      const data = await response.json();
      console.log(data);
    };
    fetchApi();
  }, []);

  return (
    <>
      <header>
        <Container>
          <div className="branch">
            <img
              src="http://localhost:3003/src/uploads/academy-logo-element-vector-illustration-decorative-design-191487693.jpg"
              alt="branch"
              className="logo"
            />
          </div>
          <nav>
            <a href="" className="nav-item">
              Home
            </a>
            <a href="" className="nav-item">
              About
            </a>
            <a href="" className="nav-item">
              Members
            </a>
            <a href="" className="nav-item">
              Events
            </a>
            <a href="" className="nav-item">
              Blogs
            </a>
            <a href="" className="nav-item">
              Contact
            </a>
          </nav>

          <div className="actions">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </Container>
      </header>
    </>
  );
};

export default Header;

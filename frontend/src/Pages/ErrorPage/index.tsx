import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.scss";

const ErrorPage = () => {
  return (
    <section className="error-page">
      <Typography variant="h2">404, Không tìm thấy trang!!!</Typography>
      <Button component={Link} to="/" variant="contained">
        Quay lại trang chủ
      </Button>
    </section>
  );
};

export default ErrorPage;

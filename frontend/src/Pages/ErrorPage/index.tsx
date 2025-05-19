import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <Typography variant="h2">404, Không tìm thấy trang!!!</Typography>
      <Button component={Link} to="/" variant="contained">
        Quay lại trang chủ
      </Button>
    </>
  );
};

export default ErrorPage;

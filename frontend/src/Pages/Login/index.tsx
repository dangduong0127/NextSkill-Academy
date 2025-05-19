import { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import "../Register/styles.scss";
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((item) => {
      return {
        ...item,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Box className="form-wrapper">
        <Box
          className="form-content"
          component="form"
          onSubmit={handleSubmit}
          sx={{ bgcolor: "primary.light" }}
        >
          <Typography variant="h4" align="center" fontWeight={600}>
            Đăng Nhập
          </Typography>

          <TextField
            type="text"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <TextField
            type="password"
            name="password"
            label="Nhập mật khẩu"
            value={formData.password}
            onChange={handleChange}
          />

          <Button type="submit" variant="contained" sx={{ marginTop: "10px" }}>
            Đăng nhập
          </Button>
        </Box>
      </Box>
    </>
  );
};
export default LoginPage;

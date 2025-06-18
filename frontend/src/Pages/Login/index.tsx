import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import "../Register/styles.scss";
import type { IformLogin } from "../../utils/types";
import { login } from "../../utils/axios";
import { useNotifier } from "../../components/Notifier/messageContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { notify } = useNotifier();
  const [formData, setFormData] = useState<IformLogin>({
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

  const validate = () => {
    if (formData.email === "" || formData.password === "") {
      alert("Vui lòng nhập đầy đủ thông tin");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validate();
    if (validate()) {
      const res = await login(formData);
      const result = res.data;
      console.log(result);
      if (result.status === 200) {
        notify("success", "Login successfully");
        localStorage.setItem("userInfo", JSON.stringify(result?.userInfo));
        navigate("/");
      }
    }
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

          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            component={Link}
            to="/register"
          >
            Bạn chưa có tài khoản? Đăng ký ngay!
          </Typography>

          <Button type="submit" variant="contained" sx={{ marginTop: "10px" }}>
            Đăng nhập
          </Button>
        </Box>
      </Box>
    </>
  );
};
export default LoginPage;

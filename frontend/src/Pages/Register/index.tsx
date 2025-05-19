import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import "./styles.scss";
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    gender: "",
    password: "",
    dateOfBirth: "",
    repeat_password: "",
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

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((item) => {
      return { ...item, gender: event.target.value };
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
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
            Đăng ký
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
            type="tel"
            label="Số điện thoại"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Giới tính</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={formData.gender || "female"}
              name="gender"
              onChange={handleChangeRadio}
            >
              <FormControlLabel
                value={"female"}
                control={<Radio />}
                label="Nữ"
              />
              <FormControlLabel
                value={"male"}
                control={<Radio />}
                label="Nam"
              />
              <FormControlLabel
                value={"other"}
                control={<Radio />}
                label="Khác"
              />
            </RadioGroup>
          </FormControl>

          <TextField
            type="date"
            name="dateOfBirth"
            label="Ngày sinh"
            value={formData.dateOfBirth}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            type="password"
            name="password"
            label="Nhập mật khẩu"
            value={formData.password}
            onChange={handleChange}
          />

          <TextField
            type="password"
            name="repeat_password"
            label="Nhập lại mật khẩu"
            value={formData.repeat_password}
            onChange={handleChange}
          />

          <Button type="submit" variant="contained" sx={{ marginTop: "10px" }}>
            Đăng ký
          </Button>
        </Box>
      </Box>
    </>
  );
};
export default RegisterPage;

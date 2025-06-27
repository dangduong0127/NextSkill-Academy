import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  Select,
  MenuItem,
  InputLabel,
  type SelectChangeEvent,
} from "@mui/material";
import "./styles.scss";
import { register } from "../../utils/axios";
import type { IformRegister, Province } from "../../utils/types";

const RegisterPage = () => {
  const [formData, setFormData] = useState<IformRegister>({
    fullName: "",
    email: "",
    phone: "",
    gender: "female",
    password: "",
    dateOfBirth: "",
    repeat_password: "",
    address: "",
  });
  const [province, setProvince] = useState<Province[] | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((item) => {
      return {
        ...item,
        [name]: value,
      };
    });
  };

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setFormData((item) => {
      return {
        ...item,
        address: event.target.value,
      };
    });
  };

  const validate = (form: IformRegister) => {
    if (!form.email) {
      alert("Email không được để trống");
      return false;
    }
    if (!form.phone) {
      alert("Số điện thoại không được để trống");
      return false;
    }

    if (!form.password) {
      alert("Mật khẩu không được để trống");
      return false;
    }

    if (form.repeat_password !== form.password) {
      alert("Mật khẩu không trùng khớp!");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate(formData)) return;
    try {
      const res = await register(formData);
      alert(res.data.message);
    } catch (err) {
      console.log(err);
      alert("Đã có lỗi xảy ra!");
    }
  };

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/p/")
      .then((res) => res.json())
      .then(setProvince)
      .catch(console.error);
  }, []);
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
            label="Họ và tên"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />

          <TextField
            type="text"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            type="tel"
            label="Số điện thoại"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Giới tính</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              value={formData.gender || "female"}
              name="gender"
              onChange={handleChange}
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

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Address</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData.address}
              label="Address"
              name="address"
              onChange={handleChangeSelect}
            >
              {province &&
                province.map((item) => {
                  return (
                    <MenuItem key={item.code} value={item.name}>
                      {item.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>

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

          <Typography
            variant="body1"
            component={Link}
            to={"/login"}
            color="text.secondary"
            width={"fit-content"}
          >
            Đã có tài khoản? Đăng nhập ngay!
          </Typography>

          <Button type="submit" variant="contained" sx={{ marginTop: "10px" }}>
            Đăng ký
          </Button>
        </Box>
      </Box>
    </>
  );
};
export default RegisterPage;

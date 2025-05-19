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
} from "@mui/material";
import "./styles.scss";
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    gender: "",
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
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "500px",
          backgroundColor: "#ccc",
          padding: "20px",
          borderRadius: "7px",
        }}
      >
        <Typography variant="h6" align="center">
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
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={formData.gender || "female"}
            name="gender"
            onChange={handleChangeRadio}
          >
            <FormControlLabel value={"female"} control={<Radio />} label="Nữ" />
            <FormControlLabel value={"male"} control={<Radio />} label="Nam" />
            <FormControlLabel
              value={"other"}
              control={<Radio />}
              label="Khác"
            />
          </RadioGroup>

          <TextField type="submit" value={"Submit"} />
        </FormControl>
      </Box>
    </>
  );
};
export default RegisterPage;

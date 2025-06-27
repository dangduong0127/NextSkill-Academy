import {
  Avatar,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import type { IUser } from "../../../utils/types";
import "./styles.scss";

interface IOverviewProps {
  data: IUser | null;
}

const Overview = ({ data }: IOverviewProps) => {
  console.log(data);
  return (
    <div className="main-userprofile">
      <div className="main-userprofile-header"></div>
      <form action="">
        <div className="header-form">
          <div className="header-form-left">
            <Avatar
              src={`${import.meta.env.VITE_API_URL}/src/uploads/${data?.avatar}`}
              alt="avatar"
              sx={{ width: "100px", height: "100px" }}
            />
            <div>
              <h3>{data?.fullName ?? "No name"}</h3>
              <p>Email: {data?.email}</p>
            </div>
          </div>
          <div className="header-form-right">
            <Button
              variant="contained"
              sx={{
                borderRadius: "10px",
                padding: "7px 30px",
                textTransform: "none",
                fontSize: "1.2rem",
              }}
            >
              Edit
            </Button>
          </div>
        </div>

        <div className="body-form">
          <div className="body-form-left">
            <FormControl sx={{ width: "100%" }}>
              <FormLabel htmlFor="fullName">Full name</FormLabel>
              <TextField
                id="fullName"
                variant="outlined"
                placeholder="Your full name"
                value={data?.fullName ?? ""}
                onChange={(e) => console.log(e.target.value)}
                className="custom-textfield"
              />
            </FormControl>

            <FormControl sx={{ width: "100%" }}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id=""
                variant="outlined"
                placeholder="Your email address"
                value={data?.email ?? ""}
                onChange={(e) => console.log(e.target.value)}
                className="custom-textfield"
                type="email"
              />
            </FormControl>

            <FormControl sx={{ width: "100%" }}>
              <FormLabel htmlFor="phoneNumber">Phone number</FormLabel>
              <TextField
                id=""
                variant="outlined"
                placeholder="Your phone number"
                value={`0${data?.phone ?? ""}`}
                onChange={(e) => console.log(e.target.value)}
                className="custom-textfield"
                type="text"
              />
            </FormControl>

            <FormControl sx={{ width: "100%" }}>
              <FormLabel htmlFor="age">Your age</FormLabel>
              <TextField
                id=""
                variant="outlined"
                placeholder="Your age"
                value={data?.age ?? ""}
                onChange={(e) => console.log(e.target.value)}
                className="custom-textfield"
                type="number"
              />
            </FormControl>
          </div>
          <div className="body-form-right">
            <FormControl sx={{ width: "100%" }}>
              <FormLabel htmlFor="address">Address</FormLabel>
              <TextField
                id=""
                variant="outlined"
                placeholder="Your address"
                value={data?.address ?? ""}
                onChange={(e) => console.log(e.target.value)}
                className="custom-textfield"
              />
            </FormControl>

            <FormControl sx={{ width: "100%" }}>
              <FormLabel htmlFor="fullName">Full name</FormLabel>
              <TextField
                id=""
                variant="outlined"
                placeholder="Your full name"
                value={data?.fullName ?? ""}
                onChange={(e) => console.log(e.target.value)}
                className="custom-textfield"
              />
            </FormControl>

            <FormControl sx={{ width: "100%" }}>
              <FormLabel htmlFor="fullName">Full name</FormLabel>
              <TextField
                id=""
                variant="outlined"
                placeholder="Your full name"
                value={data?.fullName ?? ""}
                onChange={(e) => console.log(e.target.value)}
                className="custom-textfield"
              />
            </FormControl>

            <FormControl sx={{ width: "100%" }}>
              <FormLabel htmlFor="fullName">Full name</FormLabel>
              <TextField
                id=""
                variant="outlined"
                placeholder="Your full name"
                value={data?.fullName ?? ""}
                onChange={(e) => console.log(e.target.value)}
                className="custom-textfield"
              />
            </FormControl>
          </div>
        </div>

        <div className="footer-form">
          <Typography
            component={"h3"}
            sx={{ fontSize: "22px", fontWeight: "600" }}
          >
            Change Password
          </Typography>
          <div className="footer-form-content">
            <FormControl sx={{ width: "80%" }}>
              <FormLabel htmlFor="fullName">Current Password</FormLabel>
              <TextField
                id=""
                variant="outlined"
                placeholder="Your full name"
              />

              <FormLabel htmlFor="fullName">New Password</FormLabel>
              <TextField
                id=""
                variant="outlined"
                placeholder="Your full name"
              />
            </FormControl>

            <FormControl sx={{ width: "20%" }}>
              <Button variant="contained" size="medium" color="success">
                Lưu
              </Button>
            </FormControl>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Overview;

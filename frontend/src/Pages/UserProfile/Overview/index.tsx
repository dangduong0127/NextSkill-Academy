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
  return (
    <div className="main-userprofile">
      <div className="main-userprofile-header"></div>
      <form action="">
        <div className="header-form">
          <div className="header-form-left">
            <Avatar
              src={data?.avatar}
              alt="avatar"
              sx={{ width: "100px", height: "100px" }}
            />
            <div>
              <h3>{data?.name ?? "No name"}</h3>
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
                value={data?.name ?? ""}
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
                value={data?.name ?? ""}
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
                value={data?.name ?? ""}
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
                value={data?.name ?? ""}
                onChange={(e) => console.log(e.target.value)}
                className="custom-textfield"
              />
            </FormControl>
          </div>
          <div className="body-form-right">
            <FormControl sx={{ width: "100%" }}>
              <FormLabel htmlFor="fullName">Full name</FormLabel>
              <TextField
                id=""
                variant="outlined"
                placeholder="Your full name"
                value={data?.name ?? ""}
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
                value={data?.name ?? ""}
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
                value={data?.name ?? ""}
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
                value={data?.name ?? ""}
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
            <FormControl sx={{ width: "50%" }}>
              <FormLabel htmlFor="fullName">Current Password</FormLabel>
              <TextField
                id=""
                variant="outlined"
                placeholder="Your full name"
              />
            </FormControl>
            <br />
            <FormControl sx={{ width: "50%" }}>
              <FormLabel htmlFor="fullName">New Password</FormLabel>
              <TextField
                id=""
                variant="outlined"
                placeholder="Your full name"
              />
            </FormControl>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Overview;

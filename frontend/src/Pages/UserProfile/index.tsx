import { useState } from "react";
import "./styles.scss";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { InputAdornment, TextField, Typography, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Overview from "./Overview";
import type { IUser } from "../../utils/types";

const UserProfile = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState("overview");
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview data={auth.user as IUser} />;
      case "orders":
        return <>Orders</>;
      case "address":
        return <>Address</>;
      case "users":
        return <>Users</>;
      default:
        return null;
    }
  };

  return (
    <section className="user-profile-wrapper">
      <div className="user-profile-container">
        <div className="user-profile-sidebar">
          <div className="sidebar-main">
            <div
              className={`sidebar-link ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              <img
                src={`${import.meta.env.VITE_API_URL}/src/uploads/element-4.svg`}
                alt=""
              />
            </div>

            <div
              className={`sidebar-link ${activeTab === "users" ? "active" : ""}`}
              onClick={() => setActiveTab("users")}
            >
              <img
                src={`${import.meta.env.VITE_API_URL}/src/uploads/element-4.svg`}
                alt=""
              />
            </div>

            <div
              className={`sidebar-link ${activeTab === "setting" ? "active" : ""}`}
              onClick={() => setActiveTab("setting")}
            >
              <img
                src={`${import.meta.env.VITE_API_URL}/src/uploads/element-4.svg`}
                alt=""
              />
            </div>

            <div
              className={`sidebar-link ${activeTab === "logout" ? "active" : ""}`}
              onClick={() => setActiveTab("logout")}
            >
              <img
                src={`${import.meta.env.VITE_API_URL}/src/uploads/element-4.svg`}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="user-profile-main">
          <div className="userprofile-header">
            <div className="userprofile-header-left">
              <div className="welcome-text">
                Welcome,{" "}
                {auth.isAuthenticated === true ? auth?.user?.email : ""}
              </div>
              <p>{`${day}/${month}/${year}`}</p>
            </div>
            <div className="userprofile-header-right">
              <TextField
                variant="outlined"
                placeholder="Tìm kiếm..."
                size="small"
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  height: "fit-content",
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <Typography
                component={"span"}
                sx={{
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "40px",
                  height: "40px",
                  fontSize: "1.2rem",
                  backgroundColor: "#fff",
                  borderRadius: "7px",
                  padding: "0.5rem",
                  border: "1px solid #ccc",
                }}
              >
                <NotificationsIcon />
              </Typography>

              <Avatar
                className="avatar-user"
                src={
                  auth.isAuthenticated === true
                    ? import.meta.env.VITE_API_URL +
                      "/src/uploads/" +
                      auth.user?.avatar
                    : ""
                }
                sx={{
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                }}
                alt="User"
              />
            </div>
          </div>
          {renderContent()}
        </div>
      </div>
    </section>
  );
};

export default UserProfile;

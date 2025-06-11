import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import {
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Button,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../app/store";
import { logoutThunk } from "../../../features/auth/authSlice";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [anchorActions, setAnchorActions] = useState<HTMLElement | null>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenActions = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorActions(event.currentTarget);
  };

  const handleCloseActions = () => {
    setAnchorActions(null);
  };

  return (
    <>
      <AppBar position="fixed" color="inherit">
        <Container>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
            }}
          >
            {/* Logo */}
            <Box component={Link} to={"/"} sx={{ width: "100px" }}>
              <img
                style={{
                  width: "100%",
                  height: "80px",
                  objectFit: "contain",
                }}
                src="http://localhost:3003/src/uploads/academy-logo-element-vector-illustration-decorative-design-191487693.jpg"
                alt="Logo"
              />
            </Box>
            {/* Menu Navigation */}
            <Box
              sx={{ display: "flex", gap: "10px" }}
              onMouseLeave={handleClose}
            >
              <Button component={Link} to={"/"} color="inherit">
                Home
              </Button>
              <Button component={Link} to={"/about"} color="inherit">
                About
              </Button>
              <Button
                color="inherit"
                aria-controls={anchorEl ? "member-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={anchorEl ? "true" : undefined}
                onMouseEnter={handleOpen}
              >
                Member
              </Button>
              <Menu
                id="member-menu"
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={handleClose}
                MenuListProps={{
                  onMouseEnter: () =>
                    clearTimeout(
                      hoverTimeout.current as ReturnType<typeof setTimeout>
                    ),
                  onMouseLeave: handleClose,
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                // Thêm để cải thiện UX
                disableScrollLock={true}
                slotProps={{
                  paper: {
                    sx: {
                      marginTop: "5px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    },
                  },
                }}
              >
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="/web-development"
                >
                  Web Development
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="/mobile-apps"
                >
                  Mobile Apps
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="/ui-ux-design"
                >
                  UI/UX Design
                </MenuItem>
              </Menu>

              <Button component={Link} to={"/events"} color="inherit">
                Events
              </Button>
              <Button component={Link} to={"/blogs"} color="inherit">
                Blogs
              </Button>
              <Button component={Link} to={"/contact"} color="inherit">
                Contact
              </Button>
            </Box>

            {/* User Actions */}
            {auth.isAuthenticated === false ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton
                  color="inherit"
                  onClick={handleOpenActions}
                  aria-controls={anchorActions ? "user-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={anchorActions ? "true" : undefined}
                >
                  <Avatar alt="User" src={"/avatar.png"} />
                </IconButton>

                <Menu
                  id="user-menu"
                  anchorEl={anchorActions}
                  open={!!anchorActions}
                  onClose={handleCloseActions}
                  disableScrollLock={true}
                >
                  <MenuItem
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      padding: "8px 16px",
                    }}
                  >
                    <Button
                      component={Link}
                      to="/login"
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={handleCloseActions}
                    >
                      Login
                    </Button>
                    <Button
                      component={Link}
                      to="/register"
                      variant="outlined"
                      color="primary"
                      fullWidth
                      onClick={handleCloseActions}
                    >
                      Register
                    </Button>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton
                  color="inherit"
                  onClick={handleOpenActions}
                  aria-controls={anchorActions ? "user-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={anchorActions ? "true" : undefined}
                >
                  <Avatar alt="User" src={auth?.user?.avatar} />
                </IconButton>

                <Menu
                  id="user-menu"
                  anchorEl={anchorActions}
                  open={!!anchorActions}
                  onClose={handleCloseActions}
                  disableScrollLock={true}
                >
                  <MenuItem
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      padding: "8px 16px",
                    }}
                  >
                    <Button
                      component={Link}
                      to="/dashboard"
                      variant="contained"
                    >
                      Dashboard
                    </Button>
                    <Button
                      component={Link}
                      to="/user/profile"
                      variant="outlined"
                      color="primary"
                      fullWidth
                      onClick={handleCloseActions}
                    >
                      setting
                    </Button>
                    <Button
                      component={Link}
                      to="/login"
                      variant="contained"
                      color="error"
                      fullWidth
                      onClick={() => dispatch(logoutThunk())}
                    >
                      Logout
                    </Button>
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
export default Header;

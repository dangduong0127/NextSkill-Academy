// DashboardLayout.js
import * as React from "react";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { Link, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ImageOpen } from "../../utils/contextApi";
import CancelIcon from "@mui/icons-material/Cancel";

const drawerWidth = 240;
interface MenuItem {
  text: string;
  icon: React.ReactNode;
  link: string;
}
// props { children }: { children: React.ReactNode }
const DashboardLayout = () => {
  const { imageUrl, setImageUrl } = React.useContext(ImageOpen)!;
  const location = useLocation();
  const menuItems: MenuItem[] = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      link: "/dashboard",
    },
    {
      text: "Chat",
      icon: <ChatBubbleIcon />,
      link: "/dashboard/chat",
    },
    {
      text: "Settings",
      icon: <SettingsIcon />,
      link: "/dashboard/settings",
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            <Link to={"/"} style={{ color: "#fff", textDecoration: "none" }}>
              My Dashboard
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              component={Link}
              to={item.link}
              selected={location.pathname === item.link}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          // ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar />
        {/* {children} */}
        <Outlet />
      </Box>

      {imageUrl && (
        <div className="view-image-container">
          <img
            src={import.meta.env.VITE_API_URL + "/src/uploads/" + imageUrl}
          />
          <CancelIcon
            className="close-image"
            onClick={() => setImageUrl(null)}
          />
        </div>
      )}
    </Box>
  );
};

export default DashboardLayout;

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

const drawerWidth = 240;
interface MenuItem {
  text: string;
  icon: React.ReactNode;
  link: string;
}
// props { children }: { children: React.ReactNode }
const DashboardLayout = () => {
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
            My Dashboard
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
    </Box>
  );
};

export default DashboardLayout;

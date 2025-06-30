// App.js
import { useState, useMemo } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Button, Box } from "@mui/material";
import { Provider } from "react-redux";
import store from "./app/store";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/Login";
import RegisterPage from "./Pages/Register";
import Layout from "./components/Layout";
import ErrorPage from "./Pages/ErrorPage";
import "./global.scss";
import UserProfile from "./Pages/UserProfile";
import { NotifierProvider } from "./components/Notifier/messageContext";
import DashboardLayout from "./Pages/DashBoard";
import Chat from "./Pages/DashBoard/Chat";
import { ImageOpen } from "./utils/contextApi";
import CancelIcon from "@mui/icons-material/Cancel";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: '"Poppins", san-serif',
        },
        palette: {
          mode,
          primary: {
            main: mode === "light" ? "#1976d2" : "#90caf9",
            light: "#fff",
            // dark: "#90caf9",
          },
        },
      }),
    [mode]
  );

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const ProtectedRoute = () => {
    const user = JSON.parse(localStorage.getItem("userInfo") || "{}");
    if (!user || user?.role !== "admin")
      return <Navigate to="/login" replace={true} />;
    return <Outlet />;
  };

  const ProtectedRouteAuth = () => {
    const user = localStorage.getItem("userInfo");
    if (!user) return <Navigate to="/login" replace={true} />;
    return <Outlet />;
  };

  const AuthorizedRoute = () => {
    const user = localStorage.getItem("userInfo");
    if (user) return <Navigate to="/" replace={true} />;
    return <Outlet />;
  };

  return (
    <ImageOpen.Provider value={{ imageUrl, setImageUrl }}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <NotifierProvider>
            <BrowserRouter>
              <CssBaseline />
<<<<<<< HEAD
              {imageUrl && (
                <div className="view-image-container">
                  <img
                    src={
                      import.meta.env.VITE_API_URL + "/src/uploads/" + imageUrl
                    }
                  />
                  <CancelIcon
                    className="close-image"
                    onClick={() => setImageUrl(null)}
                  />
                </div>
              )}
              <Box
                sx={{ p: 2 }}
                style={{
                  position: "fixed",
                  bottom: "20px",
                  right: "20px",
                }}
              >
=======
              <Box sx={{ p: 2 }} className="btn-darkmode">
>>>>>>> refs/remotes/origin/main
                <Button
                  style={{ borderRadius: "50%", padding: "20px" }}
                  variant="contained"
                  onClick={toggleTheme}
                >
                  {mode === "light" ? (
                    <>
                      <DarkModeIcon />
                    </>
                  ) : (
                    <LightModeIcon />
                  )}
                </Button>
              </Box>

              <Routes>
                <Route
                  path="/"
                  element={
                    <Layout>
                      <HomePage />
                    </Layout>
                  }
                />
                <Route element={<AuthorizedRoute />}>
                  <Route
                    path="/login"
                    element={
                      <Layout>
                        <LoginPage />
                      </Layout>
                    }
                  />
                </Route>

                <Route
                  path="/register"
                  element={
                    <Layout>
                      <RegisterPage />
                    </Layout>
                  }
                ></Route>

                <Route element={<ProtectedRouteAuth />}>
                  <Route
                    path="/user/profile"
                    element={
                      <Layout>
                        <UserProfile />
                      </Layout>
                    }
                  />
                </Route>
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<div>Dashboard Home</div>} />
                    <Route path="chat" element={<Chat />} />
                    <Route path="settings" element={<div>Settings</div>} />
                  </Route>
                </Route>

                <Route
                  path="/*"
                  element={
                    <Layout>
                      <ErrorPage />
                    </Layout>
                  }
                />
              </Routes>
            </BrowserRouter>
          </NotifierProvider>
        </Provider>
      </ThemeProvider>
    </ImageOpen.Provider>
  );
}

export default App;

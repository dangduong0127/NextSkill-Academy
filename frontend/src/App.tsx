// App.js
import { useState, useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: '"Monserrat", san-serif',
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

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <NotifierProvider>
          <BrowserRouter>
            <CssBaseline />
            <Box
              sx={{ p: 2 }}
              style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
              }}
            >
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

              <Route
                path="/login"
                element={
                  <Layout>
                    <LoginPage />
                  </Layout>
                }
              />

              <Route
                path="/register"
                element={
                  <Layout>
                    <RegisterPage />
                  </Layout>
                }
              ></Route>

              <Route
                path="/user/profile"
                element={
                  <Layout>
                    <UserProfile />
                  </Layout>
                }
              />

              <Route
                path="/dashboard"
                element={
                  <DashboardLayout>
                    <h1>News</h1>
                  </DashboardLayout>
                }
              />
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
  );
}

export default App;

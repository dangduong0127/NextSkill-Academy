// App.js
import { useState, useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Button, Box } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import HomePage from "./components/HomePage";
import Layout from "./components/Layout";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "light" ? "#1976d2" : "#90caf9",
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
          <Route path="/register" element={"<h1>tesst</h1>"} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

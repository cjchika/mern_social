import { useMemo, useState } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/HomePage/HomePage";
import LoginPage from "./scenes/LoginPage/LoginPage";
import ProfilePage from "./scenes/ProfilePage/ProfilePage";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ColorModeContext } from "./config/colorContext";
import CssBaseline from "@mui/material/CssBaseline";
import { themeSettings } from "./theme";
import { useEffect } from "react";
import { useMediaQuery } from "@mui/material";

function App() {
  // const mode = useSelector((state) => state.mode);
  const prefersLightMode = useMediaQuery("(prefers-color-scheme: light)");
  const [mode, setMode] = useState();
  const isAuth = Boolean(useSelector((state) => state.token));

  useEffect(() => {
    setMode(prefersLightMode ? "light" : "dark");
  }, [prefersLightMode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route
                path="/home"
                element={isAuth ? <HomePage /> : <Navigate to="/" />}
              />
              <Route
                path="/profile/:userId"
                element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
              />
            </Routes>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;

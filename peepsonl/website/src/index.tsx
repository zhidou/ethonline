import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { theme } from "./common/theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdateProfile from "./pages/UpdateProfile";
import { client } from "./common/web3storage";

(window as any).w3s = client;

const isWildcardDomain = window.location.hostname.split(".").length === 3;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <BrowserRouter>
          {isWildcardDomain ? (
            <Routes>
              <Route path="*" element={<App />}></Route>
            </Routes>
          ) : (
            <Routes>
              <Route path="404" element={<span>404</span>}></Route>
              <Route path="#/update" element={<UpdateProfile />}></Route>
              <Route path=":id" element={<App />}></Route>
            </Routes>
          )}
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

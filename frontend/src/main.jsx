import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styles
import "animate.css"; // Animations
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/theme.css"; // Add the new theme first
import "./styles/index.css"; // ✅ Correct path
import App from "./App.jsx";
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

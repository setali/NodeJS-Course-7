import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ConfigProvider } from "antd";
import AppProviders from "./providers/AppProviders.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <AppProviders>
    <App />
  </AppProviders>
  // </StrictMode>
);

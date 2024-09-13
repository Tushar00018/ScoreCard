import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Data from "./Data.jsx";
import ParentComponent from "./ParentComponent.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ParentComponent />
  </StrictMode>
);

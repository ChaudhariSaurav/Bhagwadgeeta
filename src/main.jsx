import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import UserRoutes from "./controller/UserRoutes.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserRoutes />
  </React.StrictMode>
);

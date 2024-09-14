import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import UserRoutes from "./controller/UserRoutes.jsx";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
  <React.StrictMode>
    <UserRoutes />
  </React.StrictMode>
  </ChakraProvider>
);

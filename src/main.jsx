import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   {/* <BrowserRouter> */}
    <App />
    {/* <Routes> */}
    {/* <Route path="login" element={<Login />} />
      <Route path="*" element={<App />} />
    </Routes> */}
   {/* </BrowserRouter> */}
  </React.StrictMode>
);

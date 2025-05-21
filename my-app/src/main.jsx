import React from "react";

import ReactDOM from "react-dom/client";

import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import AddEdit from "./pages/add-edit.jsx";
import Login from "./components/login.jsx";
import HomePage from "./pages/HomePage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddEdit />} />
        <Route path="/login" element={<Login />} />

        {/* <Route path="/detail/:id" element={<MovieDetail />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

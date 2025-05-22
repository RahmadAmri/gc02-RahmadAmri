import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import AddEdit from "./pages/add-edit.jsx";
import Login from "./components/login.jsx";
import HomePage from "./pages/HomePage.jsx";

function App() {
  const [dataToEdit, setDataToEdit] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage dataToEdit={dataToEdit} setDataToEdit={setDataToEdit} />
          }
        />
        <Route
          path="/add-edit"
          element={
            <AddEdit dataToEdit={dataToEdit} setDataToEdit={setDataToEdit} />
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

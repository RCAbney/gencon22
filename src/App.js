import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AllBooths from "./routes/AllBooths";
import MyBooths from "./routes/MyBooths";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer autoClose={750} position="top-center" />
        <Routes>
          <Route path="/all-booths" element={<AllBooths />} />
          <Route path="/my-booths" element={<MyBooths />} />
          <Route path="/" element={<Navigate to="/my-booths" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

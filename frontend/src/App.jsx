// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Playgrounds from "./pages/Playgrounds";
import PlaygroundDetail from "./pages/PlaygroundDetail";
// import MyBookings from "./pages/MyBookings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyBookings from "./pages/MyBookings";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playgrounds" element={<Playgrounds />} />
        
        <Route path="/playgrounds/:id" element={<PlaygroundDetail />} />

        <Route path="/bookings" element={<MyBookings />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;

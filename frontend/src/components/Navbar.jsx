// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">🏏 PlayGround</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/playgrounds">Playgrounds</Link></li>
        <li><Link to="/bookings">Bookings</Link></li>

        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

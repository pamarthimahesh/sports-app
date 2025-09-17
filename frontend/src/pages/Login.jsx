// frontend/src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Register.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.loginUser({ email, password });
      // If backend returns success -> redirect
      if (res.data) {
        alert("Login successful");
        navigate("/playgrounds");
      }
    } catch (err) {
      alert(err.response?.data?.detail || "Invalid credentials");
    }
  };

  return (
    <div className="register-form">
      
      <div className="head"><h2>🔐 Login Here !</h2></div>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
        <div style={{ marginTop: 8 }}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

// frontend/src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await api.registerUser({ username, email, password });
      setMsg(res.data?.message || "Registered");
      // on success navigate to login
      navigate("/login");
    } catch (err) {
      setMsg(err.response?.data?.detail || err.message || "Registration failed");
    }
  };

  return (
    <div className="register-form" >
      <div className="head"><h2>📝 Register Here !</h2></div>
      {/* <h2>📝 Register Here !</h2> */}
      <form onSubmit={handleSubmit}>
        <label>Username </label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} required /><br />
        <label>Email </label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
        <label>Password </label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
        <div style={{ marginTop: 8 }}>
          <button type="submit">Register</button>
        </div>
      </form>
      {msg && <div style={{ marginTop: 12, color: "crimson" }}>{msg}</div>}
    </div>
  );
}

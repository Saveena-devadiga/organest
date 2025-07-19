import React, { useState } from 'react';
import "./AdminStyles.css";
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple hardcoded admin credentials (for demo)
    if (credentials.username === "admin" && credentials.password === "admin123") {
      localStorage.setItem("admin", "true");
      navigate("/admin/dashboard");
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div className="auth-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" onChange={(e) => setCredentials({...credentials, username: e.target.value})} required />
        <input type="password" placeholder="Password" onChange={(e) => setCredentials({...credentials, password: e.target.value})} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

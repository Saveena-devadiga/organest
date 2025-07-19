import React, { useState } from "react";
import axios from "axios";
import "../css/loginReg.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
  
      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify({
        name: res.data.name,
        email: res.data.email,
      }));
      alert(res.data.message);
      navigate("/");
    } catch (err) {
      alert("Login failed! Check your credentials.");
    }
  };
  

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
        <p>Don't have an account? <a href="/signup">Signup</a></p>
      </form>
    </div>
  );
};

export default Login;

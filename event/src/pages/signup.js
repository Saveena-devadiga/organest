import React, { useState } from "react";
import axios from "axios";
import "../css/loginReg.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(navigate);

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate name
    if (!name.trim()) {
      alert("Name cannot be blank.");
      return;
    }

    // Validate email
    if (!email.trim()) {
      alert("Email cannot be blank.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Validate password
    if (!password) {
      alert("Password cannot be blank.");
      return;
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      alert("Password must be at least 6 characters long and contain both letters and numbers.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/signup", {
        name,
        email,
        password,
      });

      if (res.data.success) {
        console.log("Signup success:", res.data);
        const user = { name, email };
        localStorage.setItem("user", JSON.stringify(user));
        setTimeout(() => {
          window.location.href = "/";
        }, 100);
      } else {
        alert(res.data.message || "Signup failed!");
      }
    } catch (err) {
      console.error(err);
      alert("Signup failed!");
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;

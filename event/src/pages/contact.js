import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/contact.css";
import "../css/home.css";

export default function Contact() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = formData;
    if (!name || !email || !phone || !message) {
      return alert("Please fill out all fields.");
    }
    if (!/^\d{10}$/.test(phone)) {
      return alert("Phone number must be exactly 10 digits.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return alert("Please enter a valid email.");
    }

    try {
      await axios.post("http://localhost:5000/contact", formData);
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch {
      alert("Failed to send message");
    }
  };

  const organisers = [
    {
      name: "Saveena",
      role: "Lead Event Organiser",
      email: "savi@organest.com",
      phone: "+91 9876543210",
      linkedin: "https://www.linkedin.com/in/ananya-sharma",
      instagram: "https://www.instagram.com/ananya.events",
    },
    {
      name: "Sushmitha",
      role: "Creative Director",
      email: "sush@organest.com",
      phone: "+91 9123456789",
      linkedin: "https://www.linkedin.com/in/rohan-mehta",
      instagram: "https://www.instagram.com/rohan.creative",
    },
  ];

  return (
    <div className="contact-page">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo-container">
            <img src="/images/logo.png" alt="OrgaNest Logo" className="logo-image" />
            <span className="logo-text">OrgaNest</span>
          </div>
          <nav className="nav">
            <Link to="/">Home</Link>
            <a href="#about">About</a>
            <Link to="/services">Services</Link>
            <a href="#reviews">Review</a>
            <Link to="/contact">Contact</Link>
            {user ? (
              <>
                <span className="profile-name">👤 {user.name}</span>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="contact-content">
        <h2>Contact Us</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your Phone Number"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
          />
          <button type="submit">Submit</button>
        </form>
      </main>

      {/* Organiser Section */}
      <section className="organiser-details">
        <h3>Meet Our Organisers</h3>
        <div className="organiser-list">
          {organisers.map((org, index) => (
            <div className="organiser-card" key={index}>
              <div className="organiser-info">
                <p><strong>Name:</strong> {org.name}</p>
                <p><strong>Role:</strong> {org.role}</p>
                <p><strong>Email:</strong> {org.email}</p>
                <p><strong>Phone:</strong> {org.phone}</p>
                <div className="organiser-socials">
                  <a href={org.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>{" | "}
                  <a href={org.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 OrgaNest. All rights reserved.</p>
      </footer>
    </div>
  );
}

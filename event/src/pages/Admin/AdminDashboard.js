// AdminDashboard.js
import React from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import './AdminStyles.css';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
      <div className="logo-container">
          <img src="/images/logo.png" alt="OrgaNest Logo" className="logo-image" />
          <span className="logo-text">OrgaNest</span>
        </div>
        <h2>Admin Dashboard</h2>
        <nav className="admin-nav">
          <Link to="users">View Users</Link>
          <Link to="bookings">View Bookings</Link>
          <Link to="contacts">View Contact Messages</Link>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </header>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}

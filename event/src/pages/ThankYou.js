import React from "react";
import "../css/home.css"; // Reuse the home page styles

export default function ThankYou() {
  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <div className="header-container">
        <div className="logo-container">
           <img src="/images/logo.png" alt="OrgaNest Logo" className="logo-image" />
           <span className="logo-text">OrgaNest</span>
           </div>
          <nav className="nav">
            <a href="/">Home</a>
            <a href="/services">Services</a>
            <a href="/contact">Contact</a>
            <a href="/login">Login</a>
          </nav>
        </div>
      </header>

      {/* Thank You Message */}
      <main className="main-section">
        <h2>🎉 Thank You for Your Booking!</h2>
        <p>We’ve received your event details and will contact you soon.</p>
        <p>Get ready to make your event unforgettable with OrgaNest!</p>
        <button className="view-more" onClick={() => window.location.href = "/"}>
          Back to Home
        </button>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 OrgaNest. All rights reserved.</p>
      </footer>
    </div>
  );
}

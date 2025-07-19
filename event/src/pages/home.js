import React, { useEffect, useState } from "react";
import "../css/home.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Home() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      console.log("Loaded user from localStorage:", storedUser);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []);
  
    const handleLogout = () => {
      localStorage.removeItem("user");
      setUser(null);
      window.location.href = "/login";
    };
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  

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
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="/services">Services</a>
              <a href="#reviews">Review</a>
              <a href="/contact">Contact</a>
              {user ? (
                <>
                  <span className="profile-name">👤 {user.name}</span>
                  <button onClick={handleLogout} className="logout-btn">Logout</button>
                </>
              ) : (
                <a href="/login">Login</a>
              )}
            </nav>
          </div>
        </header>

      {/* Main Section */}
      <section id="home" className="main-section">
        <div className="main-content">
          <h2>Make Your Events Memorable with OrgaNest</h2>
          <p>We bring your dreams to life through creativity and flawless execution.</p>
          <div className="services-images">
            <img src="/images/bridal.jpg" alt="Bridal" />
            <img src="/images/th2.jpg" alt="Decoration1" />
            <img src="/images/exchange.jpg" alt="Engagement" />
          </div>
          <button className="view-more" onClick={() => navigate("/services")}>Get Started..</button>

        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="about-content">
          <h3>About Us</h3>
          <p>
            OrgaNest is a passionate event management platform dedicated to making your special moments unforgettable.
            From weddings to corporate gatherings, we handle it all with flair and precision.
          </p>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="reviews-section">
        <div className="reviews-container">
          <h3>Client Reviews</h3>
          <div className="review-cards">
            <div className="review-card">
              <p>“Absolutely loved the event planning. Everything was perfect!”</p>
              <p className="review-author">- Sarah K.</p>
            </div>
            <div className="review-card">
              <p>“OrgaNest made our wedding truly magical. Highly recommend!”</p>
              <p className="review-author">- David & Anna</p>
            </div>
            <div className="review-card">
              <p>“Professional and creative! They brought our vision to life.”</p>
              <p className="review-author">- Corporate Inc.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Link */}
      <section id="contact" className="contact-section">
        <h3>Get in Touch</h3>
        <p>We'd love to hear from you! Click the contact link above to reach us.</p>
        <Link to="/contact" className="contact-link">Contact us</Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 OrgaNest. All rights reserved.</p>
      </footer>
    </div>
  );
}


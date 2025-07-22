import React, { useEffect, useState } from "react";
import "../css/home.css";
import "../css/services.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const serviceDetails = {
  Decoration: {
    desc: "We provide unique and theme-based decorations for all kinds of events.",
    img: "/images/th3.jpg",
  },
  "Invitation Card": {
    desc: "Custom-designed cards with elegant styles to invite your guests.",
    img: "/images/card.jfif",
  },
  "Bridal Makeup": {
    desc: "Professional bridal makeup artists to glam up your special day.",
    img: "/images/bridal.jpg",
  },
  Photography: {
    desc: "Capture your event beautifully with our expert photographers.",
    img: "/images/photo.jpg",
  },
  "Food Section": {
    desc: "Delicious, diverse menu options tailored to your event needs.",
    img: "/images/food.jpg",
  },
};

export default function Services() {
  const [user, setUser] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else {
      navigate("/login");
    }
  }, [navigate]);
  

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };
  
  if (loading) return <div>Loading...</div>;


  return (
    <div className="services-page">
      {/* Header (same as Home.js) */}
      <header className="header">
        <div className="header-container">
        <div className="logo-container">
           <img src="/images/logo.png" alt="OrgaNest Logo" className="logo-image" />
           <span className="logo-text">OrgaNest</span>
           </div>
          <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/#about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/#reviews">Review</Link>
          <Link to="/contact">Contact</Link>

            {user ? (
              <>
                <span className="profile-name">👤 {user.name}</span>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </nav>
        </div>
      </header>

      {/* Page Title */}
      <h2 className="page-title">Our Services</h2>

      {/* Services Content */}
      <div className="services-content">
        {selectedService ? (
          <div className="service-detail">
            <img
              src={serviceDetails[selectedService].img}
              alt={selectedService}
              className="service-image"
            />
            <h3>{selectedService}</h3>
            <p>{serviceDetails[selectedService].desc}</p>
            <button onClick={() => setSelectedService(null)}>Go Back</button>
          </div>
        ) : (
          <div className="service-grid">
            {Object.entries(serviceDetails).map(([service, { img }]) => (
              <div key={service} className="service-card">
                <img src={img} alt={service} className="service-thumb" />
                <button onClick={() => setSelectedService(service)}>
                  {service}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Book Now (always visible) */}
      <div className="book-now-section">
      <button className="book-btn" onClick={() => navigate("/booking")}>Book Now</button>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 OrgaNest. All rights reserved.</p>
      </footer>
    </div>
  );
}

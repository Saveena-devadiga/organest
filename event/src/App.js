// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login.js";
import Signup from "./pages/signup.js";
import Home from "./pages/home.js";
import Services from "./pages/services.js"; 
import Contact from "./pages/contact.js"; 
import Booking from "./pages/booking.js";
import ThankYou from "./pages/ThankYou.js";
import AdminLogin from "./pages/Admin/AdminLogin.js";
import AdminDashboard from "./pages/Admin/AdminDashboard.js";
import AdminUsers from "./pages/Admin/AdminUsers.js";
import AdminBookings from "./pages/Admin/AdminBookings.js";
import AdminContacts from "./pages/Admin/AdminContacts.js";

function App() {
  return (
    <Router>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/services" element={<Services />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/booking" element={<Booking />} />
    <Route path="/ThankYou" element={<ThankYou />} />
    
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin/dashboard" element={<AdminDashboard />}>
      <Route path="users" element={<AdminUsers />} />
      <Route path="bookings" element={<AdminBookings />} />
      <Route path="contacts" element={<AdminContacts />} />
    </Route>
  </Routes>
</Router>

  );
}

export default App;

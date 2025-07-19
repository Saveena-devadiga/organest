// AdminBookings.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import './AdminStyles.css';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  axios
    .get("http://localhost:5000/admin/bookings")
    .then((response) => {
      const sortedBookings = response.data.sort((a, b) => {
        return new Date(a.eventDate) - new Date(b.eventDate);
      });
      setBookings(sortedBookings);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching bookings:", err);
      setError("Failed to load bookings.");
      setLoading(false);
    });
}, []);


  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-content">
      <h2>All Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Event Type</th>
              <th>Event Date</th>
              <th>Services</th>
              <th>Food Type</th>
              <th>Food Qty</th>
              <th>Invitation Qty</th>
              <th>Decoration Type</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{booking.name}</td>
                <td>{booking.email}</td>
                <td>{booking.phone}</td>
                <td>{booking.location}</td>
                <td>{booking.eventType}</td>
                <td>{new Date(booking.eventDate).toLocaleDateString()}</td>
                <td>{booking.services}</td>
                <td>{booking.foodType || "N/A"}</td>
                <td>{booking.foodQty || 0}</td>
                <td>{booking.invitationQty || 0}</td>
                <td>{booking.decorationType || "N/A"}</td>
                <td>₹{booking.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

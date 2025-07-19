const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// SIGNUP
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, password], (err, result) => {
    if (err) return res.status(500).json({ message: "Error saving user" });
    return res.json({ success: true, message: "Signup successful!" });
  });
});

// LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, data) => {
    if (err) return res.status(500).json({ message: "Server error", error: err });
    if (data.length > 0) {
      return res.json({
        message: "Login successful!",
        name: data[0].name,
        email: data[0].email,
      });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  });
});

// CONTACT FORM
app.post("/contact", (req, res) => {
  const { name, email, phone, message } = req.body;
  const sql = "INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, phone, message], (err, result) => {
    if (err) {
      console.error("Error saving contact message:", err);
      return res.status(500).json({ message: "Failed to send message" });
    }
    return res.json({ message: "Message sent successfully!" });
  });
});

app.post("/book", (req, res) => {
  const {
    name,
    email,
    phone,
    location,
    date,
    eventType,
    selectedServices,
    serviceDetails,
    total,
  } = req.body;

  const foodType = serviceDetails?.["Food Section"]?.type || null;
  const foodQty = serviceDetails?.["Food Section"]?.qty || 0;
  const invitationQty = serviceDetails?.["Invitation Card"]?.qty || 0;
  const decorationType = serviceDetails?.["Decoration"]?.type || null;

  const servicesStr = selectedServices?.join(", ") || "";

  const sql = `
    INSERT INTO bookings
    (name, email, phone, location, eventType, eventDate, services, foodType, foodQty, invitationQty, decorationType, totalPrice)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [
      name,
      email,
      phone,
      location,
      eventType,
      date,
      servicesStr,
      foodType,
      foodQty,
      invitationQty,
      decorationType,
      total,
    ],
    (err, result) => {
      if (err) {
        console.error("Booking error:", err);
        return res.status(500).json({ message: "Failed to save booking" });
      }
      res.json({ message: "Booking successful!" });
    }
  );
});


// ADMIN ROUTES
app.get("/admin/users", (req, res) => {
  db.query("SELECT name, email FROM users", (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching users" });
    res.json(results);
  });
});

app.get("/admin/bookings", (req, res) => {
  db.query("SELECT * FROM bookings", (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching bookings" });
    res.json(results);
  });
});

app.get("/admin/contacts", (req, res) => {
  db.query("SELECT * FROM contact_messages", (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching messages" });
    res.json(results);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

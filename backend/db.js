// backend/db.js
const mysql = require("mysql2");

// MySQL database configuration
const db = mysql.createConnection({
  host: "localhost",     // MySQL host
  user: "root",          // MySQL username (default in XAMPP is 'root')
  password: "",  // Replace with your password
  database: "organest_db",  // The name of your database
  port: 3306             // Add this line to specify the custom port
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL!");
});

module.exports = db;

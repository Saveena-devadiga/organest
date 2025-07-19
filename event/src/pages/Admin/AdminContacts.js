import React, { useEffect, useState } from "react";
import axios from "axios";
import './AdminStyles.css';


export default function AdminContacts() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/admin/contacts") // Create this route too
      .then(res => setMessages(res.data))
      .catch(err => console.error("Error loading messages", err));
  }, []);

  return (
    <div className="admin-content">
      <h3>Contact Messages</h3>
      <table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((m, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{m.name}</td>
              <td>{m.email}</td>
              <td>{m.phone}</td>
              <td>{m.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import './AdminStyles.css';


export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/admin/users") // You need to create this backend route
      .then(res => setUsers(res.data))
      .catch(err => console.error("Error loading users", err));
  }, []);

  return (
    <div className="admin-content">
      <h3>Registered Users</h3>
      <table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
}

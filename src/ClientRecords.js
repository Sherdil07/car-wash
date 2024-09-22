// src/ClientRecords.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ClientRecords.css"; // Optional: create a CSS file for styling

const ClientRecords = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch client records from the server when the component mounts
    const fetchClients = async () => {
      try {
        const response = await axios.get("/api/clients"); // Create this endpoint to fetch all clients
        setClients(response.data);
      } catch (error) {
        console.error("Error fetching client records:", error);
      }
    };

    fetchClients();
  }, []);

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.carNumber.includes(searchTerm)
  );

  return (
    <div>
      <h2>Client Records</h2>
      <input
        type="text"
        placeholder="Search by Name or Car Number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Car Number</th>
            <th>Car Type</th>
            <th>Services</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map((client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.phone}</td>
              <td>{client.carNumber}</td>
              <td>{client.carType}</td>
              <td>{client.services}</td>
              <td>{client.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientRecords;

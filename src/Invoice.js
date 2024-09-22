import React from "react";
import { useLocation } from "react-router-dom";
import "./Invoice.css"; // Assuming you have a CSS file for styling

const Invoice = () => {
  const location = useLocation();
  const { invoice } = location.state || {}; // Safely access the invoice

  if (!invoice) {
    return <div>No invoice data available</div>; // Fallback in case of missing data
  }

  return (
    <div className="invoice-container">
      <h2>Invoice</h2>
      <p>
        <strong>Name:</strong> {invoice.customerName}
      </p>
      <p>
        <strong>Phone Number:</strong> {invoice.phoneNumber}
      </p>
      <p>
        <strong>Car Number:</strong> {invoice.carNumber}
      </p>
      <p>
        <strong>Car Type:</strong> {invoice.carType}
      </p>
      <p>
        <strong>Services:</strong> {invoice.services.join(", ")}
      </p>
      <p>
        <strong>Total Cost:</strong> ${invoice.totalCost}
      </p>
      <p>
        <strong>Date:</strong> {invoice.date}
      </p>
      <button onClick={() => window.print()}>Print Invoice</button>
    </div>
  );
};

export default Invoice;

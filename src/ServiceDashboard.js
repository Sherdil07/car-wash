import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ServicePriceContext } from "./ServicePriceContext";
import "./ServiceDashboard.css";

const ServiceDashboard = () => {
  const { servicePrices, setServicePrices } = useContext(ServicePriceContext);
  const [carType, setCarType] = useState("");
  const [newPrices, setNewPrices] = useState({});

  const carTypes = Object.keys(servicePrices);

  // Fetch current prices for the selected car type
  useEffect(() => {
    if (carType) {
      setNewPrices(servicePrices[carType]);
    }
  }, [carType, servicePrices]);

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setNewPrices((prev) => ({ ...prev, [name]: parseInt(value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put("http://localhost:5000/api/update-prices", {
        carType,
        servicePrices: newPrices,
      })
      .then((response) => {
        // Update global prices in context
        setServicePrices((prev) => ({
          ...prev,
          [carType]: newPrices,
        }));
        console.log("Prices updated in context:", {
          ...servicePrices,
          [carType]: newPrices,
        });
        toast.success("Prices updated successfully!");
      })
      .catch((error) => {
        console.error(
          "Error updating prices:",
          error.response ? error.response.data : error.message
        );
        toast.error("Failed to update prices.");
      });
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Update Service Prices</h2>
      <form className="dashboard-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Car Type:</label>
          <select
            value={carType}
            onChange={(e) => setCarType(e.target.value)}
            required
          >
            <option value="">Select a Car Type</option>
            {carTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Exterior Wash Price:</label>
          <input
            type="number"
            name="Exterior Wash"
            value={newPrices["Exterior Wash"] || ""}
            onChange={handlePriceChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Interior Cleaning Price:</label>
          <input
            type="number"
            name="Interior Cleaning"
            value={newPrices["Interior Cleaning"] || ""}
            onChange={handlePriceChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Wax & Polish Price:</label>
          <input
            type="number"
            name="Wax & Polish"
            value={newPrices["Wax & Polish"] || ""}
            onChange={handlePriceChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Engine Cleaning Price:</label>
          <input
            type="number"
            name="Engine Cleaning"
            value={newPrices["Engine Cleaning"] || ""}
            onChange={handlePriceChange}
            required
          />
        </div>

        <button className="submit-button" type="submit">
          Update Prices
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ServiceDashboard;

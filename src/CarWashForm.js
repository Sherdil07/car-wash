import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { ServicePriceContext } from "./ServicePriceContext";
import "./CarWashForm.css";

const CarWashForm = () => {
  const { servicePrices } = useContext(ServicePriceContext); // Access service prices from context
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    carNumber: "",
    carType: "",
    services: [],
  });

  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const carTypes = ["SUV", "Hatchback", "Sedan", "Truck"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));

    if (name === "carType") {
      setCustomer((prev) => ({ ...prev, services: [] }));
    }
  };

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    setCustomer((prev) => {
      let updatedServices = [...prev.services];
      if (checked) {
        updatedServices.push(value);
      } else {
        updatedServices = updatedServices.filter(
          (service) => service !== value
        );
      }
      return { ...prev, services: updatedServices };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedServices = customer.services;
    const totalCost = selectedServices.reduce((total, service) => {
      return total + (servicePrices[customer.carType][service] || 0);
    }, 0);

    const invoice = {
      customerName: customer.name,
      phoneNumber: customer.phone,
      carNumber: customer.carNumber,
      carType: customer.carType,
      services: selectedServices,
      totalCost,
      date: new Date().toLocaleString(),
    };

    // Redirect to Invoice page with the invoice data
    navigate("/invoice", { state: { invoice } });
  };

  // Fetch the services list based on the car type and updated prices
  const servicesList = customer.carType
    ? Object.keys(servicePrices[customer.carType]).map((service) => ({
        name: service,
        price: servicePrices[customer.carType][service],
      }))
    : [];

  // Debug: Log the service prices when carType or servicePrices change
  useEffect(() => {
    console.log(
      "Updated service prices for car type:",
      customer.carType,
      servicePrices[customer.carType]
    );
  }, [customer.carType, servicePrices]);

  return (
    <div>
      <h2>Car Wash Service Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={customer.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Car Number:</label>
          <input
            type="text"
            name="carNumber"
            value={customer.carNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Car Type:</label>
          <select
            name="carType"
            value={customer.carType}
            onChange={handleChange}
            required
          >
            <option value="">Select Car Type</option>
            {carTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Services:</label>
          {servicesList.map((service) => (
            <div className="services-type" key={service.name}>
              <input
                type="checkbox"
                name="services"
                value={service.name}
                onChange={handleServiceChange}
              />
              <label>
                {service.name} (${service.price})
              </label>
            </div>
          ))}
        </div>

        <button type="submit">Generate Invoice</button>
      </form>
    </div>
  );
};

export default CarWashForm;

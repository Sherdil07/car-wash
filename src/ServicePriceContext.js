// src/ServicePriceContext.js
import React, { createContext, useState } from "react";

// Create the context
export const ServicePriceContext = createContext();

// Create a provider component
export const ServicePriceProvider = ({ children }) => {
  const [servicePrices, setServicePrices] = useState({
    SUV: {
      "Exterior Wash": 20,
      "Interior Cleaning": 30,
      "Wax & Polish": 50,
      "Engine Cleaning": 70,
    },
    Hatchback: {
      "Exterior Wash": 15,
      "Interior Cleaning": 25,
      "Wax & Polish": 40,
      "Engine Cleaning": 60,
    },
    Sedan: {
      "Exterior Wash": 18,
      "Interior Cleaning": 28,
      "Wax & Polish": 45,
      "Engine Cleaning": 65,
    },
    Truck: {
      "Exterior Wash": 25,
      "Interior Cleaning": 35,
      "Wax & Polish": 55,
      "Engine Cleaning": 80,
    },
  });

  return (
    <ServicePriceContext.Provider value={{ servicePrices, setServicePrices }}>
      {children}
    </ServicePriceContext.Provider>
  );
};

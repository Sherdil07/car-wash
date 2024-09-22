const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database/database");
const cors = require("cors"); // Import the database module

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

// Endpoint to add a client
app.post("/api/clients", (req, res) => {
  const { name, phone, carNumber, carType, services, date } = req.body;
  db.run(
    `INSERT INTO clients (name, phone, carNumber, carType, services, date) VALUES (?, ?, ?, ?, ?, ?)`,
    [name, phone, carNumber, carType, services, date],
    function (err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Endpoint to fetch service prices for a specific car type
app.get("/api/prices/:carType", (req, res) => {
  const carType = req.params.carType;
  db.get(`SELECT * FROM prices WHERE carType = ?`, [carType], (err, row) => {
    if (err) {
      return res.status(500).send("Database error");
    }
    if (!row) {
      return res.status(404).send("Car type not found");
    }
    res.json({
      "Exterior Wash": row.exteriorWash,
      "Interior Cleaning": row.interiorCleaning,
      "Wax & Polish": row.waxPolish,
      "Engine Cleaning": row.engineCleaning,
    });
  });
});

// Endpoint to fetch all client records
app.get("/api/clients", (req, res) => {
  db.all("SELECT * FROM clients", [], (err, rows) => {
    if (err) {
      return res.status(500).send("Database error");
    }
    res.json(rows);
  });
});

// Endpoint to update service prices for a specific car type
app.put("/api/update-prices", (req, res) => {
  const { carType, servicePrices } = req.body;
  db.run(
    `UPDATE prices SET exteriorWash = ?, interiorCleaning = ?, waxPolish = ?, engineCleaning = ? WHERE carType = ?`,
    [
      servicePrices["Exterior Wash"],
      servicePrices["Interior Cleaning"],
      servicePrices["Wax & Polish"],
      servicePrices["Engine Cleaning"],
      carType,
    ],
    function (err) {
      if (err) {
        return res.status(500).send("Error updating prices");
      }
      res.send("Prices updated successfully");
    }
  );
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

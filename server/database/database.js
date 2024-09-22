const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database/carwash.db");

db.serialize(() => {
  // Create clients table to store client details
  db.run(`CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    phone TEXT,
    carNumber TEXT,
    carType TEXT,
    services TEXT,
    date TEXT
  )`);

  // Create prices table to store service prices for different car types
  db.run(`CREATE TABLE IF NOT EXISTS prices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    carType TEXT UNIQUE,
    exteriorWash INTEGER,
    interiorCleaning INTEGER,
    waxPolish INTEGER,
    engineCleaning INTEGER
  )`);

  // Insert default service prices for each car type if they don't already exist
  const carTypes = ["SUV", "Hatchback", "Sedan", "Truck"];
  const defaultPrices = {
    SUV: {
      exteriorWash: 20,
      interiorCleaning: 30,
      waxPolish: 50,
      engineCleaning: 70,
    },
    Hatchback: {
      exteriorWash: 15,
      interiorCleaning: 25,
      waxPolish: 40,
      engineCleaning: 60,
    },
    Sedan: {
      exteriorWash: 18,
      interiorCleaning: 28,
      waxPolish: 45,
      engineCleaning: 65,
    },
    Truck: {
      exteriorWash: 25,
      interiorCleaning: 35,
      waxPolish: 55,
      engineCleaning: 80,
    },
  };

  carTypes.forEach((carType) => {
    const { exteriorWash, interiorCleaning, waxPolish, engineCleaning } =
      defaultPrices[carType];
    db.run(
      `INSERT OR IGNORE INTO prices (carType, exteriorWash, interiorCleaning, waxPolish, engineCleaning) VALUES (?, ?, ?, ?, ?)`,
      [carType, exteriorWash, interiorCleaning, waxPolish, engineCleaning]
    );
  });
});

module.exports = db;

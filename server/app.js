const express = require("express");
const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;
const useDummyData = "true";

app.use(express.json());
app.use(express.static(__dirname));
app.use(express.static("frontend"));

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "hotel_database",
  password: "admin",
  port: 5432,
});

// Load dummy data if needed
let dummyData = {};
if (useDummyData) {
  try {
    const data = fs.readFileSync(path.join(__dirname, "dummy_data.json"));
    dummyData = JSON.parse(data);
    console.log("Dummy data loaded successfully.");
  } catch (error) {
    console.error("Failed to load dummy data:", error);
  }
}

// Middleware to serve dummy data for specific endpoints
const serveDummyData = (dataKey) => (req, res, next) => {
  if (useDummyData) {
    if (dummyData[dataKey]) {
      return res.json(dummyData[dataKey]);
    } else {
      console.error(`No dummy data found for key: ${dataKey}`);
      return res.status(500).send("Dummy data not available");
    }
  } else {
    next();
  }
};

// Serve dummy data or database data for each endpoint
app.get("/hotel_chains", serveDummyData("hotel_chains"), async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM hotel_chain");
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error("Error fetching hotel chains", err);
    res.status(500).send("Server Error");
  }
});

app.get("/hotels", serveDummyData("hotels"), async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM hotel");
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error("Error fetching hotels", err);
    res.status(500).send("Server Error");
  }
});

app.get("/employees", serveDummyData("employees"), async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM employee");
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error("Error fetching employees", err);
    res.status(500).send("Server Error");
  }
});

app.get("/customers", serveDummyData("customers"), async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM customer");
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error("Error fetching customers", err);
    res.status(500).send("Server Error");
  }
});

app.get("/rooms", serveDummyData("rooms"), async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM room");
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error("Error fetching rooms", err);
    res.status(500).send("Server Error");
  }
});

app.get("/bookings", serveDummyData("bookings"), async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM book");
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error("Error fetching bookings", err);
    res.status(500).send("Server Error");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Using dummy data: ${useDummyData}`);
});

const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;
const useDummyData = "true";

app.use(express.json());
app.use(express.static(__dirname));
app.use(express.static("frontend"));

// Path to the JSON file
const dataFilePath = path.join(__dirname, "data.json");

// Load data from JSON file
const loadData = () => {
  try {
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to load data from JSON file:", error);
    return {};
  }
};

// Save data to JSON file
const saveData = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Failed to save data to JSON file:", error);
  }
};

// Load dummy data if needed
let dummyData = loadData();

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

// Serve dummy data or manipulate data for each endpoint
app.get("/hotel_chains", serveDummyData("hotel_chains"));

app.get("/hotels", serveDummyData("hotels"));

app.get("/employees", serveDummyData("employees"));

app.get("/customers", serveDummyData("customers"));

app.get("/rooms", serveDummyData("rooms"));

app.get("/bookings", serveDummyData("bookings"));

// CRUD Endpoints
// Create new entry
app.post("/:dataKey", (req, res) => {
  const { dataKey } = req.params;
  const newData = req.body;

  if (useDummyData) {
    if (!dummyData[dataKey]) {
      dummyData[dataKey] = [];
    }
    dummyData[dataKey].push(newData);
    saveData(dummyData);
    res.status(201).send(`New entry added to ${dataKey}.`);
  } else {
    res.status(403).send("Data update not allowed in production mode.");
  }
});

// Read an entry by ID
app.get("/:dataKey/:id", (req, res) => {
  const { dataKey, id } = req.params;

  if (useDummyData) {
    const data = dummyData[dataKey];
    if (data) {
      const entry = data.find((item) => item.id == id);
      if (entry) {
        res.json(entry);
      } else {
        res.status(404).send(`Entry with ID ${id} not found in ${dataKey}.`);
      }
    } else {
      res.status(404).send(`Data key ${dataKey} not found.`);
    }
  } else {
    res.status(403).send("Data retrieval not allowed in production mode.");
  }
});

// Update an entry by ID
app.put("/:dataKey/:id", (req, res) => {
  const { dataKey, id } = req.params;
  const updatedData = req.body;

  if (useDummyData) {
    const data = dummyData[dataKey];
    if (data) {
      const index = data.findIndex((item) => item.id == id);
      if (index !== -1) {
        dummyData[dataKey][index] = {
          ...dummyData[dataKey][index],
          ...updatedData,
        };
        saveData(dummyData);
        res.send(`Entry with ID ${id} updated in ${dataKey}.`);
      } else {
        res.status(404).send(`Entry with ID ${id} not found in ${dataKey}.`);
      }
    } else {
      res.status(404).send(`Data key ${dataKey} not found.`);
    }
  } else {
    res.status(403).send("Data update not allowed in production mode.");
  }
});

// Delete an entry by ID
app.delete("/:dataKey/:id", (req, res) => {
  console.log(req.params);
  const { dataKey, id } = req.params;
  const data = dummyData[dataKey];
  console.log(id);
  if (data) {
    const index = data.findIndex((item) => item.id == id);
    console.log(index);
    if (index !== -1) {
      dummyData[dataKey].splice(index, 1);
      console.log(dummyData);
      saveData(dummyData);
      res.send(`Entry with ID ${id} deleted from ${dataKey}.`);
    } else {
      res.status(404).send(`Entry with ID ${id} not found in ${dataKey}.`);
    }
  } else {
    res.status(404).send(`Data key ${dataKey} not found.`);
  }
});

// Endpoint to update data (for demonstration purposes)
app.post("/update/:dataKey", (req, res) => {
  const { dataKey } = req.params;
  const newData = req.body;

  if (useDummyData) {
    dummyData[dataKey] = newData;
    saveData(dummyData);
    res.send(`Data for ${dataKey} updated successfully.`);
  } else {
    res.status(403).send("Data update not allowed in production mode.");
  }
});

app.get("/users/role/:email", (req, res) => {
  const { email } = req.params;
  console.log(email);

  if (useDummyData) {
    // Check user role from dummy data
    const user =
      dummyData.employees.find((user) => user.email === email) ||
      dummyData.customers.find((user) => user.email === email);

    if (user) {
      let role = "customer"; // default role
      if (dummyData.employees.find((user) => user.email === email)) {
        role = "employee";
      }

      if (
        dummyData.employees.find((user) => user.email === email) &&
        dummyData.employees.find((user) => user.email === email).isManager
      ) {
        role = "manager";
      }
      console.log(role);
      res.json({ role });
    } else {
      res.status(404).send(`No user found with email ${email}`);
    }
  } else {
    res.status(403).send("Role check not allowed in production mode.");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Using dummy data: ${useDummyData}`);
});

const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Add this line to parse JSON bodies
app.use(express.static(__dirname));
app.use(express.static('frontend'));

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'hotel_database',
    password: 'admin',
    port: 5432,
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/index.html');
});

// Get all hotel chains
app.get('/hotel_chains', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM hotel_chain');
        res.json(result.rows);
        client.release();
    } catch (err) {
        console.error('Error fetching hotel chains', err);
        res.status(500).send('Server Error');
    }
});

// Get all hotels
app.get('/hotels', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT hotel.*, address.postalCode FROM hotel JOIN address ON hotel.addressID = address.addressID');
        res.json(result.rows);
        client.release();
    } catch (err) {
        console.error('Error fetching hotel', err);
        res.status(500).send('Server Error');
    }
});


// Add a new hotel
app.post('/hotels', async (req, res) => {
    const { chain_name, category, numberOfRooms, address } = req.body;
    const { streetName, streetNumber, postalCode, unitNumber, cityName, countryName } = address;
    try {
        const client = await pool.connect();

        // Start a transaction
        await client.query('BEGIN');

        // Insert data into the address table
        const addressResult = await client.query('INSERT INTO address (streetName, streetNumber, postalCode, unitNumber, cityName, countryName) VALUES ($1, $2, $3, $4, $5, $6) RETURNING addressID',
            [streetName, streetNumber, postalCode, unitNumber, cityName, countryName]);
        const id = addressResult.rows[0].addressid
        // Insert data into the hotel table
        await client.query('INSERT INTO hotel (chain_name, category, number_of_rooms, addressID) VALUES ($1, $2, $3, $4)',
            [chain_name, category, numberOfRooms, id]);

        // Commit the transaction
        await client.query('COMMIT');
        console.log("ADDED HOTEL")
        res.sendStatus(200);
        client.release();
    } catch (err) {
        // Rollback the transaction in case of error
        await client.query('ROLLBACK');
        res.status(500).send('Server Error');
    }
});

// Update a hotel and its associated address
app.put('/hotels/:hotelId', async (req, res) => {
    const hotelId = req.params.hotelId;
    const { chain_name, category, numberOfRooms, address } = req.body;
    const { streetName, streetNumber, postalCode, unitNumber, cityName, countryName } = address;

    try {
        const client = await pool.connect();

        // Start a transaction
        await client.query('BEGIN');

        // Update data in the address table
        await client.query('UPDATE address SET streetName = $1, streetNumber = $2, postalCode = $3, unitNumber = $4, cityName = $5, countryName = $6 WHERE addressID = (SELECT addressID FROM hotel WHERE hotel_id = $7)',
            [streetName, streetNumber, postalCode, unitNumber, cityName, countryName, hotelId]);

        // Update data in the hotel table
        await client.query('UPDATE hotel SET chain_name = $1, category = $2, number_of_rooms = $3 WHERE hotel_id = $4',
            [chain_name, category, numberOfRooms, hotelId]);

        // Commit the transaction
        await client.query('COMMIT');
        console.log("UPDATED " + hotelId)
        res.sendStatus(200);
        client.release();
    } catch (err) {
        // Rollback the transaction in case of error
        await client.query('ROLLBACK');
        console.error('Error updating hotel:', err);
        res.status(500).send('Server Error');
    }
});


// Delete a hotel
app.delete('/hotels/:hotelId', async (req, res) => {
    const hotelId = req.params.hotelId;
    try {
        const client = await pool.connect();
        const result = await client.query('DELETE FROM hotel WHERE hotel_id = $1', [hotelId]);
        if (result.rowCount === 1) {
            res.sendStatus(200); // Hotel successfully deleted
        } else {
            res.status(404).send('Hotel not found'); // Hotel with given ID not found
        }
        client.release();
    } catch (err) {
        console.error('Error deleting hotel', err);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Get all employees
app.get('/employees', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT employee.*, address.postalCode FROM employee JOIN address ON employee.addressID = address.addressID');
        res.json(result.rows);
        client.release();
    } catch (err) {
        console.error('Error fetching employees', err);
        res.status(500).send('Server Error');
    }
});

// Add a new employee
app.post('/employees', async (req, res) => {
    const { employeeName, role, isManager, ssnNumber, address } = req.body;
    const { streetName, streetNumber, postalCode, unitNumber, cityName, countryName } = address;
    try {
        const client = await pool.connect();

        // Start a transaction
        await client.query('BEGIN');

        // Insert data into the address table
        const addressResult = await client.query('INSERT INTO address (streetName, streetNumber, postalCode, unitNumber, cityName, countryName) VALUES ($1, $2, $3, $4, $5, $6) RETURNING addressID',
            [streetName, streetNumber, postalCode, unitNumber, cityName, countryName]);
        const addressId = addressResult.rows[0].addressid;

        // Insert data into the employee table
        await client.query('INSERT INTO employee (employeeName, role, isManager, ssnNumber, addressID) VALUES ($1, $2, $3, $4, $5)',
            [employeeName, role, isManager, ssnNumber, addressId]);

        // Commit the transaction
        await client.query('COMMIT');
        console.log("ADDED EMPLOYEE")
        res.sendStatus(200);
        client.release();
    } catch (err) {
        // Rollback the transaction in case of error
        await client.query('ROLLBACK');
        console.error('Error adding employee:', err);
        res.status(500).send('Server Error');
    }
});

// Update an employee and their associated address
app.put('/employees/:employeeId', async (req, res) => {
    const employeeId = req.params.employeeId;
    const { employeeName, role, isManager, ssnNumber, address } = req.body;
    const { streetName, streetNumber, postalCode, unitNumber, cityName, countryName } = address;

    try {
        const client = await pool.connect();

        // Start a transaction
        await client.query('BEGIN');

        // Update data in the address table
        await client.query('UPDATE address SET streetName = $1, streetNumber = $2, postalCode = $3, unitNumber = $4, cityName = $5, countryName = $6 WHERE addressID = (SELECT addressID FROM employee WHERE id = $7)',
            [streetName, streetNumber, postalCode, unitNumber, cityName, countryName, employeeId]);

        // Update data in the employee table
        await client.query('UPDATE employee SET employeeName = $1, role = $2, isManager = $3, ssnNumber = $4 WHERE id = $5',
            [employeeName, role, isManager, ssnNumber, employeeId]);

        // Commit the transaction
        await client.query('COMMIT');
        console.log("UPDATED EMPLOYEE " + employeeId)
        res.sendStatus(200);
        client.release();
    } catch (err) {
        // Rollback the transaction in case of error
        await client.query('ROLLBACK');
        console.error('Error updating employee:', err);
        res.status(500).send('Server Error');
    }
});

// Delete an employee
app.delete('/employees/:employeeId', async (req, res) => {
    const employeeId = req.params.employeeId;
    try {
        const client = await pool.connect();
        const result = await client.query('DELETE FROM employee WHERE id = $1', [employeeId]);
        if (result.rowCount === 1) {
            res.sendStatus(200); // Employee successfully deleted
        } else {
            res.status(404).send('Employee not found'); // Employee with given ID not found
        }
        client.release();
    } catch (err) {
        console.error('Error deleting employee', err);
        res.status(500).send('Server Error');
    }
});

//----------------------------------------------------------------------------------------------------------------------
// Get all customers
app.get('/customers', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT customer.*, address.postalCode FROM customer JOIN address ON customer.addressID = address.addressID');
        res.json(result.rows);
        client.release();
    } catch (err) {
        console.error('Error fetching customers', err);
        res.status(500).send('Server Error');
    }
});

// Add a new customer
app.post('/customers', async (req, res) => {
    const { customerName, emailAddress, phoneNumber, cardNumber, idType, dateOfRegistration, address } = req.body;
    const { streetName, streetNumber, postalCode, unitNumber, cityName, countryName } = address;
    try {
        const client = await pool.connect();

        // Start a transaction
        await client.query('BEGIN');

        // Insert data into the address table
        const addressResult = await client.query('INSERT INTO address (streetName, streetNumber, postalCode, unitNumber, cityName, countryName) VALUES ($1, $2, $3, $4, $5, $6) RETURNING addressID',
            [streetName, streetNumber, postalCode, unitNumber, cityName, countryName]);
        const addressId = addressResult.rows[0].addressid;

        // Insert data into the customer table
        await client.query('INSERT INTO customer (customerName, emailAddress, phoneNumber, cardNumber, idType, dateOfRegistration, addressID) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [customerName, emailAddress, phoneNumber, cardNumber, idType, dateOfRegistration, addressId]);

        // Commit the transaction
        await client.query('COMMIT');
        console.log("ADDED CUSTOMER")
        res.sendStatus(200);
        client.release();
    } catch (err) {
        // Rollback the transaction in case of error
        await client.query('ROLLBACK');
        console.error('Error adding customer:', err);
        res.status(500).send('Server Error');
    }
});

// Update a customer and their associated address
app.put('/customers/:customerId', async (req, res) => {
    const customerId = req.params.customerId;
    const { customerName, emailAddress, phoneNumber, cardNumber, idType, dateOfRegistration, address } = req.body;
    const { streetName, streetNumber, postalCode, unitNumber, cityName, countryName } = address;

    try {
        const client = await pool.connect();

        // Start a transaction
        await client.query('BEGIN');

        // Update data in the address table
        await client.query('UPDATE address SET streetName = $1, streetNumber = $2, postalCode = $3, unitNumber = $4, cityName = $5, countryName = $6 WHERE addressID = (SELECT addressID FROM customer WHERE customerId = $7)',
            [streetName, streetNumber, postalCode, unitNumber, cityName, countryName, customerId]);

        // Update data in the customer table
        await client.query('UPDATE customer SET customerName = $1, emailAddress = $2, phoneNumber = $3, cardNumber = $4, idType = $5, dateOfRegistration = $6 WHERE customerId = $7',
            [customerName, emailAddress, phoneNumber, cardNumber, idType, dateOfRegistration, customerId]);

        // Commit the transaction
        await client.query('COMMIT');
        console.log("UPDATED CUSTOMER " + customerId)
        res.sendStatus(200);
        client.release();
    } catch (err) {
        // Rollback the transaction in case of error
        await client.query('ROLLBACK');
        console.error('Error updating customer:', err);
        res.status(500).send('Server Error');
    }
});

// Delete a customer
app.delete('/customers/:customerId', async (req, res) => {
    const customerId = req.params.customerId;
    try {
        const client = await pool.connect();
        const result = await client.query('DELETE FROM customer WHERE customerId = $1', [customerId]);
        if (result.rowCount === 1) {
            res.sendStatus(200); // Customer successfully deleted
        } else {
            res.status(404).send('Customer not found'); // Customer with given ID not found
        }
        client.release();
    } catch (err) {
        console.error('Error deleting customer', err);
        res.status(500).send('Server Error');
    }
});


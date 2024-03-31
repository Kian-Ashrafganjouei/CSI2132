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

// Get all hotel ids
app.get('/hotel_ids', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM hotel');
        res.json(result.rows);
        client.release();
    } catch (err) {
        console.error('Error fetching hotel chains', err);
        res.status(500).send('Server Error');
    }
});

// Get all postal codes
app.get('/all_postals', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT postalCode FROM address');
        res.json(result.rows); // Extract postal codes from the result and send as JSON response
        client.release();
    } catch (err) {
        console.error('Error fetching postal codes', err);
        res.status(500).send('Server Error');
    }
});

// GET endpoint to fetch data from available_rooms_per_area view
app.get('/available_rooms_per_area', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM available_rooms_per_area');
      const data = result.rows;
      client.release(); // Release the client back to the pool
  
      res.json(data); // Send the data as JSON response
    } catch (error) {
      console.error('Error fetching data from available_rooms_per_area:', error);
      res.status(500).send('Internal Server Error'); // Send a 500 error response if there's an error
    }
  });

  app.get('/hotel_aggregated_capacity', async (req, res) => {
    try {
      const query = `
      SELECT hotel_id, total_capacity
      FROM hotel_aggregated_capacity;
      `;
  
      const { rows } = await pool.query(query);
      res.json(rows);
    } catch (error) {
      console.error('Error fetching hotel aggregated capacity:', error);
      res.status(500).json({ error: 'Internal server error' });
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
app.put('/customers', async (req, res) => {
    const { customerName, emailAddress, phoneNumber, cardNumber, idType, dateOfRegistration, address } = req.body;
    const { streetName, streetNumber, postalCode, unitNumber, cityName, countryName } = address;

    try {
        const client = await pool.connect();

        // Start a transaction
        await client.query('BEGIN');

        // Update data in the address table
        await client.query('UPDATE address SET streetName = $1, streetNumber = $2, postalCode = $3, unitNumber = $4, cityName = $5, countryName = $6 WHERE addressID = (SELECT addressID FROM customer WHERE customerName = $7 AND emailAddress = $8 AND phoneNumber = $9)',
            [streetName, streetNumber, postalCode, unitNumber, cityName, countryName, customerName, emailAddress, phoneNumber]);

        // Update data in the customer table
        await client.query('UPDATE customer SET customerName = $1, emailAddress = $2, phoneNumber = $3, cardNumber = $4, idType = $5, dateOfRegistration = $6 WHERE customerName = $7 AND emailAddress = $8 AND phoneNumber = $9',
            [customerName, emailAddress, phoneNumber, cardNumber, idType, dateOfRegistration, customerName, emailAddress, phoneNumber]);

        // Commit the transaction
        await client.query('COMMIT');
        console.log("UPDATED CUSTOMER " + customerName)
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
app.delete('/customers', async (req, res) => {
    const { customerName, emailAddress, phoneNumber } = req.body;
    try {
        const client = await pool.connect();
        const result = await client.query('DELETE FROM customer WHERE customerName = $1 AND emailAddress = $2 AND phoneNumber = $3', [customerName, emailAddress, phoneNumber]);
        if (result.rowCount === 1) {
            res.sendStatus(200); // Customer successfully deleted
        } else {
            res.status(404).send('Customer not found'); // Customer with given identifiers not found
        }
        client.release();
    } catch (err) {
        console.error('Error deleting customer', err);
        res.status(500).send('Server Error');
    }
});

// ================================

// Get all rooms
app.get('/rooms', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM room');
        res.json(result.rows);
        client.release();
    } catch (err) {
        console.error('Error fetching rooms', err);
        res.status(500).send('Server Error');
    }
});

// Add a new room
app.post('/rooms', async (req, res) => {
    const { roomNumber, floorNumber, hotelID, amenities, viewType, canBeExtended, stringComment, isRenting } = req.body;
    try {
        const client = await pool.connect();
        await client.query('INSERT INTO room (roomNumber, floorNumber, hotelID, amenities, viewType, canBeExtended, stringComment, isRenting) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [roomNumber, floorNumber, hotelID, amenities, viewType, canBeExtended, stringComment, isRenting]);
        console.log("ADDED ROOM")
        res.sendStatus(200);
        client.release();
    } catch (err) {
        console.error('Error adding room:', err);
        res.status(500).send('Server Error');
    }
});

// Update a room
app.put('/rooms/:roomNumber/:floorNumber/:hotelID', async (req, res) => {
    const roomNumber = req.params.roomNumber;
    const { floorNumber, hotelID, amenities, viewType, canBeExtended, stringComment, isRenting } = req.body;
    try {
        const client = await pool.connect();
        await client.query('UPDATE room SET amenities = $3, viewType = $4, canBeExtended = $5, stringComment = $6, isRenting = $7 WHERE roomNumber = $8 AND hotelID = $2 AND floorNumber = $1',
            [floorNumber, hotelID, amenities, viewType, canBeExtended, stringComment, isRenting, roomNumber]);
        console.log("UPDATED ROOM " + roomNumber)
        res.sendStatus(200);
        client.release();
    } catch (err) {
        console.error('Error updating room:', err);
        res.status(500).send('Server Error');
    }
});

app.delete('/rooms/:roomNumber/:floorNumber/:hotelID', async (req, res) => {
    const { roomNumber, floorNumber, hotelID } = req.params;
    try {
        const client = await pool.connect();
        await client.query('DELETE FROM room WHERE roomNumber = $1 AND floorNumber = $2 AND hotelID = $3', [roomNumber, floorNumber, hotelID]);
        console.log("DELETED ROOM " + roomNumber + " ON FLOOR " + floorNumber);
        res.sendStatus(200);
        client.release();
    } catch (err) {
        console.error('Error deleting room:', err);
        res.status(500).send('Server Error');
    }
});

// Search for a room
app.post('/search_rooms', async (req, res) => {
    const { startDate, endDate, roomCapacity, area, hotelChain, hotelCategory, viewType, minRooms, maxRooms, minRoomPrice, maxRoomPrice } = req.body;
    try {
        const client = await pool.connect();
        // Construct the SQL query dynamically based on the provided search parameters

        let query = 'SELECT room.*, hotel.category AS category, hotel.number_of_rooms AS number_of_rooms, hotel.chain_name AS chain_name, address.postalCode AS postalcode FROM room JOIN hotel ON room.hotelID = hotel.hotel_id JOIN address ON hotel.addressID = address.addressID WHERE 1 = 1'; // Start with a base query
        // Add conditions based on the provided search parameters
        if (viewType) query += ` AND room.viewType = '${viewType}'`;
        if (minRoomPrice) query += ` AND room.price >= ${minRoomPrice}`;
        if (maxRoomPrice) query += ` AND room.price <= ${maxRoomPrice}`;
        if (roomCapacity) query += ` AND room.capacity = '${roomCapacity}'`;
        if (hotelChain) query += ` AND hotel.chain_name = '${hotelChain}'`; // Include hotelChain filter
        if (hotelCategory) query += ` AND hotel.category = ${hotelCategory}`; // Include hotelCategory filter
        if (area) query += ` AND address.postalCode = '${area}'`; // Include area filter (assuming postalCode represents area)
        // Check for booking conflicts with the provided date range
        if (startDate && endDate) {
            query += ` AND NOT EXISTS (
                            SELECT *
                            FROM book 
                            WHERE book.roomNumber = room.roomNumber 
                            AND book.floorNumber = room.floorNumber 
                            AND book.hotelID = room.hotelID 
                            AND (startDate <= '${endDate}' AND endDate >= '${startDate}')
                        )`;
        }

        console.error('Performing:', query);
        const result = await client.query(query); // Execute the constructed query

        res.json(result.rows); // Send the filtered rooms data as JSON response
        client.release();
    } catch (err) {
        console.error('Error fetching rooms:', err);
        res.status(500).send('Server Error');
    }
});

// Add booking route without availability check
app.post('/book_room', async (req, res) => {
    const { startDate, endDate, customerName, emailAddress, phoneNumber, roomNumber, floorNumber, hotelID } = req.body;
    console.log(roomNumber)
    console.log(floorNumber)
    console.log(hotelID)

    try {
        const client = await pool.connect();

        // Insert booking details into the database
        const insertBookingQuery = `
            INSERT INTO book (startDate, endDate, customerName, emailAddress, phoneNumber, roomNumber, floorNumber, hotelID)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `;
        const insertBookingValues = [startDate, endDate, customerName, emailAddress, phoneNumber, roomNumber, floorNumber, hotelID];
        const insertedBooking = await client.query(insertBookingQuery, insertBookingValues);

        res.json('Success'); // Send the booked room details as JSON response

        client.release();
    } catch (err) {
        console.error('Error booking room:', err);
        res.status(500).send('Server Error');
    }
});

// Get all rooms
app.get('/bookings', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM book');
        res.json(result.rows);
        client.release();
    } catch (err) {
        console.error('Error fetching rooms', err);
        res.status(500).send('Server Error');
    }
});

app.post('/convert', async (req, res) => {
    try {
        const { roomNumber, floorNumber, hotelID } = req.body;

        // Execute SQL update statement to toggle isRenting field
        await pool.query(
            `UPDATE room 
             SET isRenting = NOT isRenting 
             WHERE roomNumber = $1 AND floorNumber = $2 AND hotelID = $3`,
            [roomNumber, floorNumber, hotelID]
        );

        console.log('Booking converted successfully');
        res.sendStatus(200); // Send a success response
    } catch (error) {
        console.error('Error converting:', error);
        res.sendStatus(500); // Send an error response
    }
});
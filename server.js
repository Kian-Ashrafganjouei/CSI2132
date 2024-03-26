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
        const result = await client.query('SELECT * FROM hotel_chains');
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
        const result = await client.query('SELECT * FROM hotels');
        res.json(result.rows);
        client.release();
    } catch (err) {
        console.error('Error fetching hotel', err);
        res.status(500).send('Server Error');
    }
});


// Add a new hotel
app.post('/hotel_chain', async (req, res) => {
    const { chain_name, phone_number, email_address, number_of_hotels  } = req.body;
    try {
        const client = await pool.connect();
        const result = await client.query('INSERT INTO hotel_chains (chain_name, phone_number, email_address, number_of_hotels) VALUES ($1, $2, $3, $4)', [chain_name, phone_number, email_address, number_of_hotels]);
        res.sendStatus(200);
        client.release();
    } catch (err) {
        console.error('Error adding hotel chain', err);
        res.status(500).send('Server Error');
    }
});

// Add a new hotel
app.post('/hotels', async (req, res) => {
    const { chain_name, category, numberOfRooms  } = req.body;
    try {
        const client = await pool.connect();
        const result = await client.query('INSERT INTO hotels (chain_name, category, number_of_rooms) VALUES ($1, $2, $3)', [chain_name, category, numberOfRooms]);
        res.sendStatus(200);
        client.release();
    } catch (err) {
        console.error('Error adding hotel', err);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Add this line to parse JSON bodies
app.use(express.static(__dirname));

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

// Get all hotels
app.get('/hotels', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM hotels');
        res.json(result.rows);
        client.release();
    } catch (err) {
        console.error('Error fetching hotels', err);
        res.status(500).send('Server Error');
    }
});

// Add a new hotel
app.post('/hotels', async (req, res) => {
    const { hotelName, userInput } = req.body;
    try {
        const client = await pool.connect();
        const result = await client.query('INSERT INTO hotels (hotel_name, user_input) VALUES ($1, $2)', [hotelName, userInput]);
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

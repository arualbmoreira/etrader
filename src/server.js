const express = require('express');
const mysql = require('mysql');
var cors = require('cors') 
const app = express();

// Create a connection pool to handle database connections
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'test',
    port: 3306
});

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors())
// Route to handle user login
app.post('/users', (req, res) => {
    const { username, password } = req.body;

    // Query the database to check if the provided username and password combination exists
    pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        if (results.length > 0) {
            // User login successful
            res.status(200).json({ success: true, message: 'Login successful' });
        } else {
            // User login failed (invalid username or password)
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    });
});

// Route to get all users
app.get('/users', (req, res) => {
    // Query the database to select all rows from the users table
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        // Send the retrieved data as JSON response
        res.status(200).json(results);
    });
});

// Start the server
app.listen(2222, () => {
    console.log('Server is running on port 2222');
});
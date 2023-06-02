const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'banking_app',
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL server');
});

// Define API endpoints
app.get('/api/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM users WHERE id = ?';
  connection.query(sql, [id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

app.get('/api/transfers', (req, res) => {
  const sql = 'SELECT * FROM transfers';
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/transfers', (req, res) => {
  const { senderId, receiverId, amount } = req.body;
  const sql = 'INSERT INTO transfers (sender_id, receiver_id, amount) VALUES (?, ?, ?)';
  connection.query(sql, [senderId, receiverId, amount], (err) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
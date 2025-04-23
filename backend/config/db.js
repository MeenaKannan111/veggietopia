//const mysql = require('mysql2');
import mysql from 'mysql2';
const db = mysql.createConnection({
    host: 'localhost', // or your database host
    user: 'root', // replace with your MySQL username
    password: 'Meena@2925', // replace with your MySQL password
    database: 'veggietopia' // replace with your database name
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

export default db;


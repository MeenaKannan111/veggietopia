
import express from 'express';
import mysql from 'mysql2';
import session from "express-session";
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import authRoutes from "./routes/auth.js";

import recommendationRoutes from './backend/routes/recommendationRoutes.js';
import consumerRoutes from './backend/routes/consumerRoutes.js';


const app = express();
app.use(cors());
app.use(bodyParser.json());


// Global request logger middleware
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

app.use('/api', consumerRoutes);  // Register consumer routes

app.use("/", authRoutes);
// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // replace with your MySQL username
    password: 'Meena@2925', // replace with your MySQL password
    database: 'veggietopia'
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

// User registration endpoint
app.post('/api/register', (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role], (err, results) => {
        if (err) {
            return res.status(500).send('Error registering user');
        }

        res.status(201).send('User registered');

    });
});

// User login endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).send('Invalid credentials');
        }
        const user = results[0];
        if (bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ id: user.id, role: user.role }, 'your_jwt_secret');
            res.json({ token, role: user.role });
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});

// Get products
app.get('/api/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching products');
        }
        res.json(results);
    });
});

// Add a new product (for farmers)
app.post('/api/products', (req, res) => {
    const { name, price } = req.body;
    const userId = req.userId; // Get user ID from the token

    // Check if the user is a farmer
    db.query('SELECT role FROM users WHERE id = ?', [userId], (err, results) => {
        if (err || results.length === 0) {
            return res.status(403).send('Access denied');
        }
        const userRole = results[0].role;
        if (userRole !== 'farmer') {
            return res.status(403).send('Access denied');
        }
        db.query('INSERT INTO products (name, price, farmer_id) VALUES (?, ?, ?)', [name, price, userId], (err, results) => {
            if (err) {
                return res.status(500).send('Error adding product');
            }
            res.status(201).send('Product added');
        });
    });
});

// Middleware to authenticate user
const authenticateJWT = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
        jwt.verify(token, 'your_jwt_secret', (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.userId = user.id;
            req.userRole = user.role;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};



// Use recommendation routes
app.use('/recommendations', recommendationRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});


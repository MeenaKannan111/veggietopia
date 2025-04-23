// backend/controllers/consumerController.js
import db from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { name, email, password, address } = req.body;

    if (!name || !email || !password || !address) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert consumer into the database
        const result = await db.promise().query(
            "INSERT INTO consumers (name, email, password, address) VALUES (?, ?, ?, ?)",
            [name, email, hashedPassword, address]
        );

        res.status(201).json({ message: "Consumer registered successfully", consumerId: result[0].insertId });
    } catch (error) {
        console.error("Error registering consumer:", error);
        res.status(500).json({ error: "Failed to register consumer" });
    }
};
// exports.login = (req, res) => {
//     const { email, password } = req.body;
//     console.log('Login attempt:', { email, password }); // Log the incoming request

//     const sql = 'SELECT * FROM consumers WHERE email = ?';
//     console.log('Executing query:', sql);

//     db.query(sql, [email], (err, results) => {
//         if (err) {
//             console.error('Database error:', err); // Log database errors
//             return res.status(500).send(err);
//         }

//         console.log('Query result:', results); // Log the query results
        
//         if (results.length === 0) {
//             console.log('Consumer not found:', email); // Log if consumer is not found
//             return res.status(404).send({ message: 'Consumer not found!' });
//         }

//         const consumer = results[0];
//         console.log('Fetched consumer:', consumer);

//         const isValidPassword = bcrypt.compareSync(password, consumer.password);
//         console.log('Password comparison result:', isValidPassword);

//         if (!isValidPassword) {
//             console.log('Invalid password for consumer:', email);
//             return res.status(401).send({ message: 'Invalid password!' });
//         }

//         const token = jwt.sign({ id: consumer.id }, 'secretkey', { expiresIn: '1h' });
//         console.log('Generated token:', token);
//         res.json({
//             token,
//             user: {
//                 id: consumer.id,  // ✅ Make sure `id` is sent properly
//                 name: consumer.name, 
//                 email: consumer.email, 
//                 address: consumer.address
//             }
//         });
    
//     } catch (error) {
//         console.error('Login error:', error);
//         res.status(500).json({ message: 'Something went wrong, please try again' });
//     }
// });
export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("Login attempt:", { email, password });

    try {
        const query = 'SELECT * FROM consumers WHERE email = ?';

        // ✅ FIXED: Use `db.promise().execute()` for proper async/await
        const [rows] = await db.promise().execute(query, [email]);

        console.log("Query result:", rows);

        if (!rows || rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const consumer = rows[0];
        console.log("Fetched consumer:", consumer);

        // ✅ Check password using bcrypt
        const passwordMatch = await bcrypt.compare(password, consumer.password);
        console.log("Password comparison result:", passwordMatch);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // ✅ Generate JWT token
        const token = jwt.sign({ id: consumer.id }, 'your_secret_key', { expiresIn: '1h' });
        console.log("Generated token:", token);

        // ✅ Send token & user details in response
        res.json({
            token,
            user: {
                id: consumer.id,  
                name: consumer.name, 
                email: consumer.email, 
                address: consumer.address
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
};


export const getDashboard = (req, res) => {
    const sql = 'SELECT * FROM consumers WHERE id = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(results[0]);
    });
};

// export const placeOrder = (req, res) => {
//     const { consumer_id, product_id } = req.body;
//     const sql = 'INSERT INTO orders (consumer_id, product_id, status) VALUES (?, ?, ?)';
//     db.query(sql, [consumer_id, product_id, 'Pending'], (err, result) => {
//         if (err) return res.status(500).send(err);
//         res.status(201).send({ message: 'Order placed successfully!' });
//     });
// };


export const getProducts = async (req, res) => {
    const { search, category, location, minPrice, maxPrice, sort } = req.query;

    let sql = `
        SELECT 
            products.*, 
            farmers.name AS farmer_name, 
            farmers.phone_number AS farmer_contact 
        FROM products 
        JOIN farmers ON products.farmer_id = farmers.id
        WHERE 1=1
    `;
    const params = [];

    // Apply filters
    if (search) {
        sql += " AND products.name LIKE ?";
        params.push(`%${search}%`);
    }
    if (category) {
        sql += " AND products.category = ?";
        params.push(category);
    }
    if (location) {
        sql += " AND products.location = ?";
        params.push(location);
    }
    if (minPrice) {
        sql += " AND products.price >= ?";
        params.push(minPrice);
    }
    if (maxPrice) {
        sql += " AND products.price <= ?";
        params.push(maxPrice);
    }

    // Apply sorting
    if (sort === "min-to-max") {
        sql += " ORDER BY products.price ASC";
    } else if (sort === "max-to-min") {
        sql += " ORDER BY products.price DESC";
    }

    try {
        const [rows] = await db.promise().query(sql, params);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
};

export const getRecommendations = async (req, res) => {
    const { consumerId } = req.params;

    const sql = `
        SELECT 
            products.*, 
            farmers.name AS farmer_name 
        FROM products 
        JOIN farmers ON products.farmer_id = farmers.id
        WHERE products.category IN (
            SELECT DISTINCT products.category 
            FROM orders 
            JOIN products ON orders.product_id = products.id 
            WHERE orders.consumer_id = ?
        )
        LIMIT 10
    `;

    try {
        const [rows] = await db.promise().query(sql, [consumerId]);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        res.status(500).json({ error: "Failed to fetch recommendations" });
    }
};

export const placeOrder = async (req, res) => {
    const { consumer_id, product_id, quantity } = req.body;

    try {
        // Check stock availability
        const [product] = await db.promise().query(
            "SELECT stock FROM products WHERE id = ?",
            [product_id]
        );

        if (!product || product[0].stock < quantity) {
            return res.status(400).json({ error: "Insufficient stock" });
        }

        // Place the order
        const sql = `
            INSERT INTO orders (consumer_id, product_id, quantity, status) 
            VALUES (?, ?, ?, 'Confirmed')
        `;
        await db.promise().query(sql, [consumer_id, product_id, quantity]);

        // Update product stock
        await db.promise().query(
            "UPDATE products SET stock = stock - ? WHERE id = ?",
            [quantity, product_id]
        );

        res.status(201).json({ message: "Order placed successfully!" });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ error: "Failed to place order" });
    }
};

export const getOrderStatus = async (req, res) => {
    const { orderId } = req.params;

    try {
        const [rows] = await db.promise().query(
            "SELECT status FROM orders WHERE id = ?",
            [orderId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Error fetching order status:", error);
        res.status(500).json({ error: "Failed to fetch order status" });
    }
};

export const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        console.log(`Fetching product with ID: ${id}`); // Log the product ID being queried

        const [rows] = await db.promise().query(
            `SELECT 
                products.id, 
                products.name, 
                products.price, 
                products.quantity AS stock, 
                products.category, 
                products.description, 
                farmers.name AS farmer_name, 
                farmers.phone_number AS farmer_contact 
            FROM products 
            JOIN farmers ON products.farmer_id = farmers.id 
            WHERE products.id = ?`,
            [id]
        );
        console.log("Query result:", rows); // Log the query result

        if (rows.length === 0) {
            console.log(`No products found for farmer ID: ${farmerId}`); // Log if no products are found
            return res.status(404).json({ error: "No products found for this farmer" });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "Failed to fetch product" });
    }
};
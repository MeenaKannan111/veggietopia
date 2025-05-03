<<<<<<< HEAD
=======
// backend/controllers/consumerController.js
>>>>>>> 0c2c563e9c323979057143631318859bc55e43c5
import db from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { name, email, password, address } = req.body;

    if (!name || !email || !password || !address) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
<<<<<<< HEAD
        const hashedPassword = await bcrypt.hash(password, 10);
=======
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert consumer into the database
>>>>>>> 0c2c563e9c323979057143631318859bc55e43c5
        const result = await db.promise().query(
            "INSERT INTO consumers (name, email, password, address) VALUES (?, ?, ?, ?)",
            [name, email, hashedPassword, address]
        );
<<<<<<< HEAD
=======

>>>>>>> 0c2c563e9c323979057143631318859bc55e43c5
        res.status(201).json({ message: "Consumer registered successfully", consumerId: result[0].insertId });
    } catch (error) {
        console.error("Error registering consumer:", error);
        res.status(500).json({ error: "Failed to register consumer" });
    }
};
<<<<<<< HEAD

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const query = 'SELECT * FROM consumers WHERE email = ?';
        const [rows] = await db.promise().execute(query, [email]);

=======
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

>>>>>>> 0c2c563e9c323979057143631318859bc55e43c5
        if (!rows || rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const consumer = rows[0];
<<<<<<< HEAD
        const passwordMatch = await bcrypt.compare(password, consumer.password);
=======
        console.log("Fetched consumer:", consumer);

        // ✅ Check password using bcrypt
        const passwordMatch = await bcrypt.compare(password, consumer.password);
        console.log("Password comparison result:", passwordMatch);
>>>>>>> 0c2c563e9c323979057143631318859bc55e43c5

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

<<<<<<< HEAD
        //const token = jwt.sign({ id: consumer.id }, 'your_jwt_secret', { expiresIn: '1h' });
        const token = jwt.sign({ id: consumer.id }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1h' });
        res.json({
            token,
            user: {
                id: consumer.id,
                name: consumer.name,
                email: consumer.email,
                address: consumer.address
            }
        });
=======
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

>>>>>>> 0c2c563e9c323979057143631318859bc55e43c5
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
};

<<<<<<< HEAD
export const getDashboard = async (req, res) => {
    const sql = 'SELECT * FROM consumers WHERE id = ?';
    try {
        const [results] = await db.promise().query(sql, [req.params.id]);
        if (results.length === 0) {
            return res.status(404).json({ error: "Consumer not found" });
        }
        res.status(200).json(results[0]);
    } catch (error) {
        console.error("Error fetching consumer dashboard:", error);
        res.status(500).json({ error: "Failed to fetch consumer dashboard" });
    }
};

=======

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


>>>>>>> 0c2c563e9c323979057143631318859bc55e43c5
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

<<<<<<< HEAD
=======
    // Apply filters
>>>>>>> 0c2c563e9c323979057143631318859bc55e43c5
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

<<<<<<< HEAD
=======
    // Apply sorting
>>>>>>> 0c2c563e9c323979057143631318859bc55e43c5
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

<<<<<<< HEAD
export const placeOrder = async (req, res) => {
    const { product_id, quantity } = req.body;
    const consumer_id = req.user.id;

    if (!product_id || !quantity || quantity <= 0) {
        return res.status(400).json({ error: "Invalid product ID or quantity provided." });
    }

    try {
        await db.promise().query('START TRANSACTION');

        const [productRows] = await db.promise().query(
            "SELECT quantity FROM products WHERE id = ? FOR UPDATE",
            [product_id]
        );

        if (productRows.length === 0) {
            await db.promise().query('ROLLBACK');
            return res.status(404).json({ error: "Product not found." });
        }

        const availableQuantity = productRows[0].quantity;
        if (availableQuantity < quantity) {
            await db.promise().query('ROLLBACK');
            return res.status(400).json({ error: "Insufficient stock available." });
        }

        const insertOrderSql = `
            INSERT INTO orders (consumer_id, product_id, quantity, status) 
            VALUES (?, ?, ?, 'Pending')
        `;
        await db.promise().query(insertOrderSql, [consumer_id, product_id, quantity]);

        const updateStockSql = `
            UPDATE products SET quantity = quantity - ? WHERE id = ?
        `;
        await db.promise().query(updateStockSql, [quantity, product_id]);

        await db.promise().query('COMMIT');

        res.status(201).json({ message: "Order placed successfully!" });
    } catch (error) {
        await db.promise().query('ROLLBACK');
        console.error("Error placing order:", error);
        res.status(500).json({ error: "An error occurred while placing the order. Please try again later." });
=======
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
>>>>>>> 0c2c563e9c323979057143631318859bc55e43c5
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

<<<<<<< HEAD
export const getOrdersByConsumerId = async (req, res) => {
    const { consumerId } = req.params;

    try {
        const sql = `
            SELECT 
                orders.id,
                products.name AS product_name,
                farmers.name AS farmer_name,
                products.price,
                orders.quantity,
                orders.status
            FROM orders
            JOIN products ON orders.product_id = products.id
            JOIN farmers ON products.farmer_id = farmers.id
            WHERE orders.consumer_id = ?
            ORDER BY orders.id DESC
        `;

        const [rows] = await db.promise().query(sql, [consumerId]);

        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching orders for consumer:", error);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
};

=======
>>>>>>> 0c2c563e9c323979057143631318859bc55e43c5
export const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
<<<<<<< HEAD
=======
        console.log(`Fetching product with ID: ${id}`); // Log the product ID being queried

>>>>>>> 0c2c563e9c323979057143631318859bc55e43c5
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
<<<<<<< HEAD

        if (rows.length === 0) {
            return res.status(404).json({ error: "Product not found" });
=======
        console.log("Query result:", rows); // Log the query result

        if (rows.length === 0) {
            console.log(`No products found for farmer ID: ${farmerId}`); // Log if no products are found
            return res.status(404).json({ error: "No products found for this farmer" });
>>>>>>> 0c2c563e9c323979057143631318859bc55e43c5
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "Failed to fetch product" });
    }
<<<<<<< HEAD
};

export const getRecommendations = async (req, res) => {
    const { consumerId } = req.params;

    try {
        // Assuming recommendations are stored in a table or generated dynamically
        const sql = `
            SELECT 
                products.id,
                products.name,
                products.price,
                farmers.name AS farmer_name
            FROM recommendations
            JOIN products ON recommendations.product_id = products.id
            JOIN farmers ON products.farmer_id = farmers.id
            WHERE recommendations.consumer_id = ?
        `;

        const [rows] = await db.promise().query(sql, [consumerId]);

        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        res.status(500).json({ error: "Failed to fetch recommendations" });
    }
};
export const getCart = async (req, res) => {
    const consumerId = req.user.id;
    try {
        const [rows] = await db.promise().query(
            `SELECT c.product_id AS id, c.quantity, p.name, p.price 
             FROM cart c 
             JOIN products p ON c.product_id = p.id 
             WHERE c.consumer_id = ?`,
            [consumerId]
        );
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ error: "Failed to fetch cart" });
    }
};
export const addToCart = async (req, res) => {
    const consumerId = req.user.id;
    const { productId, quantity } = req.body;
    try {
        const [rows] = await db.promise().query(
            'SELECT quantity FROM cart WHERE consumer_id = ? AND product_id = ?',
            [consumerId, productId]
        );
        if (rows.length > 0) {
            const newQuantity = rows[0].quantity + quantity;
            await db.promise().query(
                'UPDATE cart SET quantity = ? WHERE consumer_id = ? AND product_id = ?',
                [newQuantity, consumerId, productId]
            );
        } else {
            await db.promise().query(
                'INSERT INTO cart (consumer_id, product_id, quantity) VALUES (?, ?, ?)',
                [consumerId, productId, quantity]
            );
        }
        res.status(200).json({ message: "Cart updated successfully" });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ error: "Failed to add to cart" });
    }
};

export const removeFromCart = async (req, res) => {
    const consumerId = req.user.id;
    const { productId } = req.body;
    try {
        await db.promise().query(
            'DELETE FROM cart WHERE consumer_id = ? AND product_id = ?',
            [consumerId, productId]
        );
        res.status(200).json({ message: "Item removed from cart" });
    } catch (error) {
        console.error("Error removing from cart:", error);
        res.status(500).json({ error: "Failed to remove item from cart" });
    }
=======
>>>>>>> 0c2c563e9c323979057143631318859bc55e43c5
};
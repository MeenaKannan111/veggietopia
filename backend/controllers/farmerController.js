// backend/controllers/farmerController.js
import db from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const register = async (req, res) => {
    const { name, email, password, farm_details, phone_number, farm_location } = req.body;

    if (!name || !email || !password || !farm_details || !phone_number) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Your database logic here
        const result = await db.query(
            "INSERT INTO farmers (name, email, password, farm_details, phone_number, farm_location) VALUES (?, ?, ?, ?, ?, ?)",
            [name, email, password, farm_details, phone_number, farm_location]
        );

        res.status(201).json({ message: "Farmer registered successfully", farmerId: result.insertId });
    } catch (error) {
        console.error("Error registering farmer:", error);
        res.status(500).json({ error: "Failed to register farmer" });
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("Login attempt:", { email, password });

    try {
        const query = 'SELECT * FROM farmers WHERE email = ?';

        // ✅ FIXED: Use `db.promise().execute()` for proper async/await
        const [rows] = await db.promise().execute(query, [email]);

        console.log("Query result:", rows);

        if (!rows || rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const consumer = rows[0];
        console.log("Fetched farmer:", consumer);

        // ✅ Check password using bcrypt
        const passwordMatch = await bcrypt.compare(password, consumer.password);
        console.log("Password comparison result:", passwordMatch);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

<<<<<<< HEAD
        // ✅ Generate JWT token with consistent secret
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
                console.log("Generated token:", token);

        // ✅ Send token & user details in response
        // res.json({
        //     token,
        //     user: {
        //         id: consumer.id,  
        //         name: consumer.name, 
        //         email: consumer.email, 
        //         address: consumer.address
        //     }
        // });
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



export const getDashboard = async (req, res) => {
    const farmerId = req.params.id;
  
    try {
      const [rows] = await db.promise().query(
        "SELECT name, email, farm_details, phone_number FROM farmers WHERE id = ?",
        [farmerId]
      );
  
      if (rows.length === 0) {
        return res.status(404).json({ error: "Farmer not found" });
      }
  
<<<<<<< HEAD
      console.log("Fetched farmer details:", rows[0]);
=======
>>>>>>> 0c2c563e9c323979057143631318859bc55e43c5
      res.status(200).json(rows[0]); // Send the farmer details
    } catch (error) {
      console.error("Error fetching farmer details:", error);
      res.status(500).json({ error: "Failed to fetch farmer details" });
    }
  };

<<<<<<< HEAD
export const getProductsByFarmer = async (req, res) => {
    const farmerId = req.params.id;
    const sql = 'SELECT id, name, price, quantity AS stock FROM products WHERE farmer_id = ?';

    try {
        const [results] = await db.promise().query(sql, [farmerId]);
        console.log("Fetched products:", results);
        res.status(200).json(results);
    } catch (err) {
        console.error("Error fetching products for farmer:", err);
        res.status(500).json({ error: "Failed to fetch products" });
    }
=======
export const getProductsByFarmer = (req, res) => {
    const farmerId = req.params.id;
    const sql = 'SELECT id, name, price, quantity AS stock FROM products WHERE farmer_id = ?';
    //console.log("Fetched products:", results);
    
    db.query(sql, [farmerId], (err, results) => {
        if (err) {
            console.error("Error fetching products for farmer:", err);
            return res.status(500).json({ error: "Failed to fetch products" });
        }
       
       
        console.log("Fetched products:", results); // Move this inside the callback
        res.status(200).json(results);
    });
>>>>>>> 0c2c563e9c323979057143631318859bc55e43c5
};

export const addProduct = (req, res) => {
    const { name, price, stock } = req.body;
    const farmer_id = parseInt(req.body.farmer_id, 10); // Convert farmer_id to integer

    if (!name || !price || !stock || !farmer_id) {
        return res.status(400).json({ error: "All fields (name, price, stock, farmer_id) are required" });
    }

    console.log("Request body:", req.body); 
    const sql = 'INSERT INTO products (farmer_id, name, price, quantity) VALUES (?, ?, ?, ?)';
    db.query(sql, [farmer_id, name, price, stock], (err, result) => {
        if (err) {
            console.error("Error adding product:", err);
            return res.status(500).send(err);
        }
        res.status(201).send({ message: 'Product added successfully!' });
    });
};


export const updateProduct = (req, res) => {
    const { name, price, quantity } = req.body;
    const productId = req.params.id;

<<<<<<< HEAD
    if (!name || !price || !quantity) {
        return res.status(400).json({ error: "All fields (name, price, quantity) are required" });
=======
    if (!name || !price || !stock) {
        return res.status(400).json({ error: "All fields (name, price, stock) are required" });
>>>>>>> 0c2c563e9c323979057143631318859bc55e43c5
    }

    const sql = 'UPDATE products SET name = ?, price = ?, quantity = ? WHERE id = ?';
    db.query(sql, [name, price, quantity, productId], (err, result) => {
        if (err) {
            console.error("Error updating product:", err);
            return res.status(500).json({ error: "Failed to update product" });
        }
        res.status(200).json({ message: "Product updated successfully!" });
    });
};

export const removeProduct = (req, res) => {
    const productId = req.params.id;

    if (!productId) {
        return res.status(400).json({ error: "Product ID is required" });
    }

    const sql = 'DELETE FROM products WHERE id = ?';
    db.query(sql, [productId], (err, result) => {
        if (err) {
            console.error("Error deleting product:", err);
            return res.status(500).json({ error: "Failed to delete product" });
        }
        res.status(200).json({ message: "Product removed successfully!" });
    });
};
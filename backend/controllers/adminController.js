// backend/controllers/adminController.js
import db from '../config/db.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getDashboard = (req, res) => {
    // Fetch farmers, consumers, orders, products for admin dashboard
    const admin = req.user;

    const farmersSql = 'SELECT id, name, email FROM farmers';
    const consumersSql = 'SELECT id, name, email FROM consumers';
    const ordersSql = `
        SELECT orders.id, products.name AS product_name, consumers.name AS consumer_name, orders.status
        FROM orders
        JOIN products ON orders.product_id = products.id
        JOIN consumers ON orders.consumer_id = consumers.id
    `;
    const productsSql = `
        SELECT products.id, products.name, products.price, farmers.name AS farmer_name
        FROM products
        JOIN farmers ON products.farmer_id = farmers.id
    `;

    db.query(farmersSql, (err, farmers) => {
        if (err) return res.status(500).send(err);
        db.query(consumersSql, (err, consumers) => {
            if (err) return res.status(500).send(err);
            db.query(ordersSql, (err, orders) => {
                if (err) return res.status(500).send(err);
                db.query(productsSql, (err, products) => {
                    if (err) return res.status(500).send(err);
                    res.status(200).json({ admin, farmers, consumers, orders, products });
                });
            });
        });
      });
  };

export const removeFarmer = (req, res) => {
    const sql = 'DELETE FROM farmers WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send({ message: 'Farmer removed successfully!' });
    });
};

export const removeConsumer = (req, res) => {
    const sql = 'DELETE FROM consumers WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send({ message: 'Consumer removed successfully!' });
    });

};

export const login = (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM admins WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err) return res.status(500).send({ message: 'Database error', error: err });
        if (results.length === 0) return res.status(401).send({ message: 'Invalid email or password' });

        const admin = results[0];
        console.log("DB admin password hash: ", admin.password); // Debug: check hash format
         const match = await bcrypt.compare(password, admin.password);
        console.log("Password match result: ", match); // Debug: see true/false

        const token = jwt.sign(
            { id: admin.id, email: admin.email, name: admin.name, role: 'admin' },
            process.env.JWT_SECRET || 'secretkey',
            { expiresIn: '1h' }
          ); res.status(200).json({ token, user: { id: admin.id, name: admin.name, email: admin.email } });
    });
};

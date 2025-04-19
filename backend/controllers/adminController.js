// backend/controllers/adminController.js
import db from '../config/db.js';

export const getDashboard = (req, res) => {
    const sql = 'SELECT * FROM farmers';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(results);
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
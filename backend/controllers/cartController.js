import db from '../config/db.js';

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
};
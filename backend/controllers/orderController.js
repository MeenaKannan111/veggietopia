
import db from '../config/db.js';
import { sendEmail } from '../utils/mailer.js';


export const placeOrder = async (req, res) => {
    console.log("placeOrder called with body:", req.body);
    let { product_id, quantity } = req.body;
    const consumer_id = req.user.id;

    // Convert product_id and quantity to numbers if they are strings
    product_id = Number(product_id);
    quantity = Number(quantity);

    if (!product_id || !quantity || quantity <= 0) {
        console.log("Invalid product ID or quantity:", product_id, quantity);
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
        // if (availableQuantity < quantity) {
        //     await db.promise().query('ROLLBACK');
        //     return res.status(400).json({ error: "Insufficient stock available." });
        // }

        // Fetch product price to calculate amount
        const [priceRows] = await db.promise().query(
            "SELECT price FROM products WHERE id = ?",
            [product_id]
        );
        if (priceRows.length === 0) {
            await db.promise().query('ROLLBACK');
            return res.status(404).json({ error: "Product not found for price calculation." });
        }
        const price = priceRows[0].price;
        const amount = price * quantity;

        const insertOrderSql = `
            INSERT INTO orders (consumer_id, product_id, quantity, status, amount) 
            VALUES (?, ?, ?, 'Pending', ?)
        `;
        await db.promise().query(insertOrderSql, [consumer_id, product_id, quantity, amount]);

        const updateStockSql = `
            UPDATE products SET quantity = quantity - ? WHERE id = ?
        `;
        await db.promise().query(updateStockSql, [quantity, product_id]);

        await db.promise().query('COMMIT');

        res.status(201).json({ message: "Order placed successfully!" });
    } catch (error) {
        await db.promise().query('ROLLBACK');
        console.error("Error placing order:", error.stack || error);
        res.status(500).json({ error: "An error occurred while placing the order. Please try again later." });
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

export const getOrdersByConsumerId = async (req, res) => {
    const { consumerId } = req.params;
    console.log(`Fetching orders for consumerId: ${consumerId}`);

    try {
        const sql = `
            SELECT 
                orders.id,
                products.name AS product_name,
                farmers.name AS farmer_name,
                products.price,
                orders.quantity,
                orders.status,
                orders.amount
            FROM orders
            JOIN products ON orders.product_id = products.id
            JOIN farmers ON products.farmer_id = farmers.id
            WHERE orders.consumer_id = ?
            ORDER BY orders.id DESC
        `;

        const [rows] = await db.promise().query(sql, [consumerId]);
        console.log(`Found ${rows.length} orders for consumerId: ${consumerId}`);

        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching orders for consumer:", error);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
};

export const getOrdersByFarmerId = async (req, res) => {
    const { farmerId } = req.params;

    try {
        const sql = `
            SELECT 
                orders.id,
                products.name AS product_name,
                consumers.name AS consumer_name,
                orders.quantity,
                orders.status,
                orders.amount AS total_price
            FROM orders
            JOIN products ON orders.product_id = products.id
            JOIN consumers ON orders.consumer_id = consumers.id
            WHERE products.farmer_id = ?
            ORDER BY orders.id DESC
        `;

        const [rows] = await db.promise().query(sql, [farmerId]);

        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching orders for farmer:", error);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
};


export const updateOrderStatus = async (req, res) => {
    console.log('updateOrderStatus called with params:', req.params, 'body:', req.body);
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ['Pending', 'Confirmed', 'Out for Delivery', 'Cancelled', 'Delivered'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: "Invalid status value" });
    }

    try {
        // Get consumer email for the order
        const [orderRows] = await db.promise().query(
            `SELECT consumers.email FROM orders
             JOIN consumers ON orders.consumer_id = consumers.id
             WHERE orders.id = ?`,
            [orderId]
        );

        if (orderRows.length === 0) {
            return res.status(404).json({ error: "Order not found" });
        }

        const consumerEmail = orderRows[0].email;

        // Update order status
        const sql = `
            UPDATE orders
            SET status = ?
            WHERE id = ?
        `;

        const [result] = await db.promise().query(sql, [status, orderId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Order not found" });
        }

        // Send notification email to consumer
        try {
            await sendEmail({
                to: consumerEmail,
                subject: 'Order Status Update',
                html: `<p>Your order <strong>#${orderId}</strong> status is now: ${status}</p>`,
                text: `Your order #${orderId} status is now: ${status}`,
            });
        } catch (emailError) {
            console.error('Failed to send notification email:', emailError);
            // Continue without failing the request
        }
        console.error('sent');
        res.status(200).json({ message: "Order status updated and notification sent successfully" });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ error: "Failed to update order status" });
    }
};

// export const updateOrderStatus = (req, res) => {
//     const orderId = req.params.id;
//     const newStatus = req.body.status;
//     // Update order status in DB logic here
    
//     // After a successful update, notify the consumer:
//     const consumerEmail = req.body.consumerEmail; // Get the email from DB or request
//     sendEmail({
//       to: consumerEmail,
//       subject: 'Order Status Update',
//       html: `<p>Your order #${orderId} has been updated to: <strong>${newStatus}</strong></p>`,
//       text: `Your order #${orderId} status has been updated to: ${newStatus}`,
//     })
//     .then(() => console.log('Notification email sent'))
//     .catch(err => console.error('Error sending notification email:', err));
  
//     res.status(200).json({ message: 'Order status updated and consumer notified' });
//   };export const updateOrderStatusByFarmer = async (req, res) => {
    export const updateOrderStatusByFarmer = async (req, res) => {
  
    console.log('updateOrderStatus called with params:', req.params, 'body:', req.body);
    
    const { orderId } = req.params;
    const { status: newStatus } = req.body;
    const farmerId = req.user.id;
    
    const validStatuses = ['Pending', 'Confirmed', 'Out for Delivery', 'Cancelled', 'Delivered'];
    if (!validStatuses.includes(newStatus)) {
        return res.status(400).json({ error: "Invalid status value" });
    }
    
    // Define allowed state transitions
    const allowedTransitions = {
        Pending: ['Confirmed', 'Cancelled'],
        Confirmed: ['Out for Delivery', 'Cancelled'],
        'Out for Delivery': ['Delivered'],
        Delivered: [],        // no further transitions allowed
        Cancelled: []         // no further transitions allowed
    };
    
    try {
        // Fetch the order's current status and the consumer's email; ensuring the order belongs to a product by this farmer
        const [orderRows] = await db.promise().query(
            `SELECT orders.id, orders.status AS currentStatus, consumers.email 
             FROM orders
             JOIN products ON orders.product_id = products.id
             JOIN consumers ON orders.consumer_id = consumers.id
             WHERE orders.id = ? AND products.farmer_id = ?`,
            [orderId, farmerId]
        );
        
        if (orderRows.length === 0) {
            return res.status(403).json({ error: "Unauthorized to update this order or order not found" });
        }
        
        const { currentStatus, email: consumerEmail } = orderRows[0];
        
        // Validate the transition
        if (!allowedTransitions[currentStatus].includes(newStatus)) {
            console.error(`Invalid status transition from "${currentStatus}" to "${newStatus}". Allowed transitions: ${allowedTransitions[currentStatus].join(', ') || 'None'}.`);
            return res.status(400).json({
                error: `Invalid status transition from "${currentStatus}" to "${newStatus}". Allowed transitions: ${allowedTransitions[currentStatus].join(', ') || 'None'}.`
            });
        }
        
        // Update the order status in the database
        const updateSql = `
            UPDATE orders
            SET status = ?
            WHERE id = ?
        `;
        const [result] = await db.promise().query(updateSql, [newStatus, orderId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Order not found" });
        }
        
        // Prepare dynamic email messages based on the new status
        let subject = 'Order Status Update';
        let htmlMessage = '';
        let textMessage = '';
        
        if (newStatus === 'Confirmed') {
            htmlMessage = `<p>Your order <strong>#${orderId}</strong> has been confirmed. We are preparing your package and it will be out for delivery shortly. Stay tuned for more updates!</p>`;
            textMessage = `Your order #${orderId} has been confirmed. We are preparing your package and it will be out for delivery shortly. Stay tuned for more updates!`;
        } else if (newStatus === 'Out for Delivery') {
            // Fetch the farmer's address (farm_location) to include in the email for COD orders
            const [farmerRows] = await db.promise().query(
                "SELECT farm_location FROM farmers WHERE id = ?",
                [farmerId]
            );
            const farmerAddress = farmerRows.length > 0 ? farmerRows[0].farm_location : 'your designated pickup location';
            htmlMessage = `<p>Great news! Your order <strong>#${orderId}</strong> is out for delivery. Since this is COD, please be ready to pick it up at the following address: <strong>${farmerAddress}</strong>.</p>`;
            textMessage = `Great news! Your order #${orderId} is out for delivery. Since this is COD, please be ready to pick it up at: ${farmerAddress}.`;
        } else if (newStatus === 'Cancelled') {
            htmlMessage = `<p>We regret to inform you that your order <strong>#${orderId}</strong> has been cancelled. If you have any questions, please contact our support team for further assistance.</p>`;
            textMessage = `We regret to inform you that your order #${orderId} has been cancelled. If you have any questions, please contact our support team for further assistance.`;
        } else if (newStatus === 'Delivered') {
            htmlMessage = `<p>Your order <strong>#${orderId}</strong> has been delivered successfully. Thank you for shopping with us, and we hope you enjoy your purchase!</p>`;
            textMessage = `Your order #${orderId} has been delivered successfully. Thank you for shopping with us, and we hope you enjoy your purchase!`;
        } else if (newStatus === 'Pending') {
            // Although transitioning back to Pending shouldn't be allowed per our mapping, this branch is added for completeness.
            htmlMessage = `<p>Your order <strong>#${orderId}</strong> is currently pending. We are processing your order and will update you once the status changes.</p>`;
            textMessage = `Your order #${orderId} is currently pending. We are processing your order and will update you once the status changes.`;
        }
        
        // Attempt to send the notification email
        try {
            await sendEmail({
                to: consumerEmail,
                subject,
                html: htmlMessage,
                text: textMessage
            });
        } catch (emailError) {
            console.error('Failed to send notification email:', emailError);
            // Continue processing without failing the whole request if email sending fails
        }
        
        console.error('sent');
        res.status(200).json({ message: "Order status updated and notification sent successfully" });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ error: "Failed to update order status" });
    }
};
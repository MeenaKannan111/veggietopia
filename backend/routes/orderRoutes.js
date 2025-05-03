import express from 'express';
import {
    placeOrder,
    getOrderStatus,
    getOrdersByConsumerId
} from '../controllers/orderController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Place an order
router.post('/', verifyToken, placeOrder);

// Get order status by order ID
router.get('/:orderId/status', verifyToken, getOrderStatus);

// Get all orders for a specific consumer by consumer ID
router.get('/consumer/:consumerId', verifyToken, getOrdersByConsumerId);

// Get all orders for authenticated user
router.get('/', verifyToken, (req, res) => {
    req.params.consumerId = req.user.id;
    getOrdersByConsumerId(req, res);
});

export default router;

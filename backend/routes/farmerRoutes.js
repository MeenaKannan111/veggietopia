// backend/routes/farmerRoutes.js
import express from 'express';
const router = express.Router();
import * as farmerController from '../controllers/farmerController.js';
import { verifyToken } from '../middleware/auth.js';
import * as orderController from '../controllers/orderController.js';

router.post('/register', farmerController.register);
router.post('/login', farmerController.login);
router.get('/dashboard/:id', verifyToken, farmerController.getDashboard);
router.get('/products/:id', verifyToken, farmerController.getProductsByFarmer);
router.post('/products', farmerController.addProduct);
router.delete('/remove-product/:id', farmerController.removeProduct);

// Added route to fetch orders by farmer ID with authentication
router.get('/:farmerId/orders', verifyToken, orderController.getOrdersByFarmerId);

// New route to update order status by farmer with authentication
router.put('/orders/:orderId/status', verifyToken, orderController.updateOrderStatusByFarmer);

export default router;

// backend/routes/farmerRoutes.js
import express from 'express';
const router = express.Router();
import * as farmerController from '../controllers/farmerController.js';

router.post('/register', farmerController.register);
router.post('/login', farmerController.login);
router.get('/dashboard/:id', farmerController.getDashboard);
router.get('/products/:id', farmerController.getProductsByFarmer);
router.post('/products', farmerController.addProduct);
router.delete('/remove-product/:id', farmerController.removeProduct);
export default router;
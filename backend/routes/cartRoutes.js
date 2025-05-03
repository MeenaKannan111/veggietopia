import express from 'express';
import { getCart, addToCart, removeFromCart } from '../controllers/cartController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', verifyToken, getCart);

router.post('/', verifyToken, addToCart);

router.delete('/',verifyToken, removeFromCart);

export default router;
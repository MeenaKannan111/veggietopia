<<<<<<< HEAD
import express from 'express';
=======
// backend/routes/consumerRoutes.js
//const express = require('express');
// import express from 'express';

// const router = express.Router();
// import * as consumerController from '../controllers/consumerController.js';

// router.post('/register', consumerController.register);
// router.post('/login', consumerController.login);
// router.get('/dashboard/:id', consumerController.getDashboard);
// router.post('/order', consumerController.placeOrder);

// export default router;

import express from "express";
>>>>>>> 0c2c563e9c323979057143631318859bc55e43c5
import {
    getProducts,
    getRecommendations,
    placeOrder,
    getOrderStatus,
    register,
    login,
    getDashboard,
<<<<<<< HEAD
    getProductById,
    getOrdersByConsumerId
} from '../controllers/consumerController.js';
import { verifyToken } from '../middleware/auth.js';
import { getCart, addToCart, removeFromCart } from '../controllers/cartController.js';
//import authenticate from '../middleware/authenticate.js';
=======
    getProductById, 
} from "../controllers/consumerController.js";
import { verifyToken } from "../middleware/auth.js";
>>>>>>> 0c2c563e9c323979057143631318859bc55e43c5

const router = express.Router();

// Public routes
<<<<<<< HEAD
router.post('/register', register); // Consumer registration
router.post('/login', login); // Consumer login

// Protected routes
router.get('/dashboard/:id', verifyToken, getDashboard); // Consumer dashboard
router.get('/products', verifyToken, getProducts); // Get all products with filters
router.get('/recommendations/:consumerId', verifyToken, getRecommendations); // Get personalized recommendations
router.post('/orders', verifyToken, (req, res, next) => {
    console.log('POST /orders route hit with body:', req.body);
    next();
}, placeOrder); // Place an order
router.get('/orders/:orderId/status', verifyToken, getOrderStatus); // Get order status
router.get('/products/:productId', verifyToken, getProductById); // Get product details by ID
router.get('/orders/:consumerId', verifyToken, getOrdersByConsumerId); // Get all orders for a consumer

router.get('/cart', verifyToken, getCart);      // Fetch cart
router.post('/cart', verifyToken, addToCart);     // Add to cart
router.delete('/cart', verifyToken, removeFromCart);  // Remove from cart

// New route to get orders for authenticated user
router.get('/orders', verifyToken, (req, res) => {
    req.params.consumerId = req.user.id;
    getOrdersByConsumerId(req, res);
});

export default router;
=======
router.post("/register", register); // Consumer registration
router.post("/login", login); // Consumer login

// Protected routes
router.get("/dashboard/:id", verifyToken, getDashboard); // Consumer dashboard
router.get("/products", verifyToken, getProducts); // Get all products with filters
router.get("/recommendations/:consumerId", verifyToken, getRecommendations); // Get personalized recommendations
router.post("/orders", verifyToken, placeOrder); // Place an order
router.get("/orders/:orderId/status", verifyToken, getOrderStatus); // Get order status
router.get("/products/:productId", verifyToken, getProductById); // Get product details by ID


export default router;
>>>>>>> 0c2c563e9c323979057143631318859bc55e43c5

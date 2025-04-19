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
import {
    getProducts,
    getRecommendations,
    placeOrder,
    getOrderStatus,
    register,
    login,
    getDashboard,
    getProductById, 
} from "../controllers/consumerController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Public routes
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
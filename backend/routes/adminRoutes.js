// backend/routes/adminRoutes.js
//const express = require('express');
import express from 'express';
const router = express.Router();
import * as adminController from '../controllers/adminController.js';

router.get('/dashboard', adminController.getDashboard);
router.delete('/remove-farmer/:id', adminController.removeFarmer);
router.delete('/remove-consumer/:id', adminController.removeConsumer);

router.post('/login', adminController.login);

// Additional routes can be added here if needed for managing orders, products, etc.

export default router;

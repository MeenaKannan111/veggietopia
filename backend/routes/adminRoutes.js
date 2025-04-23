// backend/routes/adminRoutes.js
//const express = require('express');
import express from 'express';
const router = express.Router();
import * as adminController from '../controllers/adminController.js';

router.get('/dashboard', adminController.getDashboard);
router.delete('/remove-farmer/:id', adminController.removeFarmer);
router.delete('/remove-consumer/:id', adminController.removeConsumer);

export default router;
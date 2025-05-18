const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const authMiddleware = require('../middleware/Authmiddleware');

// Create a new order
router.post('/', authMiddleware.authUser, orderController.createOrder);

// Get user's orders
router.get('/', authMiddleware.authUser, orderController.getOrders);

// Get latest order of the user
router.get('/latest', authMiddleware.authUser, orderController.getLatestOrder);

module.exports = router;

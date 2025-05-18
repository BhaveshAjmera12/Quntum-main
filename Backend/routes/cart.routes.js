const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const authMiddleware = require('../middleware/Authmiddleware');

// Add product to cart
router.post('/', authMiddleware.authUser, cartController.addToCart);

// Get user's cart
router.get('/', authMiddleware.authUser, cartController.getCart);

// Update product quantity in cart
router.put('/update-quantity', authMiddleware.authUser, cartController.updateCartQuantity);

// Remove product from cart
router.delete('/remove/:id', authMiddleware.authUser, cartController.removeFromCart);

// Clear entire cart
router.delete('/clear', authMiddleware.authUser, cartController.clearCart);

module.exports = router;

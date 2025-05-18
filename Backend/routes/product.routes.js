const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// Create a new product
router.post('/', productController.createProduct);

// Get all products
router.get('/', productController.getAllProducts);

router.get('/:id', productController.getProductById);


module.exports = router;
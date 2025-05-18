const Product = require('../models/product.model');

// Create a new product
const createProduct = async (req, res) => {
  try {
    const {
        name,
        brand,
        price,
        description,
        imageUrl,
        processor,
        ram,
        storage,
        displaySize,
        graphicsCard,
        operatingSystem,
        stock,
        category,
      } = req.body;
    const product = await Product.create({
        name,
        brand,
        price,
        description,
        imageUrl,
        processor,
        ram,
        storage,
        displaySize,
        graphicsCard,
        operatingSystem,
        stock,
        category,
    });

    res.status(201).json({ success: true, product });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createProduct, getAllProducts, getProductById };

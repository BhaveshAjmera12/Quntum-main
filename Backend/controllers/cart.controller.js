const Cart = require('../models/cart.model');

// Add product to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;  // ✅ Default quantity 1
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }

    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;  // ✅ Proper update
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user's cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      'products.product'
    );

    if (!cart) {
      return res.status(200).json({ success: true, cart: { products: [] } }); // ✅ Return empty cart instead of null
    }

    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update cart quantity
const updateCartQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex > -1) {
      if (quantity <= 0) {
        cart.products.splice(productIndex, 1); // Remove item if quantity is 0
      } else {
        cart.products[productIndex].quantity = quantity;
      }
      await cart.save();
      return res.status(200).json({ success: true, cart });
    }

    res.status(404).json({ success: false, message: "Product not found in cart" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove product from cart
// In cart.controller.js
const removeFromCart = async (req, res) => {
  try {
    const { id: productId } = req.params; 
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    cart.products = cart.products.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Clear entire cart
const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;
    await Cart.findOneAndDelete({ user: userId });

    res.status(200).json({ success: true, message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addToCart, getCart,  updateCartQuantity, removeFromCart, clearCart  };
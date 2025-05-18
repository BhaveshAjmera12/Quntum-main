const Order = require('../models/order.model');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { products, totalPrice, shippingDetails, paymentMethod } = req.body;
    const userId = req.user._id;

    // Create the order
    const order = await Order.create({
      user: userId,
      shippingDetails,
      products,
      totalPrice,
      paymentMethod,
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user's orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('products.product', 'name price processor ram storage imageUrl') // Populate product details
      .populate('user', 'name email'); // Optionally populate user details

    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get latest order of the user
const getLatestOrder = async (req, res) => {
  try {
    console.log("Fetching latest order for user:", req.user._id);

    const latestOrder = await Order.findOne({ user: req.user._id })
      .sort({ createdAt: -1 }) // fetching Latest order 
      .populate({
        path: "user",
        select: "name email", 
      })
      .populate({
        path: "products.product",
        select: "name brand price imageUrl", // fetching Product details 
      });

    if (!latestOrder) {
      return res.status(404).json({ success: false, message: "No orders found" });
    }

    console.log("Latest order found:", latestOrder);
    res.status(200).json({ success: true, order: latestOrder });
  } catch (error) {
    console.error("Error fetching latest order:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = { createOrder, getOrders, getLatestOrder };

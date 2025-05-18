const mongoose = require("mongoose")

const laptopSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  brand:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  imageUrl: {
      type: String,
      required:true,
    },

   // Specifications
   processor: { type: String, required: true }, // Example: "Intel Core i7-1165G7"
   ram: { type: String, required: true }, // Example: "16GB DDR4"
   storage: { type: String, required: true }, // Example: "512GB SSD"
   displaySize: { type: String, required: true }, // Example: "13.4 inches"
   graphicsCard: { type: String, required: true }, // Example: "Intel Iris Xe Graphics"
   operatingSystem: { type: String, required: true }, // Example: "Windows 11 Home"

    // Inventory and Availability
    stock: {
        type: Number,
        required: true,
        default: 0,
      }, // Example: 50 units in stock

  category: { type: String, required: true }, // Example: gaming laptop
  createdAt: { type: Date, default: Date.now },
});

const laptop = mongoose.model('Laptop', laptopSchema);
module.exports = laptop;
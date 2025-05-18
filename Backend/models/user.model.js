const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require("jsonwebtoken")

// Define the User Schema
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required:true,
      minlength:[3,'name must be at least 3 characters long'],
      trim: true, // Removes extra spaces
    },
    email: {
      type: String,
      required:true, // Email is required
      minlength:[5,'email must be at least 5 characters long'], 
      unique: true, // Ensures email is unique
      trim: true,
    
    },
    password: {
      type: String,
      required: true, // Password is required
      minlength: [6, 'Password must be at least 6 characters long'], // Minimum length
      select: false, // Prevents password from being returned in queries
    },
    role: {
      type: String,
      enum: ['admin', 'customer'], // Allowed roles
      default: 'customer', // Default role for new users
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically sets the creation date
    },
   
  }
 
);

userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET)
  return token;
}

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password,this.password)
}

userSchema.statics.hashPassword = async function (password){
  return await bcrypt.hash(password,10)
}



// Export the User model
module.exports = mongoose.model('User', userSchema);
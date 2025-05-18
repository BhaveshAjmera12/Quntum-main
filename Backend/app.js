const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const connectToDb = require('./db/db');
connectToDb();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/user.routes');
const productRoutes = require("./routes/product.routes")
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');


app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/images", express.static(__dirname + "/Public/images"));
   //public folder access to images   
app.use('/user', userRoutes);
app.use('/products',productRoutes)
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);


// Default route
app.get('/', (req, res) => {
    res.send('Welcome to Quantum Backend!');
  });
  // use localhost4000 for backend not use localhost3000





module.exports = app;
quantum-backend/
├── db/
│   ├── db.js                # Database connection setup 
│
├── controllers/
│   ├── userController.js    # Handles user profile updates, fetching user details, etc.
│   ├── productController.js # Handles product-related operations (CRUD)
│   ├── orderController.js   # Handles order creation, updates, and tracking
│   ├── cartController.js    # Handles cart operations (add, remove, update)
│
├── middleware/
│   ├── authMiddleware.js    # Authentication and authorization middleware
│
├── models/
│   ├── User.js              # User schema (name, email, password, role, etc.)
│   ├── Product.js           # Product schema (name, price, description, images, etc.)
│   ├── Order.js             # Order schema (user, products, total price, status, etc.)
│   ├── Cart.js              # Cart schema (user, products, quantity, etc.)
│
├── routes/
│   ├── userRoutes.js        # Routes for user-related operations (replace `userMoutes` here)
│   ├── productRoutes.js     # Routes for product-related operations
│   ├── orderRoutes.js       # Routes for order-related operations
│   ├── cartRoutes.js        # Routes for cart-related operations
│
│
├── .env                     # Environment variables (database URL, JWT secret, etc.)
├── .gitignore               # Specifies files/folders to ignore in Git
├── package.json             # Lists dependencies and scripts
├── app.js                   # Entry point for the backend server (updated as per your file)
└── README.md                # Project documentation
└── server.js                # create server

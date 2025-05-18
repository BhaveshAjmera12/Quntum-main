const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/Authmiddleware');



router.post('/register', userController.registeruser);
router.post('/login', userController.loginuser);

router.get('/profile',authMiddleware.authUser, userController.getuser);



module.exports = router;


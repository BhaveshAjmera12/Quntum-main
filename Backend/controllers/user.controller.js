const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//register a new user
module.exports.registeruser = async (req, res, next) => {
    try{
        const {name, email, password} = req.body;

        
        const userExists = await userModel.findOne({email});
        if(userExists){
            return res.status(400).json({message: 'User already exists'});
        }
        
        const hashedPassword = await userModel.hashPassword(password); 
        // create new user
        const user = await userModel.create({
            name,
            email, 
            password: hashedPassword,
        });

        const token = user.generateAuthToken();
        res.status(201).json({ token,user })
        return next();
      
    } catch (error){
        res.status(500).json({message: "something went wrong"});
    }
};

module.exports.loginuser = async (req, res, next) => {
    try{
        const {email, password} = req.body;

        const user = await userModel.findOne({email}).select('+password');
        if(!user){
            res.status(401).json({
                message: 'email or password is incorrect'
            })
        }

        // compare password
        const isMatch  = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(400).json({
                message: 'email or password is incorrect'
            })
        }

        const token = user.generateAuthToken();

        res.cookie('token',token,{
            // httpOnly:true,
            // secure:process.env.NODE_ENV === 'production',
            // maxAge: 3600000 
          });

        res.status(200).json({
            message: 'User logged in successfully',
            user,
            token});
            return next();

    } catch (error){
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports.getuser = async (req, res, next) => {
   res.status(200).json({
       message: 'User profile fetched successfully',
       user: req.user
   })

}



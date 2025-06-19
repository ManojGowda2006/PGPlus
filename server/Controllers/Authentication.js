const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const register = async (req, res) => {
    try{
       const {fullName, email, password, phone, roomNumber, role, pgCode} = req.body;
       if(!fullName || !email || !password || !phone || !roomNumber || !pgCode){
        return res.status(400).json({message : "All fields are required!"})
       }

       if(pgCode !== process.env.PGCode){
        return res.status(404).json({message : "Invalid PGCode!"})
       }

       const hashedPass =await bcrypt.hash(password, 10);

       const user = await User.create({
        fullName,
        email,
        phone,
        password : hashedPass,
        role,
        roomNumber
       })

      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.jwt_secret,
        { expiresIn: "1h" }
        );

       res.cookie('token', token, {
        httpOnly : true,
        secure : process.env.NODE_ENV === 'production' ? true : false,
        sameSite : process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
        maxAge : 60*60*1000
       })

       res.status(200).json({message : "Registered successfully"})
    }catch(err){
        res.status(500).json({message : "Internal Server Error"})
    }
}

const logIN = async (req, res) => {
    try{
       const {email, password} = req.body;
       if( !email || !password ){
        return res.status(400).json({message : "All fields are required!"})
       }


       const user = await User.findOne({email})

       if(!user){
        return res.status(404).json({message : "User not found"})
       }

       const passCheck = await bcrypt.compare(password, user.password)

       if(!passCheck){
        return res.status(400).json({message : "Incorrect password"})
       }

      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.jwt_secret,
        { expiresIn: "1h" }
        );

       res.cookie('token', token, {
        httpOnly : true,
        secure : process.env.NODE_ENV === 'production' ? true : false,
        sameSite : process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
        maxAge : 60*60*1000
       })

       res.status(200).json({message : "LogIn successfully"})
    }catch(err){
        res.status(500).json({message : "Internal Server Error"})
    }
}

module.exports = {register, logIN};
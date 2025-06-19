const jwt = require('jsonwebtoken')
require('dotenv').config()

const userAuth = async (req, res, next) => {
    try{
       const {token} = req.cookies;
       if(!token){
        return res.status(400).json({message: "token Expired"})
       }

       const deCoded = jwt.verify(token, process.env.jwt_secret)
       req.userId = deCoded.userId
       req.role = deCoded.role;

       next();
    }catch(err){
        res.status(401).json({message : "Unauthorized access"})
    }
}

module.exports = userAuth;
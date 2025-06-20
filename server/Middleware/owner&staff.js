const jwt = require('jsonwebtoken')
require('dotenv').config()

const userAuth = async (req, res, next) => {
    try{
       const {token} = req.cookies;
       if(!token){
        return res.status(401).json({message: "token Expired"})
       }

       const deCoded = jwt.verify(token, process.env.jwt_secret)
       if(deCoded.role === "owner" || deCoded.role === "staff"){
        next();
       }else{
        res.status(401).json({message : "Unauthorized access"})
       }

    }catch(err){
        res.status(401).json({message : "Unauthorized access"})
    }
}

module.exports = userAuth;
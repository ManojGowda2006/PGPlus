// roleCheck.js
const roleCheck = (allowedRoles) => {
  return (req, res, next) => {
    const {token} = req.cookies;
    if(!token){
    return res.status(401).json({message: "token Expired"})
    }

    const deCoded = jwt.verify(token, process.env.jwt_secret)
    
    if (!allowedRoles.includes(deCoded.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

module.exports = roleCheck;

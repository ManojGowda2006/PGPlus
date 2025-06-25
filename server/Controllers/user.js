const User = require('../models/User')

const sendTenant = async(req, res) => {
    try{
      const tenants = await User.find({role : 'tenant'})
      res.status(200).json({tenants : tenants});
    }catch(err){
        res.status(500).json({message : "Internal server error"})
    }
}

module.exports = sendTenant
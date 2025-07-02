const User = require('../models/User')
const bcrypt = require('bcryptjs')

const sendTenant = async(req, res) => {
    try{
      const tenants = await User.find({role : 'tenant'}).populate('roomNumber','doorNumber')
      res.status(200).json({tenants : tenants});
    }catch(err){
        res.status(500).json({message : "Internal server error",err:err})
    }
}

const sendUser = async(req, res) => {
  try{
     const user = await User.findById(req.userId).populate({
        path: 'roomNumber',
        select: 'doorNumber type tenant', 
        populate: {
          path: 'tenants',
          select: 'fullName', 
        }
      })
     res.status(200).json(user)
  }catch(err){
    res.status(500).json({message : "Internal server error"})
  }
}

const updateUser = async (req, res) => {
  try {
    const { phone, email, password} = req.body;
    const userId = req.userId
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (phone) user.phone = phone;
    if (email) user.email = email;

    if (password) {
      // Optional: Prevent updating to the same password
      const isSame = await bcrypt.compare(password, user.password);
      if (isSame) {
        return res.status(400).json({ message: "New password cannot be same as current password" });
      }

      const hashedPass = await bcrypt.hash(password, 10);
      user.password = hashedPass;
    }

    await user.save();
    res.status(200).json({ message: "Profile updated successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {sendTenant, sendUser, updateUser}
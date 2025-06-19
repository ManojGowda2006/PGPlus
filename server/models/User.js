const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },

  role: {
    type: String,
    enum: ["tenant", "owner", "staff"],
    default: "tenant"
  },

  roomNumber: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },

  // OTP-based password reset
  otp: { type: String },
  otpExpires: { type: Date },


  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);

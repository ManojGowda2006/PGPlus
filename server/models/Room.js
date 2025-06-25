const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  doorNumber: { type: String, required: true, unique: true },
  type: {type : String},
  status : {type: String, enum : ["occupied", "vacant"]},
  tenants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("Room", RoomSchema);

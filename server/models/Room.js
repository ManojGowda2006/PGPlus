const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  doorNumber: { type: String, required: true, unique: true },
  tenants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("Room", RoomSchema);

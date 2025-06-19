const mongoose = require("mongoose");

const FacilitySchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "WiFi - Ground Floor"
  type: {
    type: String,
    enum: ["Camera", "WiFi", "Filter", "Refrigerator", "Gym", "PlayArea", "WashingMachine"],
    required: true
  },

  status: {
    type: String,
    enum: ["Working", "Needs Repair"],
    default: "Working"
  },

  lastUpdated: { type: Date, default: Date.now },

  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Facility", FacilitySchema);

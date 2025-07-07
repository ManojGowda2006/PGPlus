const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
  date: { type: String, required: true }, // YYYY-MM-DD
  mealTime: {
    type: String,
    enum: ["Breakfast", "Lunch", "Dinner"],
    required: true,
  },
  items: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Menu", MenuSchema);

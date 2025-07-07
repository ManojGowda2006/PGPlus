const mongoose = require('mongoose')

const FoodPollSchema = new mongoose.Schema({
  menu: { type: mongoose.Schema.Types.ObjectId, ref: "Menu" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },  
  rating: {
    type: String,
    enum: ["Good", "Average", "Bad"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now }
});
FoodPollSchema.index({ user: 1, menu: 1 }, { unique: true });

module.exports = mongoose.model("FoodPoll", FoodPollSchema);

const mongoose = require("mongoose");

const FoodPollSchema = new mongoose.Schema({
  mealTime: {
    type: String,
    enum: ["Breakfast", "Lunch", "Dinner"],
    required: true
  },

  date: {
    type: String, // Format: YYYY-MM-DD
    required: true
  },

  votes: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, min: 1, max: 5 }
    }
  ]
});

module.exports = mongoose.model("FoodPoll", FoodPollSchema);

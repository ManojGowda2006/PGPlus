const FoodPoll = require('../models/FoodPoll');
const Menu = require('../models/Menu');

// POST /poll/:menuId - Cast or update vote
const vote = async (req, res) => {
  try {
    const { menuId } = req.body;
    const { rating } = req.body;
    const userId = req.userId;

    if (!["Good", "Average", "Bad"].includes(rating)) {
      return res.status(400).json({ message: "Invalid rating" });
    }

    const menu = await Menu.findById(menuId);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    const existingVote = await FoodPoll.findOne({ user: userId, menu: menuId });

    if (existingVote) {
      existingVote.rating = rating;
      await existingVote.save();
      return res.json({ message: "Vote updated", poll: existingVote });
    }

    const newVote = await FoodPoll.create({
      menu: menuId,
      user: userId,
      rating,
    });

    res.status(201).json({ message: "Vote submitted", poll: newVote });
  } catch (error) {
    console.error("Vote error:", error);
    res.status(500).json({ message: "Error submitting vote" });
  }
};

// GET /poll/:menuId - Get poll results for a menu
const getPollResults = async (req, res) => {
  try {
    const { id } = req.params;

    const menu = await Menu.findById(id);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    const polls = await FoodPoll.find({ menu: id });

    const results = { Good: 0, Average: 0, Bad: 0 };
    polls.forEach((vote) => {
      results[vote.rating]++;
    });

    res.json({
      menu: id,
      date: menu.date,
      totalVotes: polls.length,
      results,
    });
  } catch (error) {
    console.error("Poll results error:", error);
    res.status(500).json({ message: "Error retrieving poll results" });
  }
};

module.exports = {
  vote,
  getPollResults,
};

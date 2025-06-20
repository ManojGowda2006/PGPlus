const FoodPoll = require('../models/FoodPoll');

const vote = async (req, res) => {
  try {
    const { mealTime, date, rating } = req.body;

    let poll = await FoodPoll.findOne({ mealTime, date });
    if (!poll) {
      poll = await FoodPoll.create({ mealTime, date, votes: [] });
    }

    const existingVote = poll.votes.find(v => v.userId.toString() === req.userId);
    if (existingVote) {
      existingVote.rating = rating;
    } else {
      poll.votes.push({ userId: req.userId, rating });
    }

    await poll.save();
    res.json({ message: 'Vote submitted', poll });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting vote' });
  }
};

const getPollResults = async (req, res) => {
  try {
    const polls = await FoodPoll.find();
    res.json(polls);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving polls' });
  }
};

module.exports = {
  vote,
  getPollResults,
};

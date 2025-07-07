const Menu = require('../models/Menu');

// POST /menu - Create or update today's menu (Owner only)

const createOrUpdateMenu = async (req, res) => {
  try {
    const { date, mealTime, items } = req.body;
    const ownerId = req.userId;

    if (!date || !items || !mealTime) {
      return res.status(400).json({ message: 'Date, meal time, and items are required' });
    }

    const existingMenu = await Menu.findOne({ date, mealTime });

    if (existingMenu) {
      existingMenu.items = items;
      existingMenu.createdBy = ownerId;
      await existingMenu.save();
      return res.json({ message: 'Menu updated successfully', menu: existingMenu });
    }

    const newMenu = await Menu.create({
      date,
      mealTime,
      items,
      createdBy: ownerId,
    });

    res.status(201).json({ message: 'Menu created successfully', menu: newMenu });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating/updating menu' });
  }
};


// GET /menu - Get today's menu
const getTodaysMenu = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0]; // 'YYYY-MM-DD'
    const menu = await Menu.findOne({ date: today });

    if (!menu) {
      return res.status(404).json({ message: "Today's menu not found" });
    }

    res.json(menu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching today’s menu' });
  }
};

// GET /menu/:date - Get menu by date 
const getMenuByDateAndMeal = async (req, res) => {
  try {
    const { date, mealTime } = req.query;

    const menu = await Menu.findOne({ date, mealTime });

    if (!menu) {
      return res.status(404).json({ message: "Menu not found for given date and mealTime" });
    }

    res.json(menu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching menu" });
  }
};

module.exports = {
  createOrUpdateMenu,
  getTodaysMenu,
  getMenuByDateAndMeal,
};

const express = require('express');
const router = express.Router();
const {
  createOrUpdateMenu,
  getTodaysMenu,
  getMenuByDateAndMeal,
} = require('../Controllers/Menu');
const userAuth = require('../Middleware/middleWare')
const roleCheck = require('../Middleware/roleCheck')

// Owner creates or updates today's menu
router.post('/', userAuth, roleCheck(['owner']), createOrUpdateMenu);

// Anyone gets today's menu
router.get('/', userAuth, getTodaysMenu);

// Optional: Get menu for a specific date
router.get('/:date', userAuth, getMenuByDateAndMeal);

module.exports = router;

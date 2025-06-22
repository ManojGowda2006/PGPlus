const express = require('express');
const { vote, getPollResults } = require('../Controllers/foodPollController');
const userAuth = require('../Middleware/middleWare');

const router = express.Router();

router.post('/vote', userAuth, vote);
router.get('/', userAuth, getPollResults);

module.exports = router;

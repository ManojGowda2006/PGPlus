const express = require('express');
const { register, logIN } = require('../Controllers/Authentication');
const userAuth = require('../Middleware/middleWare');

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', logIN);

// Logout (optional — clears token cookie)
router.post('/logout', userAuth, (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

// Example protected route (optional — for testing token)
router.get('/me', userAuth, (req, res) => {
  res.json({ message: 'Token valid', userId: req.userId, role: req.role });
});

module.exports = router;

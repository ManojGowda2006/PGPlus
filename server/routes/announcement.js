const express = require('express');
const { createAnnouncement, getAnnouncements } = require('../Controllers/AnnouncementController');
const userAuth = require('../Middleware/middleWare');
const roleCheck = require('../Middleware/roleCheck');

const router = express.Router();

router.post('/', userAuth, roleCheck(['owner']), createAnnouncement);
router.get('/', userAuth, getAnnouncements);

module.exports = router;

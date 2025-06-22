const express = require('express');
const { createRoom, updateRoom, getAllRooms, getMyRoom } = require('../Controllers/roomController');
const userAuth = require('../Middleware/middleWare');
const roleCheck = require('../Middleware/roleCheck');

const router = express.Router();

router.post('/', userAuth, roleCheck(['owner']), createRoom);
router.patch('/:roomId', userAuth, roleCheck(['owner']), updateRoom);
router.get('/', userAuth, roleCheck(['owner']), getAllRooms);
router.get('/me', userAuth, roleCheck(['tenant']), getMyRoom);

module.exports = router;

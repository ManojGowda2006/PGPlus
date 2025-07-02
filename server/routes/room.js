const express = require('express');
const { createRoom, updateRoom, getAllRooms, getMyRoom, deleteRoom } = require('../Controllers/roomController');
const userAuth = require('../Middleware/middleWare');
const roleCheck = require('../Middleware/roleCheck');
const {sendTenant} = require('../Controllers/user');

const router = express.Router();

router.post('/', userAuth, roleCheck(['owner']), createRoom);
router.patch('/:roomId', userAuth, roleCheck(['owner']), updateRoom);
router.get('/', userAuth, roleCheck(['owner']), getAllRooms);
router.get('/me', userAuth, roleCheck(['tenant']), getMyRoom);
router.delete('/delete/:id',userAuth, roleCheck(['owner']), deleteRoom)
router.get('/tenants',userAuth, roleCheck(['owner']),sendTenant)

module.exports = router;

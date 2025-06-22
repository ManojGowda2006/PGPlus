const express = require('express');
const { createFacility, updateFacility, getFacilities } = require('../Controllers/facilityController');
const userAuth = require('../Middleware/middleWare');
const roleCheck = require('../Middleware/roleCheck');

const router = express.Router();

router.post('/', userAuth, roleCheck(['owner']), createFacility);
router.patch('/:id', userAuth, roleCheck(['owner', 'staff']), updateFacility);
router.get('/', userAuth, getFacilities);

module.exports = router;

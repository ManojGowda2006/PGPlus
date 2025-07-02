const express = require('express')
const router = express.Router()
const userAuth = require('../Middleware/middleWare')
const roleCheck = require('../Middleware/roleCheck')
const {createComplaint, getMyComplaints,getAllComplaints,} = require('../Controllers/complaintControllers')

router.post('/',userAuth, createComplaint)
router.get('/:id',userAuth, getMyComplaints)
router.get('/',userAuth, roleCheck(['owner']), getAllComplaints)

module.exports = router;
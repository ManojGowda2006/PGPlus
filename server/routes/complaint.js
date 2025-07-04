const express = require('express')
const router = express.Router()
const userAuth = require('../Middleware/middleWare')
const roleCheck = require('../Middleware/roleCheck')
const {createComplaint, getMyComplaints,getAllComplaints,updateComplaint} = require('../Controllers/complaintControllers')

router.post('/',userAuth, createComplaint)
router.get('/:id',userAuth, getMyComplaints)
router.get('/',userAuth, roleCheck(['owner']), getAllComplaints)
router.put('/:id', userAuth, roleCheck(['owner']), updateComplaint)

module.exports = router;
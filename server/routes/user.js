const {sendUser, updateUser} = require('../Controllers/user')
const express = require('express')
const route = express.Router()
const userAuth = require('../Middleware/middleWare')


route.get('/tenant',userAuth, sendUser)
route.post('/update',userAuth, updateUser)

module.exports = route
const express = require('express')
const checkUserExist = require('../middlewares/checkUser')
const route = express.Router()

route.post('/check-user',checkUserExist)

module.exports = route
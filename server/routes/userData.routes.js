const express = require('express')
const getUserData = require('../controller/userData')
const verifyToken = require('../middlewares/verifyToken')
const route = express.Router()

route.get('/user-data', verifyToken, getUserData)

module.exports = route
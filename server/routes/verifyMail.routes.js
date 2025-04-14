const express = require('express')
const route = express.Router()
const verifyMail = require('../middlewares/verifyMail')

route.post('/mail-verification', verifyMail)

module.exports = route
const express = require('express')
const { handleSignUp } = require('../controller/signup.controller')
const route = express.Router()

route.post('/signup', handleSignUp)

module.exports = route
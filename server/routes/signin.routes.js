const express = require('express')
const { handleSignIn } = require('../controller/signin.controller')
const route = express.Router()

route.post('/signin', handleSignIn)

module.exports = route
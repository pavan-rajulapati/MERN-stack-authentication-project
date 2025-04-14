const { handleGoogleSignin } = require('../controller/googleAuth.controller')
const express = require('express')
const route = express.Router()

route.post('/google-signin', handleGoogleSignin)

module.exports = route
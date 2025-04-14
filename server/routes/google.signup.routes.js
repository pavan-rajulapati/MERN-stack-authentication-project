const {handleGoogleSignup} = require('../controller/googleAuth.controller')
const express = require('express')
const route = express.Router()

route.post('/google-signup', handleGoogleSignup);

module.exports = route
const jwt = require('jsonwebtoken');
const { tokenExpirationTime } = require('./expiresTime');
require('dotenv').config();

const generateToken = (user) => {
    return jwt.sign(
        { _id : user._id }, 
        process.env.SECRET_KEY,
        { expiresIn: tokenExpirationTime }
    );
};

module.exports =  generateToken ;

const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password: String,
    googleId: String,
    otp : Number,
    otpExpiresTime : Number,
    isVerified : {
        type : Boolean,
        default : false
    },
    provider : String
})

module.exports = mongoose.model('User', userSchema);

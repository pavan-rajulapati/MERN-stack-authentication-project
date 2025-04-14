const express = require('express')
const cors = require('cors')
const { default: mongoose } = require('mongoose')
const  otp  = require('./utils/generateOTP')
require('dotenv').config()
const cookie = require('cookie-parser')

const app = express()
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(cookie())
app.use(express.json())
const port = process.env.PORT || 8080

// <----------------------------------- Database connection ---------------------------------->

mongoose.connect(process.env.MONGO_URI).then(
    console.log('database connected 🪣')
).catch((error) => {
    console.log('database connection error', error.message)
})

// <---------------------------- main Route ---------------------------------------->

app.get('/', (req, res) => {
    res.send('Backend working Fine')
})

// <------------------------------------ Routes ------------------------------------------>

app.use(require('./routes/signup.routes'))
app.use(require('./routes/google.signup.routes'))
app.use(require('./routes/signin.routes'))
app.use(require('./routes/google.signin.routes'))
app.use(require('./routes/verifyMail.routes'))
app.use(require('./routes/checkUser.routes'))
app.use(require('./routes/userData.routes'))

console.log('this is your OTP', otp)

app.listen(port, () => {
    console.log(`port running at ${port} 🔥`)
})
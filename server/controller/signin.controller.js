const bcrypt = require('bcrypt');
const User = require('../model/user.model'); 
const jwt = require('../utils/jwtToken');
const sendMail = require('../middlewares/sendMail');
const otp = require('../utils/generateOTP');
const setCookie = require('../utils/setCookie');


const handleSignIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt(user._id)
        setCookie(res, token)


        res.status(200).json({ token, message: 'Sign-in successful' });
    } catch (error) {
        console.error('Error during sign-in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const handleGoogleSignin = async (req, res) => {
    const { email, googleId } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isIdValid = await bcrypt.compare(googleId, user.googleId);
        if (!isIdValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt(user._id)
        setCookie(res, token)

        res.status(200).json({ token, message: 'Sign-in successful' });
    } catch (error) {
        console.error('Error during sign-in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { handleSignIn, handleGoogleSignin };
const User = require('../model/user.model')
const generateToken = require('../utils/jwtToken');
const setCookie = require('../utils/setCookie');
const bcrypt = require('bcrypt')

const handleGoogleSignup = async(req, res) => {
    const { userName, email, googleId } = req.body;

    try {
        const isExistingUser = await User.findOne({ email });
    
        if (isExistingUser) {
          return res.status(409).json({ success: false, message: 'Email already exists' });
        }
    
        const hashedId = await bcrypt.hash(googleId, 7);
    
        const user = await User.create({
          userName,
          email,
          googleId: hashedId,
          provider: 'google',
          isVerified: true, 
        });
    
        const token = generateToken(user);
        setCookie(res, token);
    
        res.status(201).json({
          success: true,
          message: 'Google account registered successfully',
          token,
          user
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
      }
}

const handleGoogleSignin = async (req, res) => {
    const { email, googleId } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        console.log("Incoming UID:", googleId);
        console.log("Stored Hash:", user.googleId);


        const isIdValid = await bcrypt.compare(googleId, user.googleId);
        if (!isIdValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id)
        setCookie(res, token)

        res.status(200).json({ token, message: 'Sign-in successful' });
    } catch (error) {
        console.error('Error during sign-in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = {handleGoogleSignup, handleGoogleSignin}
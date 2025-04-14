const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/jwtToken');
const setCookie = require('../utils/setCookie');
const sendMail = require('../middlewares/sendMail');
const otp = require('../utils/generateOTP')
const { otpExpiresTime } = require('../utils/expiresTime'); 

// -----------------------------
// Signup with credentials
// -----------------------------
const handleSignUp = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    // check if user already exists
    const isExistingUser = await User.findOne({ email });

    if (isExistingUser) {
      return res.status(409).json({ success: false, message: 'Email already exists' });
    }

    // hash password
    const hashedPass = await bcrypt.hash(password, 7);

    // create user
    const user = new User({
      userName,
      email,
      password: hashedPass,
      provider: 'credentials',
    });

    // generate OTP
    const otpCode = otp; // returns a 6-digit number
    const expiry = new Date(Date.now() + otpExpiresTime); // e.g., 10 mins from now

    user.otp = otpCode;
    user.otpExpiresTime = expiry;

    await user.save();

    // send OTP email
    await sendMail(
      email,
      'Email Verification OTP',
      otpCode
    );

    // generate token and set cookie
    const token = generateToken(user);
    setCookie(res, token);

    res.status(201).json({
      success: true,
      message: 'User created successfully. OTP sent to email.',
      token,
      user: {
        _id: user._id,
        email: user.email,
        userName: user.userName,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


const handleGoogleSignup = async (req, res) => {
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
      isVerified: true, // assume Google accounts are verified
    });

    const token = generateToken(user);
    setCookie(res, token);

    res.status(201).json({
      success: true,
      message: 'Google account registered successfully',
      token,
      user: {
        _id: user._id,
        email: user.email,
        userName: user.userName,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  handleSignUp,
  handleGoogleSignup,
};

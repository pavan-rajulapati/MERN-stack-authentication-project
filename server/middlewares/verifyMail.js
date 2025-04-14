const User = require('../model/user.model');

const verifyMail = async (req, res) => {
	const { email, otp } = req.body;

	if (!otp || !email) {
		return res.status(400).json({ success: false, message: "OTP and Email are required" });
	}

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" });
		}

		if (user.isVerified) {
			return res.status(201).json({ success: false, message: "your already verified" })
		}

		if (Date.now() > user.otpExpiresTime) {
			return res.status(408).json({ success: false, message: "OTP Expired" });
		}

		if (parseInt(otp) !== user.otp) {
			return res.status(400).json({ success: false, message: "Enter a valid OTP" });
		}

		user.otp = undefined;
		user.otpExpiresTime = undefined;
		user.isVerified = true;
		await user.save();

		return res.status(200).json({ success: true, message: "You're verified successfully" });

	} catch (error) {
		console.error(error);
		return res.status(500).json({ success: false, message: "Internal Error" });
	}
};

module.exports = verifyMail;

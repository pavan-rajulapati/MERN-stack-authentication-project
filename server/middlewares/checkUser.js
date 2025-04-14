const User = require('../model/user.model');

const checkUserExist = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(409).json({ success: false, message: "User does not exist" });
        }

        return res.status(200).json({ success: true, message: "User exists" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = checkUserExist;

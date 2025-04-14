const User = require('../model/user.model')

const getUserData = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        return res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: "Internal Error" });
    }
};

module.exports = getUserData
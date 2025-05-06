// middleware/lectureOnly.js
const User = require('../models/User');

module.exports = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user || user.role !== 'lecture') {
            return res.status(403).json({ msg: 'lecture access only' });
        }
        next();
    } catch (err) {
        return res.status(500).json({ msg: 'Server error' });
    }
};

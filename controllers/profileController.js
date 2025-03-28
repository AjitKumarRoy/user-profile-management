const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.json({'message': 'Logged out sucessfully'});
};

exports.getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password -__v');
        res.send(`Welcome ${user.name}`);
    } catch(error) {
        next(error);
    }
};

exports.updateProfile = async (req, res, next) => {
    try {
        const updates = req.body;

        if (updates.password) {
            const saltRounds = 10;
            updates.password = await bcrypt.hash(updates.password, saltRounds);
        }
        const user = await User.findByIdAndUpdate(req.user.id, updates, {new: true}).select('-password -__v');
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.json({message: 'Profile updated successfully', user});
    } catch(error) {
        next(error);
    }
};
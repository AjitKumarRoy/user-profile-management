const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    password: { type: String }, 
    googleId: { type: String, unique: true, sparse: true }, 
    bio: { type: String },
    profilePicture: { type: String },
    provider: { type: String, default: 'local' } 
}, { timestamps: true });

const userModel = mongoose.model('User', user);

module.exports = userModel;
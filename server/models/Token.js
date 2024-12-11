const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    refreshToken: {
        type: [String], // Array to store multiple refresh tokens
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Token', tokenSchema);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    mobile: {
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

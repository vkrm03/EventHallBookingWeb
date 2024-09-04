const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    staff_name: {
        type: String,
        required: true,
    },
    email_id: {
        type: String,
        required: true,
    },
    mobile_no: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
});

const User = mongoose.model('users', userSchema);

module.exports = User;

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone_number:{
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['customer', 'government_official', 'admin'],
    },
    created_at: {
        type: Date,
        default: Date.now,
    },

    });

const User = mongoose.model('User', userSchema);

module.exports = User;





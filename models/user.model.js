const mongoose = require('mongoose')
const { Schema } = mongoose

const geoJSONSchema = new Schema({
    type: {
        type: String,
        enum: ['Point', 'Polygon', 'MultiPolygon'],
    },
    coordinates: [],
})

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
    phone_number: {
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
    image: {
        type: String, // URL of the user's profile image
    },
    hasLocationPermission: {
        type: Boolean,
        default: false, 
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
})

const User = mongoose.model('User', userSchema)

module.exports = User



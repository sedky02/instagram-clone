const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 3,
        max: 1024
    }
}, {timestamps: true} // this is gonna make created - modified at automatically
)

module.exports = mongoose.model('User', userSchema);
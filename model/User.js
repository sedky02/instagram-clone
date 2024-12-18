const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255,
        trim:true
    },
     username: {
        type: String,
        required: true,
        min: 3,
        max: 255,
        trim:true
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
        trim:true
    },
    password: {
        type: String,
        required: true,
        min: 3,
        max: 1024
    }
}, {timestamps: true} // this is gonna make created - modified at automatically
)
const User = mongoose.model('user', userSchema);
module.exports = User;
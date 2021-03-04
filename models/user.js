const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // confirmPassword: {
    //     type: String,
    //     required: true
    // },
    status: {
        type: String,
        default: 'I am new user'
    },
    createdAt: {
        type: Date,
    }
})

module.exports = mongoose.model('User', userSchema);
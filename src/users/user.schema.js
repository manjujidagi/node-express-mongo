const mongoose = require('mongoose');
const config = require('./../../config');

const user_schema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    first_name: {
        type: String
    },
    middle_name: {
        type: String
    },
    last_name: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: Object.values(config.ROLES).map(role => role.key),
        required: true
    }
}, {timestamps: true});

module.exports = user_schema;
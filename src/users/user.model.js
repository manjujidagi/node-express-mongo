const mongoose = require('mongoose');
const user_schema = require('./user.schema');

const User = mongoose.model('User', user_schema);

module.exports = User;

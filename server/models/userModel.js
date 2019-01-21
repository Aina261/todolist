const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: String,
    email: String,
    password: String,
    created_date: {type: Date, default: new Date()},
});

const User = mongoose.model('User', userSchema, 'USER_COLLECTION');
module.exports = User;
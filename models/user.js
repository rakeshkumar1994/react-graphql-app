const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    email: String,
    phone: Number,
    address: String,
    zip: Number,
    file: String
})

module.exports = mongoose.model('User', userSchema);

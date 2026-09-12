const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
   email: {
    type: String,
    unique: true
   },
   mobile: {
    type: String,
   },
   address: {
    type: String,
    required: true
   },
   aadharCardNumber: {
    type: Number,
    required: true,
    unique: true
   },
   city: {
    type: String,
   },
   state: {
    type: String,
   },
   password: {
    type: String,
    required: true
   },
 role: {
    type: String,
    enum: ['admin', 'user', 'voter'],
    default: 'voter'
   },
   isVoted: {
    type: Boolean,
    default: false
   },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
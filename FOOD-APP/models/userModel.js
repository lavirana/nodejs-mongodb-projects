const mongoose = require('mongoose');


//schema
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true, 'user name is required']
    },
    email:{
        type:String,
        required:[true, 'email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'password is required']
    },
    address:{
        type:Array,
    },
    phone:{
        type:String,
        required:[true, 'phone is required']
    },
    usertype:{
        type:String,
        required:[true, 'user type is required'],
        default:'client',
        enum:['client','admin','vendor','driver']
    },
    profile:{
        type:String,
        default:'https://t4.ftcdn.net/jpg/07/03/86/11/360_F_703861114_7YxIPnoH8NfmbyEffOziaXy0EO1NpRHD.jpg'
    },
    answer: {
        type: String,
        required: [true, 'Answer is Required'],
    },
},{timestamps:true})

module.exports = mongoose.model('User', userSchema);
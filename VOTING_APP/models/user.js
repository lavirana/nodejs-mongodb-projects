const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

userSchema.pre('save', async function(next) {
    const user = this;

    //hash the password only if it has been modified
    if(!user.isModified('password')) return next();

    try{
        //hash password generation
        const salt = await bcrypt.genSalt(10);

        //hash passord
        const hashedPassword = await bcrypt.hash(user.password, salt);

        //Override the plain password with hashed one
        user.password = hashedPassword;
       //next();
    }catch(err){
        return;  
        //next(err);
    }
})

userSchema.methods.comparePassword = async function(userPassword){
    try{
        const isMatch = await bcrypt.compare(userPassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

const User = mongoose.model('User', userSchema);
module.exports = User;
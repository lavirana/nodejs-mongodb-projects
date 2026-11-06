import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: [true, 'email already taken']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: [true, 'password length should be greater than 6 character']
    },
    address: {
        type: String,
        required:[true,'address is required']
    },
    city: {
        type: String,
        required:[true, 'City name is required']
    },
    country: {
        type: String,
        required:[true, 'country name is required']
    },
    phone: {
        type: String,
        required:[true, 'phone number is required']
    },
    profilePic:{
        public_id : String,
        url : String
    }
},
{timestamps:true});


//function
//has function
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

//compare function
userSchema.methods.comparePassword = async function(plainPassword){
    return await bcrypt.compare(plainPassword,this.password);
};

//JWT Token
userSchema.methods.generateToken = function(){
   return JWT.sign({ _id: this._id }, process.env.JWT_SECRET, {expiresIn: '7d',})
}

export const  userModel = mongoose.model("Users",userSchema);
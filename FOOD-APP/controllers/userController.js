const User = require("../models/userModel")
const bcrypt = require('bcryptjs');   // or require('bcrypt'), whichever you installed

//GET ALL USERS || GET
const getAllUsersController = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//GET USER BY ID || GET
const getUserByIdController = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User Not Found' });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//UPDATE USER || PUT
const updateUserController = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        //validation
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'User Not Found'
            })
        }
        //Update 
        const {userName, address, phone} = req.body
        if(userName) user.userName = userName
        if(address) user.address = address
        if(phone) user.phone = phone
        //Save User
        await user.save();
        res.status(200).send({
            success:true,
            message:'User Update Successfully'
        })
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//DELETE USER || DELETE
const deleteUserController = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const resetPasswordController = async (req, res) => {
    try {
        const {email,newPassword,answer} = req.body
        if(!email || !newPassword || !answer){
            return res.status(500).send({
                success:false,
                message:'Please Provide All Fields'
            })
        }
        const user = await User.findOne({email,answer})
        if(!user){
            return res.status(500).send({
                success:false,
                message:'User Not Found or invalid Answer'
            })
        }
        //hashing Password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword
        await user.save();
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Password Reset API',
            error: error.message
        });
    }
}



module.exports = { getAllUsersController, getUserByIdController, updateUserController, deleteUserController, resetPasswordController };
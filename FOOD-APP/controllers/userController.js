const User = require("../models/userModel")

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



module.exports = { getAllUsersController, getUserByIdController, updateUserController, deleteUserController };
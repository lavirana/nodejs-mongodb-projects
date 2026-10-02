const userModel = require("../models/userModel")

const registerController = async (req, res) => {
    try{
    const {userName, email, password,phone,address} = req.body;
    //validation
    if(!userName || !email || !password || !address || !phone){
        return res.status(500).send({
            success:false,
            message: 'Please Provide All Fields'
        })
    }
    //check user
    const existing = await userModel.findOne({email})
    if(existing){
        return res.status(500).send({
            success:false,
            message: 'Email Already Registered Please Login'
        })
    }
    //create new user
    const user = await userModel.create({userName, email,password,address,phone})
    res.status(201).send({
        success:true,
        message:"Successfully Registered",
    })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error In Register API',
            error
        })
    }
}

//LOGIN || POST
const loginController = async (req, res) => {
    try{
        const {email, password} = req.body;
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error In Login API',
            error
        })
    }
}

//LOGOUT || POST
const logoutController = async (req, res) => {
    try{
        const {email, password} = req.body;
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error In Logout API',
            error
        })
    }
}

//GET USER || GET   
const getUserController = async (req, res) => {
    try{
        const {email, password} = req.body;
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error In Get User API',
            error
        })
    }
}

//UPDATE USER || PUT
const updateUserController = async (req, res) => {
    try{
        const {email, password} = req.body;
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error In Update User API',
            error
        })
    }
}

//DELETE USER || DELETE
const deleteUserController = async (req, res) => {
    try{
        const {email, password} = req.body;
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error In Delete User API',
            error
        })
    }
}

module.exports = { registerController, loginController, logoutController, getUserController, updateUserController, deleteUserController };
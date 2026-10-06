const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
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
        });
    }
    //hash password
    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    const user = await userModel.create({
        userName,
         email,
         password: hashedPassword,
         address,
         phone})
    res.status(201).send({
        success:true,
        message:"Successfully Registered",
        user
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
        //validation
        if(!email || !password){
            return res.status(500).send({
                success:false,
                message: 'Please Provide All Fields'
            })
        }
        //check user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(500).send({
                success:false,
                message: 'User Not Found'
            })
        }
        //compare password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message: 'Invalid Password'
            })
        }
        //create token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
        res.status(200).send({
            success:true,
            message:"Successfully Logged In",
            user:{
                _id: user._id,
                userName: user.userName,
                email: user.email,
                phone: user.phone,
                address: user.address,
                password: user.password
            },
            token
        })
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
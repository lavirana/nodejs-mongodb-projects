import { userModel } from '../models/userModel.js'
export const registerController = async (
    req, res
) => {
    try {
        const {name, email, password, address, city, country, phone} = req.body
        //validation
        if(!name || !email || !password || !city || !address || !country){
            return res.status(500).send({
                sucess: false,
                message: 'Please Provide All Fields'
            });
        }
        //check existing user
        const exisitingUser = await userModel.findOne({email});
        if(exisitingUser){
            return res.status(500).send({
                success: false,
                message: "Email already taken"
            });
        }
        const user = await userModel.create({name, email, password, address, city, country, phone});
        res.status(201).send({
            success:true,
            message: 'Registration Success, Please login',
            user,
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error In Register API',
            error
        })
    }
};


//Login
export const loginController = async (req, res) => {
    try{
    const {email, password} = req.body
    //Validation
        if(!email || !password){
            return res.status(500).send({
                success:false,
                message:'Please Add Email or Password'
            });
        }
        //check user
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'User Not Found'
            });
        }
        //check password
        const isMatch = await user.comparePassword(password)
        if(!isMatch){
            return res.status(500).send({
                success: false,
                message: 'Invalid Credentials'
            });
        }
        //token
        const token = user.generateToken();
        res.status(200).send({
            success:true,
            message:'Login Successfully',
            token,
            user
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error In Login API',
            error
        })

    }
}

//GET USER PROFILE
export const getUserProfileController = async (req, res) => {
    try{
        const user = req.user;
        user.password = undefined;
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'User Not Found'
            });
        }
        res.status(200).send({
            success:true,
            message:'User Profile Fetched Successfully',
            user
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error In Profile API',
            error
        })
    }
};
import { userModel } from '../models/userModel.js'
import cloudinary from 'cloudinary';
import { dataUri } from '../utils/Features.js';

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

//LOGOUT
export const logoutController = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(404).send({
                success: false,
                message: 'User Not Found'
            })
        }

        res.status(200).send({
            success: true,
            message: 'Logout Successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error In Logout API',
            error: error.message
        })
    }
}

export const updateProfileController = async (req, res) => {
    try{
        const user = await userModel.findById(req.user._id);
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'User Not Found'
            });
        }
        const {name, email, address, city, country, phone} = req.body;
       if(name) user.name = name;
       if(email) user.email = email;
       if(address) user.address = address;
       if(city) user.city = city;
       if(country) user.country = country;
       if(phone) user.phone = phone;
    
        //save user
        await user.save();
        res.status(200).send({
            success: true,
            message: 'Profile Updated Successfully',
            user
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error In Update Profile API',
            error: error.message
        });
    }
}

//UPDATE PASSWORD
export const updatePasswordController = async (req, res) => {
    try{
              //check user
        const user = await userModel.findById(req.user._id);
        const {oldPassword, newPassword} = req.body;
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'User Not Found'
            });
        }
        if(!oldPassword || !newPassword){
            return res.status(500).send({
                success: false,
                message: 'Please Provide Old and New Password'
            });
        }
        //check old password
        const isMatch = await user.comparePassword(oldPassword);
        if(!isMatch){
            return res.status(500).send({
                success: false,
                message: 'Invalid Old Password'
            });
        }
        //update password
        user.password = newPassword;
        await user.save();
        res.status(200).send({
            success: true,
            message: 'Password Updated Successfully',
            user
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error In Update Password API',
            error: error.message
        });
    }
}

//UPLOAD PROFILE PICTURE
export const uploadProfilePictureController = async (req, res) => {
    try{
        const user = await userModel.findById(req.user._id)
        //get file from client photo
        const file = dataUri(req.file)
        //delete old profile image
        if (user.profilePic?.public_id) {
            await cloudinary.v2.uploader.destroy(user.profilePic.public_id)
        }
        // update

        const cdb = await cloudinary.v2.uploader.upload(file.content)
        user.profilePic = {
            public_id: cdb.public_id,
            url:cdb.secure_url
        }
        //save function
        await user.save()
        res.status(200).send({
            success:true,
            message:'profile picture updated',
        })
    }catch(error){
    console.log(error);
    res.status(500).send({
        success: false,
        message: 'Error In Upload Profile Picture API',
        error: error.message
    });
}
}
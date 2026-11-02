import { userModel } from '../models/userModel.js'
export const registerController = async (
    req, res
) => {
    try {
        const {name, email, password, address, city, country} = req.body
        //validation
        if(!name || !email || !password || !city || !address || !country){
            return res.status(500).send({
                sucess: false,
                message: 'Please Provide All Fields'
            });
        }
        const user = await userModel.create({name, email, password, address, city, country});
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
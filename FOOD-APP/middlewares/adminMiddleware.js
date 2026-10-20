const userModel = require('../models/userModel')
const adminMiddleware = (req, res, next) => {
    try{
    const user = await userModel.findById(req.body.id)
    if(user.usertype !== "admin"){
        return res.status(401).send({
            success:false,
            message:"Only Admin Access"
        });
    }else{
        next();
    }
    }catch(error){
        return res.status(401).json({ message: 'Unauthorized Something went wrong in middleware' });
    }
}

module.exports = adminMiddleware;
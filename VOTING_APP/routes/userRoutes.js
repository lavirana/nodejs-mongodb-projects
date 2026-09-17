const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');

//POST route to add a person
router.post('/signup', async (req, res) => {
    try {
        const data = req.body // Assuming the request body contains the person data

        //Create a new User document using the Mongoose model
        const newUser = new User(data);

        //Save the new user to the database
        const response = await newUser.save();
        console.log('New user has been created');

        const payload = {
            id: response.id,
            username: response.username
        }

        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("Token is : ", token);
        res.status(200).json({response: response, token: token});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error - User Not Created'});
    }
});


//Login Route
router.post('/login', async(req, res) => {
    try{
        //Extract username and password from request body
        const {aadharCardNumber, password} = req.body;

        //Find the user by username
        const user = await User.findOne({aadharCardNumber: aadharCardNumber});

        //If user does not exist or password does not match, return error
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        // generate Token
        const payload = {
            id: user.id,
        }
        const token = generateToken(payload);

        //return token as respons
        res.json(token)
    }catch(err){
        console.error(err);
        res.status(500).json({error: "Internal Server Error"});
    }
})

//Profile route
router.get('/profile',jwtAuthMiddleware, async (req, res) => {
    try{
        const userData = req.user;
        console.log("User Data: ", userData);

        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json({user});
    }catch(err){
        console.error(err);
//If Password does not match,return err
        res.status(200).json(response);
    }
});


router.put('/profile/password', jwtAuthMiddleware, async (req, res) => {
    try{
        const userId = req.user;
        const {currentPassword, newPassword} = req.body

        // Find the user by user id
        const user = await User.findById(userId);

        //If user does not exist or password does not match, return error
        if(!(await user.comparePassword(currentPassword))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        //update the user's password
        user.password = newPassword;
        await user.save();

        res.status(200).json({message: "Password updated"});
    }catch(err){
        res.status(500).json({error: 'Internal Server Error'});
    }
});

module.exports = router;
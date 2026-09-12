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
    }catch {
        
    }
});


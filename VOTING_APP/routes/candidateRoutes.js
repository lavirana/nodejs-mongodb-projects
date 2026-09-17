const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate');
const User = require('../models/user');
const {jwtAuthMiddleware, generateToken} = require('../jwt');


const checkAdminRole = async (userID) => {
    try {
        const user = await User.findById(userID);
        if(user.role === 'admin'){
            return true;
        }
    }catch(err){
        return false;
    }
}

//POST route to add a candidate
router.post('/', jwtAuthMiddleware, async (req, res) => {
    try {
        if(!(await checkAdminRole(req.user.id)))
            return res.status(403).json({message: 'User has not ADMIN role'});

        const data = req.body // Assuming the request body contains the candidate data

        //Create a new User document using the Mongoose model
        const newCandidate = new Candidate(data);

        //Save the new user to the database
        const response = await newCandidate.save();
        res.status(200).json({response: response});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error - Candidate Not Created'});
    }
});



router.put('/:candidateID', jwtAuthMiddleware, async (req, res) => {
    try{
        if(!(await checkAdminRole(req.user.id)))
            return res.status(403).json({message: 'User has not admin role'});
        
        const candidateID = req.params.candidateID;
        const updateCandidateData = req.body;

        const response = await User.findByIdAndUpdate(candidateID, updateCandidateData, {
            new: true,
            runValidators: true,
        })
        if(!response) {
            return res.status(404).json({error: 'Candidate not found'});
        }
    res.status(200).json(response);
    }catch(err){
        res.status(500).json({error: 'Internal Server Error'});
    }
});


router.delete('/:candidateID', jwtAuthMiddleware , async (req, res) => {
    try{
        if(!(await checkAdminRole(req.user.id)))
            return res.status(403).json({message: 'User does has not have admin role'});
        
        const candidateID = req.params.candidateID;

        const response = await User.findByIdAndDelete(candidateID)
    
        if(!response) {
            return res.status(404).json({error: 'Candidate not found'});
        }
        console.log('candidate Deleted');
    res.status(200).json(response);
    }catch(err){
        res.status(500).json({error: 'Internal Server Error'});
    }
});

module.exports = router;
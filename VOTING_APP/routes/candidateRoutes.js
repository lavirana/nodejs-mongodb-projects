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


//start voting
router.post('/vote/:candidateID', jwtAuthMiddleware, async (req, res) => {
    // no admin can vote
    // user can only vote once

    candidateID = req.params.candidateID;
    userId = req.user.id;
try{
    //Find the candiate document with the specified candiateID
        const candidate = await Candidate.findById(candidateID);
        if(!candidate){
            return res.status(404).json({message: "Candidate Not Found"}); 
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message: "User Not Found"}); 
        }
        if(user.isVoted){
            return res.status(400).json({message: "You have already voted"}); 
        }
        if(user.role == 'admin'){
            return res.status(403).json({message: "Admin is not allowed"}); 
        }

        //update the candidate document to record the  vote
        candidate.votes.push({users: userId})
        candidate.votesCount++;
        await candidate.save();


        //updated the user document
        user.isVoted = true
        await user.save();

        res.status(200).json({message: 'vote recorded successfully'});
}catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
}
});


//vote count
router.get('/vote/count', async (req, res) => {
    try {
        //Find all candidate and sort them by voteCount in decending order
        const candidate = await Candidate.find().sort({votesCount: 'desc'});

        //Map the candidates to only return their name and voteCount
        const voteRecord = candidate.map((data)=>{
            return {
                party: data.party,
                count: data.votesCount
            }
        });
        return res.status(200).json(voteRecord)
    }catch(err){
        res.status(500).json({error: 'Internal Server Error'});
    }
});

module.exports = router;
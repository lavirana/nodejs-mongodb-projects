//const sessionIdToUserMap = new Map();
const jwt = require("jsonwebtoken");
const secret = "lavi@123";

function setUser(user){
    return jwt.sign({
        _id: user._id,
        email: user.email
    },
    secret
);
   // sessionIdToUserMap.set(id, user)
}

function getUser(token){
    if(!token) return null;
    try{
        return jwt.verify(token, secret);
        //return sessionIdToUserMap.get(id);
    }catch (error) {
        return null;
    }

}

module.exports = {
    setUser,
    getUser
}
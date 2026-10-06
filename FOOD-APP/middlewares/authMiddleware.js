const JWT = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try{
    const token = req.headers['authorization'].split(" ")[1];
        JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                return res.status(401).json({ message: 'Unauthorized Failed to verify token' });
            }
            req.userId = decoded.id;
            next();
        });
    }catch(error){
        return res.status(401).json({ message: 'Unauthorized Something went wrong in auth middleware' });
    }
}

module.exports = authMiddleware;
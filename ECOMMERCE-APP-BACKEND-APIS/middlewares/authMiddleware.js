import jwt from 'jsonwebtoken';
import { userModel } from '../models/userModel.js';

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Unauthorized Header Missing' });
        }

        const token = authHeader.startsWith('Bearer ')
            ? authHeader.split(' ')[1]
            : authHeader;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await userModel.findById(decoded._id);
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized User Not Found' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

//ADMIN AUTH

export const isAdmin = async(req, res, next) => {
    if(req.user.role !== 'admin'){
        return res.status(401).send({
            success:false,
            message:"admin only"
        });
    }
    next();
}
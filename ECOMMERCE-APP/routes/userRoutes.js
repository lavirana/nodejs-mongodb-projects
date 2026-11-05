import express from 'express';
import { getUserProfileController, loginController, registerController } from '../controller/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

//router object
const router = express.Router()

//routes
//register
router.post('/register', registerController);

//login
router.post('/login', loginController);

//userProfile
router.get('/profile', authMiddleware , getUserProfileController);

//export
export default router;
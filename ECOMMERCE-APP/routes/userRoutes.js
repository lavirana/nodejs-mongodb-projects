import express from 'express';
import { getUserProfileController, loginController, logoutController, registerController, updateProfileController } from '../controller/userController.js';
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

//logout
router.get('/logout', authMiddleware , logoutController);

//update profile
router.put('/profile-update', authMiddleware, updateProfileController);

//export
export default router;
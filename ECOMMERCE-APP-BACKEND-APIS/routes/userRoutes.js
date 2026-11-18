import express from 'express';
import { getUserProfileController, loginController, logoutController, passwordResetController, registerController, updatePasswordController, updateProfileController, uploadProfilePictureController } from '../controller/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multer.js';

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

//update password
router.put('/password-update', authMiddleware, updatePasswordController);

//upload profile picture
router.put('/upload-profile-picture',authMiddleware, upload.single('file'), uploadProfilePictureController);

//Forgot Password
router.post("/reset-password", passwordResetController)

//export
export default router;
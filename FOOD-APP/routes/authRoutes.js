const express = require('express');
const { registerController, loginController, logoutController, getUserController, updateUserController, deleteUserController, resetPasswordController } = require('../controllers/authControllers');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();


//REGISTER || POST
router.post('/register', registerController);

//LOGIN || POST
router.post('/login', loginController);

//LOGOUT || POST
router.post('/logout', logoutController);

//GET USER || GET
router.get('/getUser', getUserController);

//UPDATE USER || PUT
router.put('/updateUser', updateUserController);

//DELETE USER || DELETE
router.delete('/deleteUser', deleteUserController);

//RESET Password
router.post('/resetPassword', authMiddleware, resetPasswordController)

module.exports = router;
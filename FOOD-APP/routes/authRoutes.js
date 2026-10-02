const express = require('express');
const { registerController, loginController, logoutController, getUserController, updateUserController, deleteUserController } = require('../controllers/authControllers');

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

module.exports = router;
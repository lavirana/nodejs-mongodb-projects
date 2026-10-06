const express = require('express');
const { getUserByIdController, getAllUsersController, updateUserController, deleteUserController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

//GET ALL USERS || GET
router.get('/getAllUsers', getAllUsersController);

//GET USER BY ID || GET
router.get('/getUserById', authMiddleware, getUserByIdController);

//UPDATE USER || PUT
router.put('/updateUser', updateUserController);

//DELETE USER || DELETE
router.delete('/deleteUser', deleteUserController);

module.exports = router;
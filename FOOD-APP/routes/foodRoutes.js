const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createFoodController, getAllFoodController, getFoodByIdController } = require('../controllers/foodController');

const router = express.Router();

//routes

//CREATE FOOD
router.post('/create', authMiddleware , createFoodController)

//GET ALL FOOD 
router.post('/getAll', getAllFoodController)

//GET FOOD BY ID
router.get('/getFoodById/:id', getFoodByIdController)

module.exports = router;
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createFoodController, getAllFoodController, getFoodByIdController, updateFoodController, deleteFoodController, placeOrderController, orderStatusController } = require('../controllers/foodController');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();

//routes

//CREATE FOOD
router.post('/create', authMiddleware , createFoodController)

//GET ALL FOOD 
router.post('/getAll', getAllFoodController)

//GET FOOD BY ID
router.get('/getFoodById/:id', getFoodByIdController)

//UPDATE FOOD
router.put('/update/:id', authMiddleware, updateFoodController)

//DELETE FOOD
router.put('/delete/:id', authMiddleware, deleteFoodController)

//PLACE OREDER
router.post('/placeorder',authMiddleware, placeOrderController)

//ORDER STATUS
router.post('/orderStatus/:id', adminMiddleware, orderStatusController)

module.exports = router;
const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const { createResturantController, getAllResturants, getResturantByIdController, deleteResturantByIdController } = require('../controllers/resturantControllers');

const router = express.Router();

//routes
//CREATE RESTURANT || POST
router.post('/create', authMiddleware, createResturantController)


//GET ALL RESTURANTS
router.get('/getAllResturants', authMiddleware, getAllResturants)


//GET RESTURANT BY ID
router.get('/getResturantbyId/:id', getResturantByIdController)

//DELETE RESTURANT BY ID
router.delete('/delete', authMiddleware, deleteResturantByIdController)


module.exports = router;
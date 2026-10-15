const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const { createResturantController, getAllResturants } = require('../controllers/resturantControllers');

const router = express.Router();

//routes
//CREATE RESTURANT || POST
router.post('/create', authMiddleware, createResturantController)


//GET ALL RESTURANTS
router.get('/getAllResturants', authMiddleware, getAllResturants)


module.exports = router;
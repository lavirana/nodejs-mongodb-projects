const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const { createResturantController } = require('../controllers/resturantControllers');

const router = express.Router();

//routes
//CREATE RESTURANT || POST
router.post('/create', authMiddleware, createResturantController)

module.exports = router;
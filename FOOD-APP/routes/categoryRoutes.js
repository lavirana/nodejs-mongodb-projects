const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createCatController, getAllCats, deleteCategoryByIdController, updateCategoryByIdController } = require('../controllers/categoryController');
const router = express.Router();

//routes
//CREATE CATEGORY
router.post('/create', authMiddleware, createCatController)

//GET ALL CATS
router.get('/getAll', getAllCats)

//DELETE CATEGORY BY ID
router.delete('/deleteCat/:id', deleteCategoryByIdController)

//UPDATE CATEGORY BY ID
router.put('/updateCat/:id', authMiddleware, updateCategoryByIdController)

module.exports = router;
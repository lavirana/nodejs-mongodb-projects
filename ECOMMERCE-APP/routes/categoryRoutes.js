import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multer.js';
import { createCategory, deleteCategoriesController, getAllCategoriesController, updateCategoryController } from '../controller/categoryController.js';

const router = express.Router();

//Get All Category
router.get('/get-all', authMiddleware, getAllCategoriesController);

//Get Single Category

//Create Category
router.post('/create', authMiddleware, createCategory);

//Update Category
router.put('/update/:id',authMiddleware, updateCategoryController);

//Delete Category
router.delete("/delete/:id", authMiddleware, deleteCategoriesController);

export default router
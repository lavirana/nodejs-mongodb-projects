import express from 'express';
import { createProductController, getAllProductsController, getSingleProduuctController } from '../controller/productController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

//routes
//GET ALL PRODUCT
router.get('/get-all', getAllProductsController);

//GET SINGLE PRODUCT
router.get('/:id', getSingleProduuctController);

//CREATE PRODUUCT
router.post('/create', authMiddleware, createProductController)

export default router
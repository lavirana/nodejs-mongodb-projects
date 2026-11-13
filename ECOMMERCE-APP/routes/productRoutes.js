import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multer.js'
import { createProductController, getAllProductsController, getSingleProduuctController } from '../controller/productController.js';


const router = express.Router();

//routes
//GET ALL PRODUCT
router.get('/get-all', getAllProductsController);

//GET SINGLE PRODUCT
router.get('/:id', getSingleProduuctController);

//CREATE PRODUUCT
router.post('/create', authMiddleware, upload.single('file'),  createProductController)

export default router
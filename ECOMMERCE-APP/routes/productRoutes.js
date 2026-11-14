import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multer.js'
import { createProductController, deleteProductImageController, getAllProductsController,
     getSingleProduuctController, updateProductController, UpdateProductImageController } from '../controller/productController.js';


const router = express.Router();

//routes
//GET ALL PRODUCT
router.get('/get-all', getAllProductsController);

//GET SINGLE PRODUCT
router.get('/:id', getSingleProduuctController);

//CREATE PRODUUCT
router.post('/create', authMiddleware, upload.single('file'),  createProductController);

//UPDATE PRODUCR
router.put('/:id', authMiddleware, updateProductController);

//update product image
router.put('/image/:id', authMiddleware, upload.single('file'), UpdateProductImageController);

//delete product image
router.delete('/delete-image/:id', authMiddleware, deleteProductImageController)


export default router
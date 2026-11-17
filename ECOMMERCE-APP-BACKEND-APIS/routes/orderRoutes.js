import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multer.js';
import { createOrderController } from '../controller/orderController.js';

const router = express.Router();

//Create Order
router.post('/create', authMiddleware, createOrderController);

export default router
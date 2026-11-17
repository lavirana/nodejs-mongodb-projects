import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multer.js';
import { createOrderController, getMyOrderControllers, paymentControllers, singleOrderDetailControllers } from '../controller/orderController.js';

const router = express.Router();

//Create Order
router.post('/create', authMiddleware, createOrderController);

//GET ALL ORDERS
router.get('/my-orders', authMiddleware, getMyOrderControllers)

//GET SINGLE ORDER DETAILS
router.get('/my-orders/:id', authMiddleware, singleOrderDetailControllers)

//Accept payments
router.post('/payments', authMiddleware, paymentControllers)

export default router
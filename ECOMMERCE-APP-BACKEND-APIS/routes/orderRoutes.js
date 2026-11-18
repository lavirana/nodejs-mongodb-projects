import express from 'express';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multer.js';
import { changeOrderStatusController, createOrderController, getAllOrdersController, getMyOrderControllers, paymentControllers, singleOrderDetailControllers } from '../controller/orderController.js';

const router = express.Router();

//Create Order
router.post('/create', authMiddleware, createOrderController);

//GET ALL ORDERS
router.get('/my-orders', authMiddleware, getMyOrderControllers)

//GET SINGLE ORDER DETAILS
router.get('/my-orders/:id', authMiddleware, singleOrderDetailControllers)

//Accept payments
router.post('/payments', authMiddleware, paymentControllers)


//ADMIN PART
//GET ALL ORDERS
router.get('/admin/get-all-orders', authMiddleware, isAdmin, getAllOrdersController)

//CHANGE ORDER STATUS
router.put('/admin/order/:id', authMiddleware, isAdmin, changeOrderStatusController)
export default router
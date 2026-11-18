
import orderModel from '../models/orderModel.js'
import productModel from '../models/productModel.js'
import { stripe } from '../config/stripe.js'

export const createOrderController = async (req, res) => {
    try {
        const {
            shippingInfo, orderItems, paymentMethod, paymentInfo,
            itemPrice, tax, shippingCharges, totalAmount
        } = req.body

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).send({
                success: false,
                message: 'No order items'
            })
        }

        // pehle stock check, taaki adha order na bane
        for (const item of orderItems) {
            const product = await productModel.findById(item.product)
            if (!product) {
                return res.status(404).send({
                    success: false,
                    message: `Product not found: ${item.name}`
                })
            }
            if (product.stock < item.quantity) {
                return res.status(400).send({
                    success: false,
                    message: `Not enough stock for ${product.name}`
                })
            }
        }

        // order create
        const order = await orderModel.create({
            user: req.user._id,
            shippingInfo,
            orderItems,
            paymentMethod,
            paymentInfo,
            itemPrice,
            tax,
            shippingCharges,
            totalAmount
        })

        // stock update
        for (const item of orderItems) {
            const product = await productModel.findById(item.product)
            product.stock -= item.quantity
            await product.save()
        }

        res.status(201).send({
            success: true,
            message: 'Order Placed Successfully',
            order
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error In Create Order API',
            error: error.message
        })
    }
}

//get all my orders
export const getMyOrderControllers = async (req, res) => {
    try{
        //find order
        const orders = await orderModel.find({user: req.user._id});
        //validation
        if(!orders){
            return res.status(404).send({
                success: false,
                message: 'No Order found'
            })
        }
        res.status(200).send({
            success: true,
            message: 'Your Order Data',
            totalOrder: orders.length,
            orders,
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in my order api',
            error: error.message
        })
    }
}

//get Single order INFO
export const singleOrderDetailControllers = async (req, res) => {
            try{
        //find order
        const order = await orderModel.findById(req.params.id)
        //validation
        if(!order){
            return res.status(404).send({
                success: false,
                message: 'No Order found'
            })
        }
        res.status(200).send({
            success:true,
            message:'your order fetched',
            order
        })
    }catch(error){
        console.log(error)
        if(error.name === "CastError"){
            return res.status(500).send({
                success: false,
                message: "Invalid Id"
            });
        }
        res.status(500).send({
            success:false,
            message:'Error in Get Single Order API',
            error
        })
    }
}

//get Single order INFO
export const paymentControllers = async (req, res) => {
    try {
        const { totalAmount } = req.body

        if (!totalAmount) {
            return res.status(400).send({
                success: false,
                message: 'Total Amount is required',
            })
        }

        const { client_secret } = await stripe.paymentIntents.create({
            amount: Math.round(Number(totalAmount) * 100),   // cents me
            currency: 'usd',
        })

        res.status(200).send({
            success: true,
            client_secret,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Payment API',
            error: error.message,   // asli reason dikhega
        })
    }
}

//ADMIN SECTION
//GET ALL ORDER

export const getAllOrdersController = async (req, res) => {
    try{
        const orders = await orderModel.find({})
        res.status(200).send({
            success: true,
            message: 'All Orders Data',
            totalOrders: orders.length,
            orders
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Payment API',
            error: error.message,   // asli reason dikhega
        })
    }
}

//change order status
export const changeOrderStatusController = async (req, res) => {
    try{
        //find order
        const order = await orderModel.findById(req.params.id)
        //validation
        if(!order){
            return res.status(404).send({
                success: false,
                message: 'Order not found'
            })
        }
        if(order.orderStatus === "processing") order.orderStatus = "Shipped"
        else if(order.orderStatus === "Shipped"){
            order.orderStatus = "delivered"
            order.deliveredAt = Date.now()
        }else{
            return res.status(500).send({
                success: false,
                message: "Order Already Delivered"
            })
        }
        await order .save()
        res.status(200).send({
            success:true,
            message: 'Order Status Updated'
        })
    }catch(error){
        console.log(error)
        if(error.name === "CastError"){
            return res.status(500).send({
                success: false,
                message: "Invalid Id"
            });
        }
        res.status(500).send({
            success:false,
            message:'Error in Get Update Order API',
            error
        })
    }
}
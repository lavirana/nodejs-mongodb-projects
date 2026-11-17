import orderModel from '../models/orderModel.js'
import productModel from '../models/productModel.js'

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
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
        shippingInfo:{
            address:{
                type:String,
                required:[true, 'address is required']
            },
            city:{
                type:String,
                required:[true, 'city name is required']
            },
            country:{
                type:String,
                required:[true, 'country name is required']
            }
    },
    orderItems:[
        {
            name: {
                type:String,
                required:[true, 'Product name is required']
            },
            price: {
                type:Number,
                required:[true, 'Product Price is required']
            },
            quantity:{
                type:Number,
                required:[true, 'Product quantity is required']
            },
            image:{
                type:Number,
                required:[true, 'Product image is required']
            },
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'Products',
                required:true
            }
        }
    ],
    paymentMethod:{
        type:String,
        enum:["COD","ONLINE"],
        default:"CODE"
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:[true, 'User id is require']
    },
    paidAt:Date,
    paymentInfo:{
        id:String,
        status:String
    },
    itemPrice:{
        type:Number,
        required:[true, 'item price is required']
    },
    tax:{
        type:Number,
        required:[true, 'tax price is required']
    },
    shippingCharges:{
        type:Number,
        required:[true, 'item shippingCharges is required']
    },
    totalAmount:{
        type:Number,
        required:[true, 'item totalAmount price is required']
    },
    orderStatus:{
        type:String,
        enum:[`processing`,`shipped`,`deliverd`],
        default:'processing'
    },
    deliveredAt: Date
}, { timestamps: true });

const orderModel = mongoose.model("Orders", orderSchema);

export default orderModel;
import mongoose  from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Product name is Required']
    },
    description:{
        type:String,
        required:[true, 'Product description is Required']
    },
    price:{
        type:String,
        required:[true, 'Product price is Required']
    },
    stock:{
        type:Number,
        required:[true,'Product stock is Required']
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    images:[
        {
            public_id:String,
            url:String
        }
    ]
},{timestamps: true})

export const productModel = mongoose.model("Products", productSchema);
export default productModel;
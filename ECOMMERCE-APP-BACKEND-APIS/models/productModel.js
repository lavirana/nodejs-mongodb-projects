import mongoose  from "mongoose";

//REVIEW MODEL
const reviewSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"]
        },
        rating: {
            type: Number,
            deafult: 0,
        },
        comment:{
            type:String,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: [true, "User Required"],
        },
    }
)

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
   // quantity:{
   //     type:Number,
   //     required:[true,'Product Quantity is Required']
  //  },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    images:[
        {
            public_id:String,
            url:String
        }
    ],
    reviews: [reviewSchema],
    rating:{
        type:Number,
        default:0
    },
    numReviews:{
        type:Number,
        default:0
    },
},{timestamps: true})

export const productModel = mongoose.model("Products", productSchema);
export default productModel;
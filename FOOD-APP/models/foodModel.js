const mongoose = require('mongoose');


//schema
const foodSchema = new mongoose.Schema(
 {
    title: {
    type: String,
    required: [true, "Food Title is Required"],
    },
    description: {
        type : String,
        required : [true, 'Food description is required']
    },
    price: {
        type : Number,
        required: [true, 'Food Price is Required']
    },
    imageUrl: {
        type: String,
        default: "https://img.icons8.com/pulsar-color/1200/image.jpg"
    },
    foodTags : {
        type: String
    },
    category : {
        type : String,
    },
    code : {
        type: String,
    },
    isAvailable : {
      type: Boolean,
      default : true 
    },
    resturant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resturant'
    },
    rating : {
        type : Number,
        default : 5,
        min : 1,
        max : 5,
    },
    ratingCount : {
        type : String,
    },
 },
{timestamps:true})

module.exports = mongoose.model('Foods', foodSchema);
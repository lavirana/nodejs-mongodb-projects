const mongoose = require('mongoose');


//schema
const resturantSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Resturant title is Required"],
    },
    imageUrl: {
        type: String,
    },
    foods: { type: Array },
    time: {
        type: String,
    },
    pickup: {
        type:Boolean,
        default:true
    },
    delivery: {
        type: Boolean,
        default:true
    },
    isOpen: {
        type: Boolean,
        default: true,
    },
    logoUrl: {
        type: String,
    },
    rating: {
        type:Number,
        default:1,
        min:1,
        max:2
    },
    ratingCount:{type:String},
    code: {
        type: String,
    },
    coords: {
        id:{type: String,},
        latitudeDelta: {type: Number},
        latitude: {type: Number},
        latitudeDelta: {type: Number},
        longitude: {type: Number},
        longitideDelta: {type: Number},
        address: {type:String},
        title: {type:String}
    },
},{timestamps:true})

module.exports = mongoose.model('Resturant', resturantSchema);
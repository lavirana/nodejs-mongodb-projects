const mongoose = require('mongoose');


//schema
const categorySchema = new mongoose.Schema(
 {
    title: {
    type: String,
    required: [true, "Category Title is Required"],
    },
    imageUrl: {
        type: String,
        default: "https://img.icons8.com/pulsar-color/1200/image.jpg"
    },
 },
{timestamps:true})

module.exports = mongoose.model('Categories', categorySchema);
import productModel from "../models/productModel.js";
import cloudinary from 'cloudinary';
import { dataUri } from './../utils/features.js';


//GET All Products
export const getAllProductsController = async (req,res) => {
    try{
        const products = await productModel.find({})
        res.status(200).send({
            success:true,
            message:"All Product fetched successfully",
            products
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Get All Products',
            error
        })
    }
};

//get single product
export const getSingleProduuctController = async (req, res) => {
    try {
        //get product id
        const product = await productModel.findById(req.params.id);
        //validation
        if(!product){
            return res.status(404).send({
                success: false,
                message: 'Product Not Found',
            });
        }
        res.status(200).send({
            success: true,
            message: 'Product Found',
            product
        });
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
            message:'Error in Get Single Product API',
            error
        })
    }
};

//create product
export const createProductController = async (req, res) => {
    try{
    const { name, description, price, category, stock} = req.body
    //validation
    if(!name || !description || !price || !stock){
        return res.status(500).send({
            success: false,
            message: 'Please Provide all fields'
        })
    }
    if(!req.file){
        return res.status(500).send({
            success:false,
            message:'Please provide product images'
        });
    }
    const file = dataUri(req.file)
    const cdb = await cloudinary .v2.uploader.upload(file.content);
    const image = {
        public_id: cdb.public_id,
        url: cdb.secure_url
    }
    await productModel.create({
        name, description, price, category, stock, images:[image]
    })

    res.status(201).send({
        success:true,
        message: 'Product Created Successfully',
    })
    
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Create Product API',
            error
        })
    }
};
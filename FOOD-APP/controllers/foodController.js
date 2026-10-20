const foodModel = require("../models/foodModel");

//CREATE FOOD
const createFoodController = async (req, res) => {
    try{
            const {
                title, 
                description, 
                price, 
                imageUrl, 
                foodTags, 
                category, 
                code, 
                isAailable, 
                resturant, 
                rating 
            } = req.body;

            if(!title || !description || !price || !resturant){
                return res.status(500).send({
                    success:false,
                    message: 'Please provide all fields'
                })
            }
            const newFood = new foodModel({
                title, 
                description, 
                price, 
                imageUrl, 
                foodTags, 
                category, 
                code, 
                isAailable, 
                resturant, 
                rating 
            });
            await newFood.save()
            res.status(201).send({
                success:true,
                message:'New Food Item Created',
                newFood,
            })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in create Food API',
            error
        })
    }
};


const getAllFoodController = async (req, res) => {
    try{
        const getFoods = await foodModel.find({})
        if(!getFoods){
            return res.status(404).send({
                success:false,
                message:'No Food Available'
            })
        }
        res.status(200).send({
            success:true,
            totalCount:getFoods.length,
            getFoods
    });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in create Food API',
            error
        })
    }
}

const getFoodByIdController = async (req, res) => {
    try{
        const foodId = req.params.id;
        if(!foodId){
            return res.status(404).send({
                success:false,
                message:'Please Provide Food Id',
            })
        }
        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(404).send({ 
                success: false, 
                message: 'Food Not Found' 
            })
        }
        res.status(200).json({ success: true, food });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in create Food API',
            error
        })
    }
}

module.exports = { createFoodController, getAllFoodController, getFoodByIdController }
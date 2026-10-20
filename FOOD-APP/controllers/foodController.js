const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

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


const updateFoodController = async (req, res) => {
    try{
        const {foodId} = req.params
        const {title, 
            description, 
            price, 
            imageUrl, 
            foodTags, 
            category, 
            code, 
            isAailable, 
            resturant, 
            rating} = req.body
        const updateFood = await foodModel.findByIdAndUpdate(id, {   
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
        }, {new:true})
        if(!updateFood){
            return res.status(500).send({
                success:false,
                message:'No Food Found'
            });
        }
        res.status(200).send({
            success: true,
            message: "Food Updated Successfully"
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error To Update Food',
            error
        })
    }
}

const deleteFoodController = async (req, res) => {
    try{
        const foodId = req.params.id;
        if(!foodId){
            return res.status(404).send({
                success:false,
                message:'Please Provide Food Id',
            })
        }
        const FoodModel = await foodModel.findByIdAndDelete(foodId);
        res.status(200).send({
            success:true,
            message: "Food has been deleted",
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error To Delete Food',
            error
        })
    }
}

// PLACE ORDER
const placeOrderController = async (req, res) => {
    try{
const {cart } = req.body
if(!cart){
    return res.status(500).send({
        success:false,
        message: 'Please add food into cart'
    })
}
let total = 0;
cart.map((i) => {
    total += i.price
})
const newOrder = new orderModel({
    foods:cart,
    payment:total,
    buyer: req.body.id
})
await newOrder.save();
res.status(200).send({
    success:true,
    message: "Order has been Placed Successfully",
    newOrder,
});
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error To Place Order API',
            error
        })
    }
};

//CHANGE ORDER STATUS
const orderStatusController = async (req, res) => {
    try{
        const orderId = req.params.id
        if(!orderId){
            return res.status(404).send({
                success:false,
                message:"Please provide valid Order ID"
            });
        }
        const {status} = req.body
        const order = await orderModel.findByIdAndUpdate(orderId,{status},{new:true})
        res.status(200).send({
            success:true,
            message:"Order Status Updated"
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error To Order Status API',
            error
        })
    }
}

module.exports = { createFoodController, getAllFoodController, getFoodByIdController, updateFoodController, deleteFoodController, placeOrderController, orderStatusController }
import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";  

//Create category
export const createCategory = async (req, res) => {
    try{
        const { category } =  req.body
        //validation
        if(!category){
            res.status(404).send({
                success: false,
                message: 'Please Provide Category Name'
            });
        }
        await categoryModel.create({category})
        res.status(201).send({
            suceess: true,
            message: `${category} category created successfully`,
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error In Create'
        })
    }
}

export const  getAllCategoriesController = async (req, res) => {
    try{
        const categories = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: 'Categories Fetch Successfully',
            totalCat: categories.length,
            categories,
        })
    }catch(error){
        res.status(500).send({
            success: false,
            message: 'Error in Get all categories'
        })
    }
}

export const  deleteCategoriesController = async (req, res) => {
    try{
        const category = await categoryModel.findById(req.params.id);
        //validation
        if(!category){
            return res.status(404).send({
                success: false,
                message: 'Category Not Found'
            })
        }
        //Find Product with this Category
        const products = await productModel.find({category:category._id})
        //update product category
        for(let i=0; i < products.length; i++){
            const product = products[i]
            product.category = undefined
            await product.save()
        }
        //save
        await category.deleteOne();
        res.status(200).send({
            success:true,
            message: 'Category Deleted Successfully'
        })        
        res.status(200).send({
            success: true,
            message: 'Categories Deleted Successfully',
            categories,
        })
    }catch(error){
        res.status(500).send({
            success: false,
            message: 'Error in Delete category'
        })
    }
}

export const updateCategoryController = async (req, res) => {
    try{
        //find category
        const category = await categoryModel.findById(req.params.id);
        //validation
        if(!category){
            return res.status(404).send({
                success: false,
                message: 'Category Not Found'
            });
        }
        //get new cat name
        const {UpdatedCategory} = req.body;
        //find product with category id
        const products = await productModel.find({category: category._id});
        //update product category
        for(let i=0; i<products.length; i++){
            const product  = products[i];
            product.category = UpdatedCategory;
            await product.save();
        }
        //save
        await category.save();
    }catch(error){
        res.status(500).send({
            success: false,
            message: 'Error in update category'
        })
    }
}
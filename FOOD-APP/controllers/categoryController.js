const categoryModel = require("../models/categoryModel")

//CREATE CAT
const createCatController = async (req, res) =>  {
    try{
        const {title,imageUrl} = req.body
        //validation
         if(!title){
            return res.status(500).send({
                success:false,
                message:'Please Provide category Title or Image'
            }) 
         }
         const newCategory = new categoryModel({title, imageUrl})
         await newCategory.save()
         res.status(201).send({
            success:true,
            message:'category created',
            newCategory,
         })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error In Create Cat API',
            error
        })
    }
}

//GET ALL CATS
const getAllCats = async (req, res) => {
    try{
    const allCats = await categoryModel.find({})
    if(!allCats){
        return res.status(404).send({
            success:false,
            message:'No Category Available'
        })
    }
    res.status(200).send({
        success:true,
        totalCount:allCats.length,
        allCats
});
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error In Get All Categories',
            error
        })
    }
}


//DELETE CATEGORY BY ID
const deleteCategoryByIdController = async (req, res) => {
    try{
    const catId = req.params.id;
    if(!catId){
        return res.status(404).send({
            success:false,
            message:'Please Provide Category Id',
        })
    }
    const categoryModel = await categoryModel.findByIdAndDelete(catId);
    res.status(200).send({
        success:true,
        message: "Category has been deleted",
    });
  }catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error To Delete Category',
        error
    })
  }
}

const updateCategoryByIdController = async (req, res) => {
    try{
    const {cateId} = req.params
    const {title, imageUrl} = req.body
    const updateCategory = await categoryModel.findByIdAndUpdate(id, {title, imageUrl}, {new:true})
    if(!updateCategory){
        return res.status(500).send({
            success:false,
            message:'No Category Found'
        });
    }
    res.status(200).send({
        success: true,
        message: "Category Updated Successfully"
    });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error To Update Category',
            error
        })
    }
}

module.exports = { createCatController, getAllCats, deleteCategoryByIdController, updateCategoryByIdController }
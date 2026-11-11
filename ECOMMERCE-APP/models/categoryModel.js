import mongoose  from "mongoose";

const categorySchema = new mongoose.Schema({
    category:{
        type:String,
        required:[true, 'Category name is Required']
    },
},{timestamps: true}
)

export const categorySchema = mongoose.model("Category", categorySchema);
export default categorySchema;
import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import { connect } from 'mongoose';
import connectDB from './config/db.js';
import userRoutes  from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cloudinary from 'cloudinary';

//dot env config
dotenv.config();


//database connection
connectDB();

//cloudinary connection
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

//PORT
const PORT = process.env.PORT || 9090;

//rest object
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);

//Route
app.get('/test',(req, res) => {
    return res.status(200).send("<h2>Hello</h2>");
});

//listen    
app.listen(PORT, () => {
    console.log(`Server Running on PORT ${process.env.PORT}`.bgGreen.bgYellow);
});
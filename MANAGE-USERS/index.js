const express = require("express");
const app = express();
const fs = require("fs");
const mongoose = require("mongoose");
const users = require("./MOCK_DATA.json");
const { type, loadavg } = require("os");
const console = require("console");
const userRouter = require('./routes/user');
const {connectMongoDb} = require("./connection");
const { logReqRes } = require("./routes/user");

const PORT = 8000;
connectMongoDb("mongodb://127.0.0.1:27017/nodejs-practice-pro");

// connection
//mongoose.connect("mongodb://127.0.0.1:27017/nodejs-practice-pro")
//.then(() => console.log("Mongodb connected"))
//.catch((err) => console.log("Mongo Error"))


// schema
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String
    },
},{timestamps : true});

const User = mongoose.model("user", userSchema);

//Middleware
app.use(logReqRes("log.txt"));



/*
app.use((req, res, next) => {
    return res.json({msg: "Hello from mid 1"});
    next();
})


app.use((req, res, next) => {
    return res.json({msg: "Hello from mid 2"});
    return res.end("Hello");
})
*/




//Routes
app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Server Started at PORT : ${PORT}`));
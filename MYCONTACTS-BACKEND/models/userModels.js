const mongoose = require("mongoose");
const usertSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the user name"],
    },
    email: {
        type: String,
        required: [true, "Please add the user email address"],
        unique: [true, "Email address already taken"],
    },
    password: {
        type: String,
        required: [true, "Please ass the user Password"],
    }
},{
    timestamps: true,
}
);

module.exports = mongoose.model("User", usertSchema);
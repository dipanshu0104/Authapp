const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/authapp")

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    verified: { 
        type: Boolean,
         default: false 
        },
});

module.exports = mongoose.model("user", userSchema);

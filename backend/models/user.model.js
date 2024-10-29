const mongoose = require("mongoose");
const Schema=mongoose.Schema

const userSchema = new Schema({
    username:String,
    email:String,
    password: String,
    createdOn: {            
        type: Date,         
        default: Date.now
    }
});


module.exports =  mongoose.model("User", userSchema);

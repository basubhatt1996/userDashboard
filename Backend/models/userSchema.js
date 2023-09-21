const mongoose = require("mongoose");
const validator = require("validator");

const usersSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    lname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw Error("not valid email")
            }
        }
    },
    mobile: {
        type: Number,
        required: true,
       // minlength: 10,
        //maxlength: 10
    },
    address1:{
        type:String,
        required:true
    },
    address2:{
        type:String
    },
    country:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    zipCode:{
        type:Number,
        required:true,
        minlength:6,
        maxlength:6
    }

});


const users = new mongoose.model("users",usersSchema);

module.exports = users;
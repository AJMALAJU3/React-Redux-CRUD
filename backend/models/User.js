const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    isAdmin:{
        type:String,
        default:false
    },
    phone:Number,
    image:String
})

const  UserModel = mongoose.model("users",UserSchema)

module.exports = UserModel
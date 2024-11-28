const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: {
      type:String,
      required:true
    },
    email: {
      type:String,
      required:true,
      unique:true
    },
    password: {
      type:String,
      required:true,
    },
    dob: {
      type:Date,
      required:false
    },
    address:{
      type:String,
      required:false
    },
    photo:{
      type:JSON,
      required:false
    },
    OTP:{
      type:String,
      required:true
    }
  },{versionKey:false,timestamps:true}
)
module.exports = mongoose.model('user',userSchema)
//auto create 'user' file in mongoDB
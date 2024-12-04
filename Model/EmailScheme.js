const mongoose  = require('mongoose')

const userMailSchema = new mongoose.Schema({
  to:{
    type:[{email:{type:String,required:true}}],required:true
  },
  subject:{
    type:String,required:true
  },
  maggage:{
    type:String,
    required:true
  }
},{versionKey:false,timestamps:true})

module.exports = mongoose.model('mail',userMailSchema)
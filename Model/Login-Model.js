const mongoose = require('mongoose')

const loginScheme = new mongoose.Schema({
  count:{
    type: Number,
    // default:0
   },
   user_id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'user',
      require:true
   }
   
},{versionKey:false,timestamps:true})

module.exports = mongoose.model('loginDeatials',loginScheme)
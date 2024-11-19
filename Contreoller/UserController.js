//request reponce and logic
const userModel = require('../Model/userModel')

// exports.createUser = async(req,res) => {
//   const data = req.body
//   const user = new userModel(daat)
// }

exports.createUser = async (req,res) =>{
  console.log(">>>>>>> req body >>>>>>>",req.body)
  const {email} = req.body
  const user = req.body;
  const match = await userModel.findOne({email})
  if(match){
    return res.status(200).json({Error:"user already exists"})
  }
  const userData = new userModel(user)
  await userData.save()
  res.status(200).json(userData)
}

exports.getAlluser = async(req,res) =>{
  const user = await userModel.find()
  if(!user){
    return res.status(404).json({Error:"user not found"});
    }
  res.status(200).json(user)
}

// exports.update = async(req,res) =>{
//   const id = req.params.id
//   const user = req.body
//   const userData = await userModel.findByIdAndUpdate(id,user,{new:true})
//   res.status(200).json(userData)
// }

exports.updateuser = async(req,res) => {
  const {id} = req.body
  const userData = req.body
  const user = await userModel.findByIdAndUpdate(id,userData)
  res.status(200).json(user)
}


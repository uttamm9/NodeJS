//request reponce and logic
const userModel = require('../Model/userModel')

// exports.createUser = async(req,res) => {
//   const data = req.body
//   const user = new userModel(daat)
// }

exports.createUser = async (req,res) =>{
  console.log(">>>>>>> req body >>>>>>>",req.body)
  const user = req.body;
  const userData = new userModel(user)
  await userData.save()
  res.status(200).json(userData)
}

exports.getAlluser = async(req,res) =>{
  const user = await userModel.find()
  res.status(200).json(user)
}

exports.update = async(req,res) =>{
  const id = req.params.id
  const user = req.body
  const userData = await userModel.findByIdAndUpdate(id,user,{new:true})
  res.status(200).json(userData)
}
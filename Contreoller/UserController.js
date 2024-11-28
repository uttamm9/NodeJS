//request reponce and logic
const userModel = require('../Model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const secretkey = 'r4735hhg9rb495g7hrg4g45g'
const {Fileupload} = require('../utility/cloudinaryService');
const fileUpload = require('express-fileupload');

// exports.createUser = async(req,res) => {
//   const data = req.body
//   const user = new userModel(daat)
// }

const  Gen_OTP = ()=>{
  const otp = Math.floor(100000 + Math.random()*900000).toString()
  return otp;
} 



exports.createUser = async (req,res) =>{
  
  try{
    // console.log('>>>>>file>>>',req.files)
  // console.log('>>>>>>body>>>',req.body)
  // console.log('...file data>>>',req.files.photo.data)
  const fileupload = await Fileupload(req.files)
  
  // console.log('>>>Fileupload>>>',fileupload[0].url);
  const randomOTP = await Gen_OTP();
  console.log('>>>>>>OTP>>>>',randomOTP);
 
    // console.log(">>>>>>> req body >>>>>>>",req.body)
  const {email,name,password,dpb,address} = req.body
  if(!(email&&name&&password)){
    return res.status(404).json({massage:"all feild are requred"})
  }
  const user = req.body;
  const userEmail = await userModel.findOne({email})
  if(userEmail){
    return res.status(200).json({Error:"user already exists"})
  }

  const salt = bcrypt.genSaltSync(10)
  console.log('>>>>>>>>>salt>>>>>',salt)
  const hashPass = bcrypt.hashSync(password,salt)
  console.log('>>>>>>>>>hashPass>>>>>',hashPass)

  const data = {
    name,
    email,
    password:hashPass,
    address,
    photo:fileupload[0].url,
    OTP:Gen_OTP()
  }

  const userData = new userModel(data)
  await userData.save()
  res.status(200).json(userData)
  }
  catch(err){
    return res.status(500).json({Error:"Internal server Error"})
  }
}

exports.userLogin = async(req,res) =>{
  const {email,password} = req.body
  const userEmail = await userModel.findOne({email})
  if(!userEmail){
    return res.status(404).json({message:"please sign ip"})
    }
    const isMatch = bcrypt.compareSync(password, userEmail.password)
    if(!isMatch){
      return res.status(404).json({massage:"password is wrong"})
    }
    const token = jwt.sign({id:userEmail._id},secretkey,{expiresIn:'1h'}

    )
    console.log('>>>>>token>>>>',token)
    return res.status(200).json({token,maggese:"login succesfully"})
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

exports.singledetail = async(req,res) =>{
  const {email} = req.body
  const user = await userModel.findOne({email:email})
  console.log(user)
  if(!user){
    return res.status(404).json({Error:"user not found"});
    }
  res.status(200).json(user)
}

exports.deleteOne = async(req,res)=>{
  const{id} =req.params
  const user = await userModel.findByIdAndDelete(id)
  res.status(200).json(user)
}
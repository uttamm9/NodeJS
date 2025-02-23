//request reponce and logic
const userModel = require('../Model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const secretkey = 'r4735hhg9rb495g7hrg4g45g'
const {Fileupload} = require('../utility/cloudinaryService');
const nodemailer = require('nodemailer')
const os = require('os')

const moment = require('moment');

const LoginModel = require('../Model/Login-Model');

// exports.createUser = async(req,res) => {
//   const data = req.body
//   const user = new userModel(daat)
// }

const  Gen_OTP = async ()=>{
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
    const expireOTP = moment().add(1,"minutes")

  console.log('>>>>>>OTP>>>>',randomOTP);
 
    // console.log(">>>>>>> req body >>>>>>>",req.body)
  const {email,name,password,dob,address} = req.body
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

  const Data = {
    name,
    email,
    password:hashPass,
    address,
    photo:fileupload[0].url,
    OTP: randomOTP,
    OTPexpire:expireOTP
  };

  const userData = new userModel(Data);
  console.log('...>>>>userdata....',userData);
    await userData.save();

    res.status(200).json(userData)
  }
  catch(err){
    return res.status(500).json({Error:"Internal server Error"})
  }
}

exports.userLogin = async(req,res) =>{

  const {email,password,OTP} = req.body
  const userEmail = await userModel.findOne({email})
  // console.log('<<<<<<req.socket>>',req.socket.remoteAddress)
  // console.log(os.hostname()) // ramsetu

  if(!userEmail){ 
    return res.status(404).json({message:"please sign up"})
    }
    const isMatch = bcrypt.compareSync(password, userEmail.password)
    if(!isMatch){
      return res.status(404).json({massage:"password is wrong"})
    }

    // const isexpire = userEmail.OTPexpire
    // const verifyTime = moment().isAfter(isexpire) // if expired return true
    // if(verifyTime){
    //   return res.status(400).json({massage:'otp has Expired'})
    // }
    if(OTP!=userEmail.OTP){
      return res.status(400).json({massage:'invalid OTP'})
    }
    // if(OTP == userEmail.OTP){
    //   userEmail.OTP = undefined;
    //   await userEmail.save()
    // }
    const token = jwt.sign({id:userEmail._id},secretkey,{expiresIn:'1h'}

    )
    const logindetails = {
      count:1,
      user_id:userEmail._id
    }

    // console.log('>>>>>token>>>>',token)
    const loginUser = new LoginModel(logindetails)
    await loginUser.save()
    return res.status(200).json({token,maggese:"login succesfully"})
  }

exports.getAlluser = async(req,res) =>{
  const user = await LoginModel.find().populate('user_id')
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

exports.sendMail = async(req,res)=>{
  try {
    const {to,massage,subject} = req.body;
    if(!(to&&massage&&subject)){
      return res.status(400).json({massage:'All feild required'})
    }
    const transporter = nodemailer.createTransport({
      
      host : 'smtp.gmail.com',
      port:587,
      auth:{
        user:'uttamftspl@gmail.com',
        pass:'wlxj plim jsij fvzv'
      }
    });
        const mailOptions = {
          from: "uttamftspl@gmail.com",
          to: to,
          subject: subject,
          text: massage,
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            dd;
            console.log("Error:", error);
          } else {
            console.log("Email sent:", info.response);
            return res.status(200).json({massage:'mail sent sussecfully'})
          }
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "interval server error" });
      }
    };
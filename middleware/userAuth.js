const jwt = require('jsonwebtoken');
const userModel = require('../Model/userModel');
const secretkey = 'r4735hhg9rb495g7hrg4g45g'

module.exports = async(req,res,next)=>{
  try {
    const token = req.headers?.authorization;
    console.log('>>>>>token>>>>',token)
    if(!token){
      return res.status(401).json({massage:"No token provided"});
    }
    const splitToken = token.split(" ")[1] // 1 index
    //splitToken => get only token remove berier word
    const decode = jwt.verify(splitToken,secretkey)
    if(!decode){
      return res.status(401).json({massage:'invalid token'});
    }
    console.log(">>>>>>decode>>>>",decode)
    const user = await userModel.findById(decode.id);
    // req.user = user;
    console.log(">>>>>>decode>>>>",user)
    if(!user){
      return res.status(401).json({massage:'user not found'})

    }

    next() //run API

  } catch (error) {
    res.status(400).send('Invalid token');
  }
}
const cloudinary = require('cloudinary')


require("dotenv").config()

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:  process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


exports.Fileupload = (data) =>{
  const fileArray = Object.values(data)
  console.log('>>>>>>fileArray>>>', fileArray)

  for(file of fileArray){
    const result = cloudinary.v2.uploader.upload( )
    // console.log('>>>>>result>>>>',result)
  }

}


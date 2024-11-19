const express = require('express')
const mongoose = require('mongoose')
require("dotenv").config();

const app = express()
const PORT =  6000

app.use(express.json());
app.use(express.urlencoded({extended:true}))

const userRouter = require('./Route/UserRoute')
app.use('/abc',userRouter)


mongoose.connect(process.env.mongo_url)
.then(()=>{
  console.log('connect to mongo')
}).catch((error)=>{
  console.log('Error in conectiong', error)
})



//findAll
// app.get('/findAll',async(req,res) =>{
//   console.log('>>>>>req>>>>',req)
//   const mysalesdata = await salesdata.find()
//   res.status(200).json(mysalesdata);
// }) // search   http://localhost:8080/findAll

// //findByID
// app.get('/getOne/:id',async(req,res) =>{
//   console.log(req.params);
//   const {id} = req.params
//   const mySalesdata = await salesdata.findById(id)
//   if(!mySalesdata){
//     return res.status(404).json({error:'Record not found'});
//   }
//   res.status(200).json(mySalesdata);
// })  // http://localhost:8080/getOne/672c5732830c4eee8e86b01e

// //Delete
// app.get('/deleteOne/:id',async(req,res)=>{
//   console.log(">>>>>req>>>>>", req.params);
//   const {id} = req.params
//   const deleteData = await salesdata.findByIdAndDelete(id)
//   if(!deleteData){
//     return res.status(404).json({error:"Data not found"})
//   }
//   res.status(200).json({massege:"Data delete sussecfully"})
// }) // http://localhost:8080/deleteOne/672c5732830c4eee8e86b01e

// //find by Ammount
// app.get('/amount/:amt',async(req,res)=>{
//   const {amt} = req.params
//   const amountdata = await salesdata.findOne({amount:parseInt(amt)})
//   if(!amountdata){
//     return res.status(404).json({error:'data not found'})
//   }
//   res.status(200).json(amountdata)
// }) //http://localhost:8080/amount/120

// //find by quantity
// app.get('/quantity/:qnt',async(req,res) =>{
//   const {qnt} = req.params
//   const qntData = await salesdata.findOne({quantity:parseInt(qnt)})
//   if(!qntData){
//     return res.status(404).json({error: "data not fount"})
//   }
//   res.status(200).json(qntData)
// }) //http://localhost:8080/quantity/2

app.listen(PORT,()=>{ //On which port we want to run, (express funtion)
  console.log(`server is running on port ${PORT}`);
})
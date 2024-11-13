const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 8080; // free port for system

const mongo_url = 'mongodb://localhost:27017/batch'

mongoose.connect(mongo_url)
.then(()=>{
  console.log('connect to mongo', mongo_url)
}).catch((error)=>{
  console.log('Error in conectiong', error)
})

const sales = new mongoose.Schema({

}) // create
const salesdata = mongoose.model('sales',sales)

app.get('/findAll',async(req,res) =>{
  const mysalesdata = await salesdata.find()
  res.status(200).json(mysalesdata);
})
 
app.listen(port,()=>{ //On which port we want to run, (express funtion)
  console.log(`server os running on port ${port}`)
})
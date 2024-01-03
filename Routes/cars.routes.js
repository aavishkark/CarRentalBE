const express=require('express')
const carRouter=express.Router()
const {carModel}=require("../Model/car.model")
const auth=require('../Middleware/auth.middleware')

carRouter.post('/addcar',async(req,res)=>{
    try{
        const car=new carModel(req.body)
        await car.save()
        res.status(200).send({"msg":"A new car has been added"})
    }
    catch(err){
        res.status(400).send({"err":err})
    }
})
carRouter.get('/',async(req,res)=>{
    const query={}
    const sort={}
    query.city=req.headers.city
    try{
        if(req.headers.order && req.headers.order=="asc"){
            sort.pricePerDay='asc';
        }
        else if(req.headers.order && req.headers.order=="desc"){
            sort.pricePerDay='desc'
        }
        if(req.headers.type2){
            if(req.headers.type2!="ALL"){
                query.type2=req.headers.type2
            }
        }
        const cars=await carModel.find(query).sort(sort)
        res.status(200).send({"Cars":cars})
      }
      catch(err){
          res.status(400).send({"Error":err})
      }
})

carRouter.patch('/updatecar/:id',async(req,res)=>{
    const carid=req.params.id;
    const car=await carModel.findOne({_id:carid})
    console.log(car)
    try{
        if(car!=undefined){
            await carModel.findByIdAndUpdate(carid,req.body)
            res.status(200).send({"msg":`The car with ID: ${carid} has been updated`})
          }
          else{
            res.status(200).send({"msg":"Something Went Wrong"})
    }
}
    catch(err){
        res.status(400).send({"error":err})
    }
})
module.exports={
    carRouter
}
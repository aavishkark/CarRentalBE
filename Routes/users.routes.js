const { UserModel } = require("../Model/user.model")
const express=require('express')
const userRouter=express.Router()
const jwt=require("jsonwebtoken")
const bcrypt=require('bcrypt')
userRouter.post('/register',(req,res)=>{
    const {username,email,password,pastRides,city,activeRides,favourite}=req.body
    try{
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.status(200).send({"err":err})
            }
            else{
                const user=new UserModel({username:username,email:email,password:hash,pastRides:pastRides,city:city,activeRides:activeRides,favourite:favourite})
                await user.save()
                res.status(200).send({"msg":"A user has been registered"})
            }
        })
    }
    catch(err){
        console.log(err)
       res.status(400).send({"err":err})
    }
})
userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await UserModel.findOne({email})
        bcrypt.compare(password,user.password,(err,result)=>{
            if(result){
                const token=jwt.sign({username:user.username,userid:user.id},"masai")
                res.status(200).send({"msg":"Login Successfull","token":token,"user":user})
            }
            else{
                res.status(200).send({"msg":"wrong Credentials"})
            }
        })
    }
    catch(err){
        res.status(400).send({"err":err})
    }
})
userRouter.patch('/update/:id',async(req,res)=>{
  const userid=req.params
  try{
    const user=await UserModel.findOne({_id:userid})
   if(user!=undefined){
    await UserModel.findByIdAndUpdate(userid,req.body)
    res.status(200).send({"msg":`The user with ID: ${userid} has been updated`})
   }
   else{
    res.status(200).send({"msg":"User not found"})
   }
  }
  catch{
    res.status(400).send({"error":err})
  }
})
userRouter.get('/singleuser/:id',async(req,res)=>{
    const userid=req.params.id
    try{
        const user=await UserModel.findOne({_id:userid})
       if(user!=undefined){
        res.status(200).send({"user":user})
       }
       else{
        res.status(200).send({"msg":"You are not authorized"})
       }
      }
      catch(err){
        res.status(400).send({"error":err})
      }
})
module.exports={userRouter}
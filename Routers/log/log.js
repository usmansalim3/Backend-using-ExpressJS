const express=require('express');
const userCollection = require('../../models/user');
const router=express.Router();
require('dotenv').config()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const client=require("twilio")(process.env.SID,process.env.TOKEN)
const chatCollection = require('../../models/user');


function generateOTP() {
          
    // Declare a digits variable 
    // which stores all digits
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}
router.post('/check',(req,res)=>{
    const{email,password,phoneNumber}=req.body;
    console.log({user,email,phoneNumber});
})
router.post('/login',async (req,res,next)=>{
    const{email,password}=req.body;
    const record=await userCollection.findOne({email})
    if(!record){
        res.status(401).json({error:'email not registered'});
        return;
    }
    const userPassword=record.password;
    const pfp=record.pfp
    const passwordMatch=await bcrypt.compare(password,userPassword);
    if(passwordMatch){
        const accessToken=jwt.sign({email,userID:record._id.toString()},'secret key');
        res.json({email,accessToken,userID:record.id,userpic:pfp});
    }else{
        res.status(401).json({error:'Incorrect password'});
    }
})

router.post('/register', async (req,res)=>{
    const {email,password,phoneNumber,pfp}=req.body;
    const record=await userCollection.find({email})
    if(record.length){
        res.status(401).json({error:"Email already registered"});
    }else{
        const hashedPassword=await bcrypt.hash(password,10);
        const response= await userCollection.create({email,password:hashedPassword,phoneNumber,pfp});
        const token=jwt.sign({email,userID:response._id.toString()},'secret key');
        res.json({email,token,userID:response.id,userpic:pfp});
    }
})


router.post("/forgotPassword",async(req,res)=>{
    const{email}=req.body;
    const response=await userCollection.findOne({email});
    if(!response){
        res.status(401).json({error:"Email isn't registered"})
        return
    }
    const otp=generateOTP().toString();
    await userCollection.findByIdAndUpdate(response.id,{otp})
    await client.messages.create({
        body:otp,
        from:"+15673501298",
        to:"+91"+response.phoneNumber
    })
    res.json({otp});
    
})
router.post("/invalidateOTP",async(req,res)=>{
    const{email}=req.body;
    await userCollection.findOneAndUpdate({email},{$unset:{otp:""}})
    res.json({success:'success'})

})
router.post("/verifyOTP",async(req,res)=>{
    const{otp,email}=req.body;
    const response=await userCollection.findOne({email});
    
    if(response.otp==parseInt(otp)){
        res.json({success:"success"})
    }else{
        res.status(401).json({error:"Wrong OTP"})
        return;
    }
})
router.post("/changePassword",async(req,res)=>{
    const{newPassword,email}=req.body;
    const hashedPassword=await bcrypt.hash(newPassword,10);
    await userCollection.findOneAndUpdate({email},{password:hashedPassword,$unset:{otp:""}});
    res.json({success:"success"})

})
router.get('/logout',(req,res)=>{
    res.send('logged out')
})

module.exports=router;
const express=require('express');
const userCollection = require('../../models/user');
const router=express.Router();
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const chatCollection = require('../../models/user');


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

router.get('/logout',(req,res)=>{
    res.send('logged out')
})

module.exports=router;
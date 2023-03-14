const express=require('express')
const jwt=require('jsonwebtoken')
const {Configuration,OpenAIApi}=require('openai');
const userCollection = require('../models/user');
const chatCollection = require('../models/user');
const router=express.Router();
require('dotenv').config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY
});
const openai = new OpenAIApi(configuration);



async function auth(req,res,next){
    const authHeader=req.headers.authorization;
    if(authHeader){
        const token=authHeader.split(' ')[1];
        console.log(token)
        jwt.verify(token,'secret key',(error,user)=>{
            if(error){
                console.log(error)
                 res.status(401).json({error:'error'})
                 return
            }else{
                console.log(user)
                req.email=user.email;
                req.userID=user.userID;
                next();
            }
        });
    }else{
        res.status(401).json({error:"Not authorized"})
        return;
    }
}

router.post('/todos',auth,async(req,res)=>{
    const prompt=req.body.prompt;
    try{
        const response = await openai.createImage({
            prompt,
            n:4,
            size: "1024x1024",
            response_format:'b64_json'
          });
          console.log(response.data)
          res.json({json:response.data.data});
    }catch(error){
        console.log(error.response)
        res.status(401).json({error:"Couldn't generate try changing the prompt"})
    }
});
router.post('/UploadImage',auth,async(req,res)=>{
    const{image,userID,prompt,time}=req.body;
    const docu=await userCollection.findById(userID)
    console.log(docu.images.length)
    if(docu.images.length==3){
        res.status(401).json({error:"Max limit reached"})
        return
    };
    console.log('uploading')
    try{
        await userCollection.findByIdAndUpdate(userID,{$push:{images:{image,prompt,time}}});
        res.json({status:'done'})
    }catch(error){
        console.log('error')
        console.log(error)
    }
})
router.post('/DeleteImage',auth,async(req,res)=>{
    const{image,userID,time}=req.body;
    console.log('deleting')
    try{
        await userCollection.findByIdAndUpdate(userID,{$pull:{images:{time}}});
        res.json({status:'done'})
    }catch(error){
        console.log('error')
        console.log(error)
    }
})
router.post('/getSavedImages',auth,async(req,res)=>{
    const{userID,prompt,time}=req.body;
    try{
        const userData=await userCollection.findById(userID);
        res.json({images:userData.images})
    }catch(error){
        console.log(error);
        res.status(401).json({status:'error'});
    }
})
router.post('/botChat',async (req,res)=>{
    const prompt=req.body.prompt
    console.log(prompt);
    try{
        const response=await openai.createCompletion({
            model:'text-davinci-003',
            prompt,
            max_tokens:100,
            temperature:0
        })
        res.json({response:response.data.choices[0].text.trim().replace('\n','').replace('?','')})
    }catch(error){
        console.log(error.response)
        res.status(200).json({response:"Sorry i cannot answer that"})
    }
})
router.post('/chat',async(req,res)=>{
    const chatObject=req.body.chat
    const userID=req.body.userID
    userCollection.findByIdAndUpdate(userID,{$push:{chat:chatObject[0]}})
})
router.post('/getChat',async(req,res)=>{
    const userID=req.body.userID;
    const chat=await userCollection.findById(userID)
    res.json({chat:chat.chat})
})
module.exports=router;
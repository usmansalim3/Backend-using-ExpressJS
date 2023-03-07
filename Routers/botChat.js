const express=require('express')
const {Configuration,OpenAIApi}=require('openai');
const userCollection = require('../models/user');
const chatCollection = require('../models/user');
const router=express.Router();

const configuration = new Configuration({
    apiKey: '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'
});
const openai = new OpenAIApi(configuration);

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
    }
})
router.post('/chat',async(req,res)=>{
    console.log('saving chats')
    const chatObject=req.body.chat
    const userID=req.body.userID
    await userCollection.findByIdAndUpdate(userID,{$push:{chat:chatObject[0]}})
    console.log('chats saved');
    res.status(200).json({done:'done'});
})
router.post('/getChat',async(req,res)=>{
    console.log('getting chats...')
    const userID=req.body.userID;
    const chat=await userCollection.findById(userID)
    console.log('chats done')
    res.json({chat:chat.chat})
})
module.exports=router;
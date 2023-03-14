const{ethers,toNumber}=require("ethers");
const { response } = require("express");
const express=require('express')
const router=express.Router();
const userCollection = require("../models/user");
const RPC="https://goerli.infura.io/v3/96008a68dd4149cf981965bfa53b4149";
const mainnetRPC="https://mainnet.infura.io/v3/96008a68dd4149cf981965bfa53b4149";
const provider= new ethers.JsonRpcProvider(RPC);



router.post("/isWalletConnected",async (req,res)=>{
    console.log("checking walled")
    const{userID}=req.body;
    const response=await userCollection.findById(userID);
    if(response.walletAddress){
        const bal=await provider.getBalance(response.walletAddress);
        res.json({connected:true,walletAddress:response.walletAddress,walletPrivateKey:response.walletPrivateKey,walletBalance:ethers.formatEther(bal)})
    }else{
        res.json({connected:false});
    }
})
router.post("/connectWallet",async (req,res)=>{
    const {privateKey,userID}=req.body
    console.log(privateKey)
    try{
        const wallet=new ethers.Wallet(privateKey,provider);
        const bal=await provider.getBalance(wallet.address);
        const response=await userCollection.findByIdAndUpdate(userID,{walletAddress:wallet.address,walletPrivateKey:privateKey,walletBalance:ethers.formatEther(bal)})
        res.json({success:"true",walletAddress:wallet.address,walletPrivateKey:privateKey,walletBalance:ethers.formatEther(bal)});
    }catch(e){
        console.log(e);
        res.status(401).json({error:"Make sure you've entered a valid private key or try again later"})
    }
})
router.post("/showBalance",async(req,res)=>{
    const{address}=req.body;
    const response=await provider.getBalance(address);
    res.json({balance:ethers.formatEther(response)});
})
router.post("/transfer",async(req,res)=>{
    const{address,amount,walletPrivateKey,userID}=req.body;
    const myWallet=new ethers.Wallet(walletPrivateKey,provider);
    try{
        const tx=await myWallet.sendTransaction({
            to:address,
            value:ethers.parseEther(amount)
        })
        await tx.wait();
        await userCollection.findByIdAndUpdate(userID,{$push:{transactions:{from:myWallet.address,to:address,amount:amount,time:Date.now(),hash:tx.hash}}})
        const walletBalance=await provider.getBalance(myWallet.address);
        console.log(tx);
        res.json({tx,walletBalance:ethers.formatEther(walletBalance)});
    }catch(e){
        console.log(e);
        res.status(401).json({error:"Some error occured check address or try again later"});
    }
})
router.post("/transactions",async(req,res)=>{
    const{userID}=req.body;
    console.log(userID)
    try{
        const data=await userCollection.findById(userID)
         console.log(data)
        const txs=data.transactions;
        res.json({tx:txs});
    }catch(e){
        console.log(e);
        res.status(401).json({error:"some error occured"});
    }

})
router.post("/disconnectWallet",async(req,res)=>{
    const{userID}=req.body;
    try{
        await userCollection.findByIdAndUpdate(userID,{walletAddress:"",walletPrivateKey:""});
        res.json({success:"true"});
    }catch(e){
        console.log(e);
    }
})
module.exports=router;
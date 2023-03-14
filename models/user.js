const mongoose= require('mongoose');


const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    chat:Array,
    images:Array,
    pfp:String,
    walletAddress:String,
    walletPrivateKey:String,
    transactions:Array,
    otp:Number
},{timestamps:true});
const userCollection= mongoose.model('user',userSchema);
module.exports=userCollection;
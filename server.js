const express=require('express');
const connect = require('./db');
const routerLog = require('./Routers/log/log');
const routerTodo = require('./Routers/todo');
const botRouter= require('./Routers/botChat');
const ethRouter=require("./Routers/Ethereum")
const app=express();


connect();
app.use(express.json({limit: '50mb'}));
app.use('/users',routerLog);
app.use('/todo',routerTodo);
app.use('/bot',botRouter);
app.use('/ethereum',ethRouter);
app.get('/',(req,res)=>{
    res.json({connected:true});
})



app.listen(4000,()=>console.log('Server is up'));
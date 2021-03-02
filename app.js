const express = require('express');
const app = express();
const connection = require('./connection/connect');
const config = require('./config/dev');
const redis = require('redis');

//creating client for redis
let client = redis.createClient();
//creating a server
client.on("connect",()=> console.log("connection succesful"));
//to store a string in redis
client.set("company","Apptunix",(err,stu)=>{
    if(err) console.log(err);
    else console.log(stu);
})
// get method returns the value of key 'company'
client.get("company",(err,stu)=>{
    if(err) console.log(err);
    else console.log(stu);
})
// client.hset("apptunixxxxxxx",{pos:"deve",tech:"node"})
//to store objects
client.hmset("Apptunix",{pos:"developer",tech:"node.js"})
client.hmset("key","foo","bar","pos","developer")
//hgetall method is used to get all values of the key
client.hgetall("Apptunix",(err,stu)=>{
    if(err) console.log(err);
    else console.log(stu);
})
client.hgetall("key",(err,stu)=>{
    if(err) console.log(err);
    else console.log(stu);
})

app.use(express.static('uploads'));
app.use(express.json());

const index = require('./routes/index');
app.use('/user',index.userRouterIndex.userRouter);
app.use('/vendor',index.vendorRouterIndex.vendorRouter);

connection.connect();
app.listen(config.port,()=>console.log(`server up and running on ${config.port}`));

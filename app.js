const express = require('express');
const app = express();
const connection = require('./connection/connect');
const config = require('./config/dev')

app.use(express.static('uploads'));
app.use(express.json())

const index = require('./routes/index');
app.use('/user',index.userRouter.userRouter);
app.use('/vendor',index.vendorRouter.vendorRouter);

connection.connect();
app.listen(config.port,()=>console.log(`server up and running on ${config.port}`))
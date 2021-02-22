const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connection = require('./connection/connect');
const multer = require('multer');
const mWare = require('./middlewares/auth');
const Services = require('./Services/index');
const cors = require('cors');
app.use(cors());

let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/');
    },
    filename: (req,file,cb)=>{
        cb(null, file.originalname);
    }
});
let maxSize = 50*1000;
let upload = multer({storage:storage, limits:{fileSize: maxSize}})
app.use(express.static('uploads'));
const port = 8081;
app.use(express.json())
//user
app.get('/profileUser',mWare.authenticateToken,Services.userAPI.profileUser);
app.post('/signupUser',upload.single('fileName'),Services.userAPI.signupUser);
app.post('/loginUser',Services.userAPI.loginUser);
app.post('/updateUser',mWare.authenticateToken,Services.userAPI.updateUser);
app.post('/placeOrder',mWare.authenticateToken,Services.userAPI.placeOrder)
//vendor
app.get('/profileVendor',mWare.authenticateToken,Services.vendorAPI.profileVendor);
app.post('/registerVendor',Services.vendorAPI.registerVendor);
app.post('/loginVendor',Services.vendorAPI.loginVendor);
app.post('/updateVendor',mWare.authenticateToken,Services.vendorAPI.updateVendor);
app.post('/addCategory',mWare.authenticateToken,Services.vendorAPI.addCategory);
app.post('/addSubCategory',mWare.authenticateToken,Services.vendorAPI.addSubCategory);
app.post('/addProduct',mWare.authenticateToken,Services.vendorAPI.addProduct);
app.post('/getProduct',mWare.authenticateToken,Services.vendorAPI.getProduct);

connection.connect();
app.listen(port,()=>console.log(`server up and running on ${port}`))
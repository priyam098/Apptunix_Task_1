const config = require('../config/dev')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const valid = require('../validations/joiValidation')
const userSchema = require('../Models/index')
const mWare = require('../middlewares/auth');
const port = 8081;
const sendService = require('../mail/message')

const loginUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log('req.body:'+req.body);
    try {
        const result = await valid.joiValidLogin.validateAsync(req.body);
        if (!email || !password) res.json('enter correct details');//
        const existUser = await userSchema.userModel.findOne({ email: email })
        console.log(existUser);
        bcrypt.compare(password, existUser.password,function (err, isMatch) {
            if (!isMatch) {
                return res.status(400).json({
                    status: false,
                    message: 'password mismatch'
                })
            } else {
                const accessToken = jwt.sign({_id:existUser._id}, config.ACCESS_TOKEN_SECRET);
                return res.status(200).json({
                    accessToken : accessToken,
                    status: true,
                    message: 'login sucessful'
                })
            }
        })
    }
    catch (err) {
        console.log(err);
        res.send({ status: 400, message: "login failed" });
    }
};
const profileUser = async (req,res)=>{
    console.log("hello");
    console.log(req.dataObj._id);
    try{
    const result = await userSchema.userModel.findById({_id:req.dataObj._id}).lean()
    console.log(result.image);
    res.send({UserProfile:result,ProfilePic:`http://localhost:${port}/${result.image}`})
    }
    catch (err) {
        res.send(console.log(err));
    }
};
const signupUser = async (req, res) => {
    try {
        
        if(req.file){
            req.body.image = req.file.filename;
           }
        const dataObj = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            password: await bcrypt.hash(req.body.password, 10),
            email: req.body.email,
            phone: req.body.phone,
            image:req.body.image
        };
        console.log(dataObj);
        const result = await valid.joiValidSignUp.validateAsync(req.body);
        console.log("validation sucessfull");
        const existUser = await userSchema.userModel.findOne({email:dataObj.email})
        console.log('existing user:'+ existUser);
        if(!existUser){
        const dataAdded = await userSchema.userModel.create(dataObj);
        console.log(dataAdded);
        const accessToken = jwt.sign({_id : dataAdded._id},config.ACCESS_TOKEN_SECRET)
        res.send({accessToken:accessToken,status:200,message:"SignUp sucessful"});
        await sendService.sendEmail(dataObj)
        }
        else res.json({status:400,messagr:"EmailId already exist"});
    } catch (error) {
        console.log(error);
        res.send({status:400,message:"SignUp failed"});
    }
};
const updateUser = async (req, res) => {
    try {
        console.log(req.dataObj);
        const filter = req.dataObj._id;
        console.log(filter);
        const update1 = await userSchema.userModel.findOneAndUpdate({_id:filter}, req.body,{new:true},(err, employee) =>{
        if (err) {
            console.log(err);
            throw err;
        }
        else {
            res.send('record updated sucessfully ' + employee);
            console.log(employee);
        }
    })
       
    }
    catch (err) {
        console.log(err);
    }
};
const placeOrder = async (req,res)=>{
    try{
    console.log(req.dataObj);
    const okId = await userSchema.userModel.findOne({_id:req.dataObj._id})
    if(okId){
    const obj = {
        productId : req.body.productId,
        vendorId : req.body.vendorId,
        quantity : req.body.quantity,
        address : req.body.address
    }
    let product = await userSchema.productModel.findOne({_id : obj.productId});
    let price = product.price;
    req.body.totalPrice = obj.quantity*price;
    const orderStored = await userSchema.kartModel.create(req.body);
    res.send({status:200,message:"order added to kart successfully",order:req.body});
    }
    else{
        res.send('user does not exist');
    }
  }
  catch(err){
    res.send(err)
  } 
};
module.exports = {
    loginUser : loginUser,
    profileUser : profileUser,
    updateUser : updateUser,
    signupUser : signupUser,
    placeOrder : placeOrder
};

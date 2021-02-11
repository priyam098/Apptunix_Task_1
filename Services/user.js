const config = require('../config/dev')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const valid = require('../validations/joiValidation')
const userSchema = require('../Models/index')

const loginUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log('req.body:'+req.body);
    try {
        const result = await joiValidLogin.validateAsync(req.body);
        if (!email || !password) res.json('enter correct details');//
        const existUser = await userSchema.userModel.findOne({ email: email })
        console.log(existUser);
        bcrypt.compare(password, existUser.password, function (err, isMatch) {
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
    res.send({UserProfile:result,ProfilePic:`http://localhost:3000/${result.image}`})
    }
    catch (err) {
        res.send(console.log(err));
    }
};
const signupUser = async (req, res) => {
    try {
        const firstName = req.body.Fname;
        const lastName = req.body.Lname;
        const age = req.body.age;
        const password = await bcrypt.hash(req.body.password, 10);
        const email = req.body.email;
        const phone = req.body.phone;
        if(req.file){
            req.body.image = req.file.filename;
           }
        const dataObj = {
            Fname: Fname,
            Lname: Lname,
            age: age,
            password: password,
            email: email,
            phone: phone,
            image:req.body.image
        };
        console.log(dataObj);
        await valid.joiValidSignUp.validateAsync(req.body);
        console.log("validation sucessfull");
        const existUser = await userSchema.userModel.findOne({email:email})
        console.log('existing user:'+ existUser);
        if(!existUser){
        const dataAdded = await userSchema.userModel.create(dataObj);
        console.log(dataAdded);
        const accessToken = jwt.sign({_id : dataAdded._id},config.ACCESS_TOKEN_SECRET)
        res.send({accessToken:accessToken,status:200,message:"SignUp sucessful"});
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
}
const placeOrder = async (req,res)=>{
    
}
module.exports.signupUser = signupUser;
module.exports.loginUser = loginUser;
module.exports.profileUser = profileUser;
module.exports.updateUserUser = updateUser;
module.exports.placeOrder = placeOrder;
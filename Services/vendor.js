const bcrypt = require('bcryptjs');
const config = require('../config/dev');
const jwt = require('jsonwebtoken');
const valid = require('../validations/joiValidation');
const Schema = require('../Models/index');
const mongoose = require('mongoose');
const sendService = require('../mail/message')
const registerVendor = async (req, res) => {
    try {
        const dataObj = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            company: req.body.company,
            age: req.body.age,
            password: await bcrypt.hash(req.body.password, 10),
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
        };
        await valid.joiValidRegisterVendor.validateAsync(req.body);
        const existUser = await Schema.vendorModel.findOne({ email: dataObj.email })
        if (!existUser) {
            const dataAdded = await Schema.vendorModel.create(dataObj);
            const accessToken = jwt.sign({ _id: dataAdded._id }, config.ACCESS_TOKEN_SECRET)
            res.send({ accessToken: accessToken, status: 200, message: "SignUp sucessful" });
            await sendService.sendEmail(dataObj)
        }
        else res.json({ status: 400, messagr: "EmailId already exist" });
    } catch (error) {
        console.log(error);
        res.send({ status: 400, message: "SignUp failed" });
    }
};
const loginVendor = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log('req.body:' + req.body);
    try {
        const result = await valid.joiValidLogin.validateAsync(req.body);
        if (!email || !password) res.json('enter correct details');
        const existUser = await Schema.vendorModel.findOne({ email: email })
        console.log(existUser);
        bcrypt.compare(password, existUser.password, function (err, isMatch) {
            if (!isMatch) {
                return res.status(400).json({
                    status: false,
                    message: 'password mismatch'
                })
            } else {

                const accessToken = jwt.sign({ _id: existUser._id }, config.ACCESS_TOKEN_SECRET);
                return res.status(200).json({
                    accessToken: accessToken,
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
const updateVendor = async (req, res) => {
    try {
        console.log(req.dataObj);
        const filter = req.dataObj._id;
        console.log(filter);
        const update1 = await Schema.vendorModel.findOneAndUpdate({ _id: filter }, req.body, { new: true }, (err, employee) => {
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
const profileVendor = async (req, res) => {
    console.log("hello");
    console.log(req.dataObj._id);
    try {
        const result = await Schema.vendorModel.findById({ _id: req.dataObj._id }).lean()
        console.log(result.image);
        res.send({ UserProfile: result })
    }
    catch (err) {
        res.send(console.log(err));
    }
};
const addCategory = async (req, res) => {
    try {
        const vendorId = req.dataObj._id;
        const categoryName = req.body.name;
        const result = await Schema.categoryModel.find({ vendorId: vendorId, name: categoryName })
        if (result.length == 0) {
            const obj = {
                vendorId: vendorId,
                name: categoryName
            }
            console.log("data to be added:" + obj);
            const dataAdded = await Schema.categoryModel.create(obj)
            res.send({ status: 200, message: `category:${categoryName} for vendorId:${vendorId} added successfully` })
        }
        else {
            res.send(`Category: ${categoryName} already exist for the vendorId: ${vendorId}`)
        }
    }
    catch (err) {
        console.log(err);
        res.send(err)
    }
};
const addSubCategory = async (req, res) => {
    try {
        const vendorId = req.dataObj._id;
        const subcategoryName = req.body.name
        const categoryId = req.body.categoryId;
        const result = await Schema.subCategoryModel.find({ vendorId: vendorId, name: subcategoryName })
        if (result.length == 0) {
            const obj = {
                vendorId: vendorId,
                categoryId: categoryId,
                name: subcategoryName
            }
            const result = await Schema.subCategoryModel.create(obj);

            res.send({ status: 200, message: `Subcategory:"${subcategoryName}" added successfully under the vendorId:"${vendorId}"` })
        }
        else {
            res.send(`subCategory already present under vendorId:"${vendorId}"`)
        }
    }
    catch (err) {
        res.send(err);
    }
};
const addProduct = async (req, res) => {
    try {
        const obj = {
            vendorId: req.dataObj._id,
            categoryId: req.body.categoryId,
            subCategoryId: req.body.subCategoryId,
            name: req.body.name,
            price: req.body.price
        }
        console.log(obj);
        const result = await Schema.productModel.find({ vendorId: obj.vendorId, name: obj.name })
        // console.log(result);
        // if (!result) {
            await Schema.productModel.create(obj);
            res.send("product added");
        // }
        // else { res.send("Product already exist"); }
    }
    catch (err) {
        res.send(err);
    }
};
const getProduct = async (req, res) => {
    try {
        const okId = await Schema.vendorModel.findOne({ _id: req.dataObj._id })
        if (okId) {
            // let product = await Schema.categoryModel.findOne({name:req.body.name}).populate('subcategoryId')
            let product = await Schema.categoryModel.aggregate([{
                $lookup: {
                    from: "subcategories",
                    let: { categoryId: "$_id" },
                    pipeline: [{ $match: { $expr: { $eq: ["$$categoryId", "$categoryId"]}}},{
                        $lookup: {
                            from: "products",
                            let: { subCategoryId: "$_id" },
                            pipeline: [{ $match: { $expr: { $eq: ["$$subCategoryId", "$subCategoryId"] } } }],
                            as: "products"
                        }
                    }],
                    as: "subCategory"
                }
            }, { $unwind: "$subCategory" }])
            // let arr = [];
            // for(item of product)
            // {
            //     if(item.subCategory.products.length!=0)
            //     {
            //         arr.push(item);
            //     }
            // }
        //     const arr1 = product.forEach((cv)=>{
        //         if(cv.subCategory.products.length!=0)
        //         {
        //             arr1.push(cv)
        //         }
        // })
        // console.log("$$$$$$$$$$$$$$$$$",arr1);
            // const result = product.forEach((cv)=>{
            //     let productLen = cv.subCategory.products.length
            //     if(productLen != 0){
            //         console.log(cv);
            //         return cv 
            //     }
              
            // })
            res.send(product);
        }
        else {
            res.send("not authorised");
        }
    }
    catch (err) {
        res.send(err)
    }
};
// const getProduct = async(req,res)=>{
//     try{
//     const okId = await Schema.vendorModel.findOne({_id:req.dataObj._id})
//     if(okId){
//     const store = await Schema.productModel.find({   }).populate('categoryId', 'name vendorId').populate('subCategoryId', 'name').lean();
//     console.log('$$$$$$$$$$$', store);
//     res.send(store)
//     }
//     else
//     {
//         res.send("unauthorized")
//     }
//     }
//     catch(err){
//         res.send(err)
//     }
// }
module.exports = {
    registerVendor: registerVendor,
    loginVendor: loginVendor,
    updateVendor: updateVendor,
    profileVendor: profileVendor,
    addCategory: addCategory,
    addSubCategory: addSubCategory,
    addProduct: addProduct,
    getProduct: getProduct
}
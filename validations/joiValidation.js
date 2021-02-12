const joi = require('joi');
//user
const joiValidSignUp = joi.object({
    firstName: joi.string().min(3).required(),
    lastName: joi.string().min(3).required(),
    age: joi.required(),
    password: joi.string().min(4).required(),
    email: joi.string().email().lowercase().required(),
    image : joi.string()
});
const joiValidLogin = joi.object({
    password: joi.string().min(4).required(),
    email: joi.string().email().lowercase().required()
});
//vendor
const joiValidRegisterVendor = joi.object({
    firstName: joi.string().min(3).required(),
    lastName: joi.string().min(3).required(),
    age: joi.required(),
    password: joi.string().min(4).required(),
    email: joi.string().email().lowercase().required(),
    company: joi.string().min(3).required(),
    address: joi.string().min(3).required(),
    phone: joi.number().min(3).required(),
}) 
module.exports. joiValidLogin = joiValidLogin;
module.exports.joiValidSignUp = joiValidSignUp;
module.exports.joiValidRegisterVendor = joiValidRegisterVendor;
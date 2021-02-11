const joi = require('joi');

const joiValidSignUp = joi.object({
    Fname: joi.string().min(3).required(),
    Lname: joi.string().min(3).required(),
    age: joi.required(),
    password: joi.string().min(4).required(),
    email: joi.string().email().lowercase().required(),
    image : joi.string()
});
const joiValidLogin = joi.object({
    password: joi.string().min(4).required(),
    email: joi.string().email().lowercase().required()
});
module.exports. joiValidLogin = joiValidLogin;
module.exports.joiValidSignUp = joiValidSignUp;
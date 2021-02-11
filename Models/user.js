const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
const user = new Schema({
firstName:{
    type: String,
    required : true 
},
lastName:{
    type : String,
    required: true
},
email:{
    type: String,
    required : true 
},
password:{
    type: String,
    required: true
},
phone: {
    type:Number,
    required: false
},
date : {
    type : Date,
    required: false
},
age : {
    type : Number,
    required: true
},
image: {type: String}
});

module.exports = mongoose.model('user',user); 
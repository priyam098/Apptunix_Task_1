const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
const vendor = new Schema({
firstName:{
    type: String,
    required : true 
},
lastName:{
    type : String,
    required: true
},
company:{
    type: String,
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
date: {
    type : Date,
    required: false
},
address: {
    type : String,
    required: true
}
});

module.exports = mongoose.model('vendor',vendor); 
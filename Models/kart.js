const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const kart = new Schema({
    productId :{   
    type : Schema.ObjectId,
    ref: "product"
    },
    userId:{
    type : Schema.ObjectId,
    ref: "product"
    },
    vendorId: {
        type: Schema.ObjectId,
        ref: "vendor"
    },
    quantity:{
        type: Number,
        default: 1
    },
    totalPrice : {
        type: Number,
        default : null 
    },
    address : {
        type: String,
        default : null,
        required : true 
    }
})
module.exports = mongoose.model('kart',kart);  
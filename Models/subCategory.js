const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
const subCategory = new Schema({
    vendorId :{
        type: Schema.ObjectId,
        ref : "vendor"
    },
    categoryId :{
        type: Schema.ObjectId,
        ref : "category"
    },
    name: {
        type: String,
        default: null,
        required: true
    }
}, {
        timestamps: true,
        toObject: {virtuals: true},
        toJSON: {virtuals: true}
    });

module.exports = mongoose.model('subCategory',subCategory); 
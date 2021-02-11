const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
const product = new Schema({
    userId :{
        type : Schema.ObjectId,
        ref: "user"
    },
    vendorId :{
        type: Schema.ObjectId,
        ref : "vendor"
    },
    categoryId :{
        type: Schema.ObjectId,
        ref : "category"
    },
    subCategoryId :{
        type: this.schema.ObjectId,
        ref: "subCategory"
    },
    name: {
        type: String,
        default: null,
        required: true
    },
    price:{
        type: Number,
        default : null,
        required: true
    },
    discount:{
        type: Number,
        default:null,
        required: false
    }
}, {
        timestamps: true,
        toObject: {virtuals: true},
        toJSON: {virtuals: true}
    });

module.exports = mongoose.model('product',product); 
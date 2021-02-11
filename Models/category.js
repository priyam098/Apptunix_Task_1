const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
const category = new Schema({
    vendorId :{
        type: Schema.ObjectId,
        ref : "vendor"
    },
    name: {
        type: String,
        default: null,
        required: true
    },
}, {
        timestamps: true,
        toObject: {virtuals: true},
        toJSON: {virtuals: true}
    });

module.exports = mongoose.model('category',category); 
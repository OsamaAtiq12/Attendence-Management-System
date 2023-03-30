const mongoose = require('mongoose');

const Product =mongoose.Schema({
    Product_Name:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },

    Quantity:{
        type:Number,
        required:true
    },

})
const Products = mongoose.model('Product',Product);

module.exports=Products;
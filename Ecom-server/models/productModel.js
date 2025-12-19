const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    sale_price: Number,
    stock: Number,
    image: String,
    is_trending:{
        type:Boolean,
        default:false
    }
},{timestamps:true}) 

const productModel = mongoose.model('Product',ProductSchema)
module.exports = productModel

const mongoose = require('mongoose')
const reviewSchema = new mongoose.Schema({
    productId:mongoose.Schema.Types.ObjectId,
    userId:mongoose.Schema.Types.ObjectId,
    userName:String,
    reviewMessage:String,
    reviewValue:Number,
},{timestamps:true})

const reviewModel=mongoose.model('ProductReview',reviewSchema)
module.exports=reviewModel
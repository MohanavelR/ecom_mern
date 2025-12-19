const mongoose = require('mongoose')


const orderSchema=new mongoose.Schema({
    userId:mongoose.Schema.Types.ObjectId,
     cartId:mongoose.Schema.Types.ObjectId,
    cartItems:[
        {
            productId:mongoose.Schema.Types.ObjectId,
            title:String,
            image:String,
            price:String,
            sale_price:String,
            quantity:Number
        }
    ],
    addressInfo:{
        addressId:mongoose.Schema.Types.ObjectId,
        address:String,
        city:String,
        pincode:String,
        phone:String,
        notes:String,
        
    },
    orderStatus:String,
    paymentMethods:String,
    paymentStatus:String,
    totalAmount:Number,
    orderDate:Date,
    orderUpdateDate:Date,
    paymentId:String,
    payerId:String,

})
const orderModel=mongoose.model('Order',orderSchema)
module.exports=orderModel
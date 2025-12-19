const mongoose = require('mongoose')

const userAuthSchema = new mongoose.Schema({
    username:{
        required:true,
        type:String,
        unique:true
    },
    email:{
       required:true,
       type:String,
       unique:true
    },
      password:{
       required:true,
       type:String,
    },
    isSuperUser:{
        type:Boolean,
        default:false
    }
})
const userAuthModel = mongoose.model('user',userAuthSchema)

module.exports=userAuthModel
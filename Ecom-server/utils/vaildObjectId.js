const mongoose=require('mongoose')


const isValidObjectId =(userId)=>{
 return mongoose.Types.ObjectId.isValid(userId)
}
module.exports={isValidObjectId}
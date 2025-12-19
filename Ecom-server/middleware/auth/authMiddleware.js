const jwt = require('jsonwebtoken');

const authMiddleware = async(req,res,next)=>{
  const { token } = req.cookies;
  if (!token){
    return res.json({
        isSuccess:false,
        message:"You are not authorized to access this resource."})
  }
  try{
      const decoded= jwt.verify(token,'CLIENT_SECRET_KEY') ;
       req.user=decoded
       next()
  }
  catch(e){
     return res.json({
        isSuccess:false,
        message:e.message})
  }
  }
module.exports={
    authMiddleware
}

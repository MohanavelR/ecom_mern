const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const userAuthModel = require('../../models/userAuthModel');
// Register 
const register=async (req,res)=>{
    const {username,email,password}=req.body;
    try {
        const userEmail = await userAuthModel.findOne({email})
        if(userEmail){
             return res.json({
            isSuccess:false,
            message:"An account with this email already exists."
        })
        }
        const userUsername = await userAuthModel.findOne({username})
        if(userUsername){
             return res.json({
            isSuccess:false,
            message:"Sorry, that username is unavailable."
        })
        }
        const hashedPassword = await bcrypt.hash(password,12)
        const newUser =new userAuthModel({
            username:username,
            email:email,
            password:hashedPassword
        })
        await newUser.save()
        res.status(200).json({
            isSuccess:true,
            message:"Registration completed successfully."})
    } 
    catch (error) {
        res.json({
            isSuccess:false,
            message:error.message})
    }
}
// Login
const login=async (req,res)=>{
    const {email,password}=req.body;
    try {
        const user = await userAuthModel.findOne({email})
        if (!user){
            return res.json({
            isSuccess:false,
            message:"This email does not exist. Please register using this email."})
        }
        const isMatched = await bcrypt.compare(password,user.password)
        if(!isMatched){
            return res.json({
            isSuccess:false,
            message:"Invalid password. Please try again."})
        }
        const token=jwt.sign(
            {id:user._id,isSuperUser:user.isSuperUser,email:user.email,username:user.username},"CLIENT_SECRET_KEY",{expiresIn:"7d"})       
            await res.cookie('token',token,{
                        httpOnly:true,
                        secure: process.env.NODE_ENV=='production',
                        sameSite:process.env.NODE_ENV ==='production'? 'none' : 'strict',
                        maxAge : 7 * 24 * 60 * 60 * 1000})  
            
            res.json({
            isSuccess:true,
            message:"You have Logged in successfully",
            user:{
                username:user.username,
                email:user.email,
                isSuperUser:user.isSuperUser,
                id:user._id
            }
        }) 
    }
    catch (error) {
        
        res.json({
            isSuccess:false,
            message:error.message})
    }
}


// Logout

const logout=async(req,res)=>{
  res.clearCookie('token').json({
        isSuccess:true,
            message:"You have Logged out successfully"})
}

module.exports={register,login,logout}
const featureModel=require('../../models/featureModel')

const addFeatureImage = async(req,res)=>{
   try {
      const {image}=req.body;
      const newImage= new featureModel({image})
      await newImage.save()
      res.json({
        message:"Image Saved !",
        isSuccess:true
    })
   } catch (error) {
    res.json({
        message:"Some Error Occurred",
        isSuccess:false
    })
   }
}
const getFeatureImage = async(req,res)=>{
   try {
      const images=await featureModel.find({})
      res.json({
        message:"get Data",
        isSuccess:true,
        data:images
    })
   } catch (error) {
    res.json({
        message:"Some Error Occurred",
        isSuccess:false
    })
   }
}

module.exports={
    addFeatureImage,getFeatureImage
}
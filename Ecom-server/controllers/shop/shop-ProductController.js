
const productModel = require("../../models/productModel")
const mongoose = require('mongoose')

const getFilterProducts = async(req,res)=>{
    try {
        const {category=[],brand=[],sortBy="price-lower"}=req.query;
        let filters={}
        if(category.length){
            filters.category={$in:category.split(",")}
        }
        if(brand.length){
            filters.brand={$in:brand.split(",")}
        }
        let sort={}
        switch(sortBy){
            case 'price-lower':
                sort.price=1
                break
            case 'price-higher':
                sort.price=-1
                break
            case 'atoz':
                sort.title=1
                break
            case 'ztoa':
                sort.title=-1
                break
            default :
               sort.price=1
               break    
        }
        const products= await productModel.find(filters).sort(sort)
        res.json({
        isSuccess:true,
        filterProducts:products,
        message:"Product fetched Successfully "
       }) 
    } catch (error) {
       
       res.json({
        isSuccess:false,
        message:"An error occurred while processing your request."
       }) 
    }
}
const getProductDetails = async(req,res)=>{
    try {
   const { productId } = req.params;
           if (!mongoose.Types.ObjectId.isValid(productId)) {
               return res.status(400).json({
                   isSuccess: false,
                   message: "Invalid product ID format."
               });
           }
           const product = await productModel.findById(productId)
           if (!product) {
               return res.status(404).json({
                   isSuccess: false,
                   message: "Product not found."
               });
           }
           res.status(200).json({
               isSuccess: true,
               message: "Product get successfully.",
               product
           });
       } catch (error) {
           
           res.status(500).json({
               isSuccess: false,
               
               message: "An error occurred while processing your request.",
           });
       }
   }

module.exports={getFilterProducts,getProductDetails}
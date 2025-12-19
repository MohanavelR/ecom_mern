const { ImageUploadUtils } = require("../../helpers/cloudinary")
const productModel = require('../../models/productModel')
const mongoose = require('mongoose')
const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64')
        const url = "data:" + req.file.mimetype + ";base64," + b64
        const result = await ImageUploadUtils(url)
        res.json({
            isSuccess: true,
            result
        })
    } catch (error) {
        res.json({
            isSuccess: false,
            message: "Error Occured"
        })
    }
}


// product create
const productCreate = async (req, res) => {
    try {
        const { title, description, category, brand, price, sale_price, stock, image } = req.body;
        const newProduct = new productModel({ title, description, category, brand, price, sale_price, stock, image })
        await newProduct.save()
        res.json({
            isSuccess: true,
            message: "Product added successfully.",
            product: newProduct
        })
    } catch (error) {
        res.status(500).json({
            isSuccess: false,
            message: "An error occurred while processing your request.",
            error: error.message
        });
    }
}
// product read 
const fetchAllproducts = async (req, res) => {
    try {
        totalProducts = await productModel.find({})
        res.status(200).json({
            isSuccess: true,
            message: "Products fetched successfully.",
            totalProducts
        });

    } catch (error) {
        res.status(500).json({
            isSuccess: false,
            message: "An error occurred while processing your request.",
            error: error.message
        });
    }
}

// product update

const productUpdate = async (req, res) => {
    try {
        const { productId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                isSuccess: false,
                message: "Invalid product ID format."
            });
        }
        const { title, description, category, brand, price, sale_price, stock, image } = req.body;
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({
                isSuccess: false,
                message: "Product not found."
            });
        }
        product.title = title && title.trim() !== "" ? title : product.title;
        product.description = description && description.trim() !== "" ? description : product.description;
        product.category = category && category.trim() !== "" ? category : product.category;
        product.brand = brand && brand.trim() !== "" ? brand : product.brand;
        product.price = price !== undefined && price !== "" ? price : product.price;
        product.sale_price = sale_price !== undefined && sale_price !== "" ? sale_price : product.sale_price;
        product.stock = stock !== undefined && stock !== "" ? stock : product.stock;
        product.image = image && image.trim() !== "" ? image : product.image;

        const updatedProduct = await product.save()
        res.status(200).json({
            isSuccess: true,
            message: "Product updated successfully.",
            product: updatedProduct
        });

    }
    catch (error) {
        res.status(500).json({
            isSuccess: false,
            message: "An error occurred while processing your request.",
            error: error.message
        });
    }
}
// product delete

const productDelete = async (req, res) => {
    try {
        const { productId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                isSuccess: false,
                message: "Invalid product ID format."
            });
        }
        const deletedProduct = await productModel.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({
                isSuccess: false,
                message: "Product not found."
            });
        }
        res.status(200).json({
            isSuccess: true,
            message: "Product deleted successfully.",
            product: deletedProduct
        });
    } catch (error) {
        res.status(500).json({
            isSuccess: false,
            message: "An error occurred while processing your request.",
            error: error.message
        });
    }
}
module.exports = { handleImageUpload, productCreate, productDelete, productUpdate, fetchAllproducts }
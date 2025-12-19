
const cartModel = require('../../models/cartModel')
const productModel = require('../../models/productModel')
const mongoose = require('mongoose')

// cart create
const addToCart = async (req, res) => {

    try {
        const { userId, productId, quantity } = req.body;
        // --------------------------------
        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                isSuccess: false,
                message: "Invalid input. Please check your data and try again."
            });
        }
        // --------------------------------
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                isSuccess: false,
                message: "Invalid Prodcut ID format."
            });
        }
        // --------------------------------
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                isSuccess: false,
                message: "Invalid userId ID format."
            });
        }
        // --------------------------------
        const product = await productModel.findById(productId)
        if (!product) {
            return res.status(404).json({
                isSuccess: false,
                message: "Product Not Found"
            });
        }
        // --------------------------------

        let cart = await cartModel.findOne({ userId });
        if (!cart) {
            cart = new cartModel({ userId, items: [] })
        }
        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId)
        if (findCurrentProductIndex === -1) {
            cart.items.push({ productId, quantity })
        }
        else {
            cart.items[findCurrentProductIndex].quantity += quantity
        }

        await cart.save()
        res.json({
            isSuccess: true,
            message: "Cart Added Successfully.",
            data:cart
        })

    }
    // -------------------------------- 
    catch (error) {
        res.status(500).json({
            isSuccess: false,
            message: "An error occurred while processing your request.",
            error: error.message
        });
    }
}
// cart read 
const fetchCartItems = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                isSuccess: false,
                message: "Invalid userId ID format."
            });
        }
        if (!userId) {
            return res.status(404).json({
                isSuccess: false,
                message: "Invalid userId ID.User Id Required"
            });
        }
        const cart = await cartModel.findOne({ userId }).populate({
            path: "items.productId",
            select: "image title price sale_price brand "
        })
        if (!cart) {
            return res.status(404).json({
                isSuccess: false,
                message: "Cart not found for this user"
            });
        }
        const valiedItems = cart.items.filter(prodctItem => prodctItem.productId)
        if (valiedItems.length < cart.items.length) {
            cart.items = valiedItems
            await cart.save()
        }

        const populateCartItems = valiedItems.map(item => ({
            productId: item.productId._id,
            image: item.productId.image,
            sale_price: item.productId.sale_price,
            price: item.productId.price,
            brand: item.productId.brand,
            title: item.productId.title,
            quantity: item.quantity
        }))
        res.status(200).json({
            isSuccess: true,
            message: "carts fetched successfully.",
            data: {
                ...cart._doc,
                items: populateCartItems
            }
        });

    } catch (error) {
        res.status(500).json({
            isSuccess: false,
            message: "An error occurred while processing your request.",
            error: error.message
        });
    }
}

// cart update

const updateCartQuantity = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        // --------------------------------
        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                isSuccess: false,
                message: "Invalid input. Please check your data and try again."
            });
        }
        // --------------------------------
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                isSuccess: false,
                message: "Invalid Prodcut ID format."
            });
        }
        // --------------------------------
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                isSuccess: false,
                message: "Invalid userId ID format."
            });
        }
        // --------------------------------
        const product = await productModel.findById(productId)
        if (!product) {
            return res.status(404).json({
                isSuccess: false,
                message: "Product Not Found"
            });
        }
        // --------------------------------
        let cart = await cartModel.findOne({ userId });
        if (!cart) {
            return res.status(404).json({
                isSuccess: false,
                message: "cart not found."
            });
        }
        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId)
        if (findCurrentProductIndex === -1) {
            return res.status(404).json({
                isSuccess: false,
                message: "cart Items not found."
            });
        }

        cart.items[findCurrentProductIndex].quantity = quantity
        await cart.save()
        await cart.populate({
            path: "items.productId",
            select: "image title price sale_price brand "

        })
        const populateCartItems = cart.items.map(item => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            sale_price: item.productId ? item.productId.sale_price : null,
            price: item.productId ? item.productId.price : null,
            brand: item.productId ? item.productId.brand : null,
            title: item.productId ? item.productId.title : null,
            quantity: item.quantity
        }))
        res.status(200).json({
            isSuccess: true,
            message: "Carts Updated successfully.",
            data: {
                ...cart._doc,
                items: populateCartItems
            }
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
// cart delete

const deleteToCart = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        // --------------------------------
        if (!userId || !productId) {
            return res.status(400).json({
                isSuccess: false,
                message: "Invalid input. Please check your data and try again."
            });
        }
        
        // --------------------------------
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                isSuccess: false,
                message: "Invalid Prodcut ID format."
            });
        }
        // --------------------------------
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                isSuccess: false,
                message: "Invalid userId ID format."
            });
        }
        // --------------------------------
        const product = await productModel.findById(productId)
        if (!product) {
            return res.status(404).json({
                isSuccess: false,
                message: "Product Not Found"
            });
        }
        // --------------------------------
        let cart = await cartModel.findOne({ userId }).populate({
            path: "items.productId",
            select: "image title price sale_price brand "
        });
        if (!cart) {
            return res.status(404).json({
                isSuccess: false,
                message: "cart not found."
            });
        }
        cart.items=cart.items.filter(item=>item.productId._id.toString() !==productId)
        await cart.save()
        cart = await cartModel.findOne({ userId }).populate({
            path: "items.productId",
            select: "image title price sale_price brand "
        });
        const populateCartItems = cart.items.map(item => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            sale_price: item.productId ? item.productId.sale_price : null,
            price: item.productId ? item.productId.price : null,
            brand: item.productId ? item.productId.brand : null,
            title: item.productId ? item.productId.title : null,
            quantity: item.quantity
        }))
        res.status(200).json({
            isSuccess: true,
            message: "cart deleted successfully.",
            data: {
                ...cart._doc,
                items: populateCartItems
            }
        });
    } catch (error) {
        res.status(500).json({
            isSuccess: false,
            message: "An error occurred while processing your request.",
            error: error.message
        });
    }
}
module.exports = { addToCart, deleteToCart, updateCartQuantity, fetchCartItems }
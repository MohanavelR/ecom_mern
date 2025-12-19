const orderModel = require('../../models/orderModel')
const productModel = require('../../models/productModel')
const reviewModel = require('../../models/reviewModel')


const addProductReview = async (req, res) => {
    try {
        const { userId, productId, reviewMessage, userName, reviewValue } = req.body
        const order = await orderModel.findOne({ userId: userId, "cartItems.productId": productId, orderStatus: { $ne: "pending" } })
        if (!order) {
            return res.json({
                message: "You need to purchase this product to perform this action",
                isSuccess: false
            })
        }
        const existingReview = await reviewModel.findOne({ userId: userId, productId: productId });
        if (existingReview) {
            return res.json({
                isSuccess: false,
                message: "You have already reviewed this product.",
            });
        }
        const newReview = new reviewModel({
            userId, productId, reviewMessage, userName, reviewValue
        });

        await newReview.save();

        const reviews = await reviewModel.find({ productId })
        const totalLength = reviews.length
        const avarageReview = reviews.reduce((sum, cur) => sum + cur.reviewValue, 0) / totalLength
        await productModel.findByIdAndUpdate(productId, { avarageReview })
        res.status(201).json({
            isSuccess: true,
            message: "Review submitted successfully",
            data: newReview
        });

    } catch (error) {
        res.json({
            isSuccess: false,
            message: "Something Error Occurred"
        })
    }
}
const getProductReview = async (req, res) => {
    try {
      const {productId}=req.params;
      const reviews= await reviewModel.find({productId})
      res.status(200).json({
            isSuccess: true,
            message: "Review fetching successfully",
            data: reviews
        });

    } catch (error) {
        res.json({
            isSuccess: false,
            message: "Something Error Occurred"
        })
    }
}
module.exports = {
    addProductReview,
    getProductReview
}
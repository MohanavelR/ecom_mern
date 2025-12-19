const { addProductReview, getProductReview } = require('../../controllers/review/review-controller')

const routes=require('express').Router()


routes.post('/add',addProductReview)
routes.get('/get/:productId',getProductReview)
module.exports=routes
const { getFilterProducts, getProductDetails } = require('../../controllers/shop/shop-ProductController')

const router = require('express').Router()

router.get('/products',getFilterProducts)
router.get('/products/:productId',getProductDetails)

module.exports=router
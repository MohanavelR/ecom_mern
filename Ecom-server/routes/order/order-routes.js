const { createOrder, capturePayment, getOrderDetails, getAllOrderByUsers } = require('../../controllers/order/order-controller')

const router = require('express').Router()
router.post('/create',createOrder)
router.post('/payment',capturePayment)
router.get('/getall/:userId',getAllOrderByUsers)
router.get('/getdetails/:orderId',getOrderDetails)
module.exports=router
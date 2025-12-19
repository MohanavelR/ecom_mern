const { getAllOrders, getOrderDetailsForAdmin, updateOrderStatus } = require('../../controllers/admin/admin-order-controller')

const router = require('express').Router()

router.get('/allOrders',getAllOrders)
router.get('/details/:orderId',getOrderDetailsForAdmin)
router.post('/updateStatus/:orderId',updateOrderStatus)
module.exports = router
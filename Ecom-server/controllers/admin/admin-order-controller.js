const orderModel = require('../../models/orderModel')
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        if (orders.length === 0) {
            return res.json({
                message: 'No orders',
                isSuccess: false
            })
        }
        return res.json({
            message: 'Fetching Successfully',
            isSuccess: true,
            data: orders
        })

    } catch (error) {

        res.json({
            message: error.message,
            isSuccess: false,

        })
    }
}
const getOrderDetailsForAdmin = async (req, res) => {
    const { orderId } = req.params;
    try {
        if (!orderId) {
            return res.json({
                message: 'Missing Field',
                isSuccess: false
            })
        }
        const order = await orderModel.findById(orderId)
        if (!order) {
            return res.json({
                message: 'Order Not Found',
                isSuccess: false
            })
        }
        return res.json({
            message: 'Fetching Successfully',
            isSuccess: true,
            data: order
        })
    }
    catch (error) {
        res.json({
            message: error.message,
            isSuccess: false,

        })
    }
}
const updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { orderStatus }=req.body;
    
    try {
        if (!orderId || !orderStatus ) {
            return res.json({
                message: 'Missing Field',
                isSuccess: false
            })
        }
        const order = await orderModel.findByIdAndUpdate(orderId,{orderStatus})
        if (!order) {
            return res.json({
                message: 'Order Not Found',
                isSuccess: false
            })
        }
        return res.json({
            message: 'Order Status Updated',
            isSuccess: true,
            
        })
    }
    catch (error) {
        res.json({
            message: error.message,
            isSuccess: false,

        })
    }
}


module.exports = { getAllOrders, getOrderDetailsForAdmin,updateOrderStatus }
const paypal = require('../../helpers/paypal')
const orderModel = require('../../models/orderModel')
const cartModel = require('../../models/cartModel');
const productModel = require('../../models/productModel');
const createOrder = async (req, res) => {
  try {
    const {
      userId,
      orderStatus,
      paymentMethods,
      paymentStatus,
      totalAmount,
      orderDate,
      cartId,
      orderUpdateDate,
      paymentId,
      payerId, cartItems, addressInfo
    } = req.body;

    const create_payment_json = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal'
      },
      redirect_urls: {
        return_url: 'http://localhost:5173/shopping/paypal-return',
        cancel_url: 'http://localhost:5173/shopping/paypal-cancel'
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: item.price.toFixed(2),
              currency: "USD", // ✅
              quantity: item.quantity
            }))
          },
          amount: {
            currency: 'USD', // ✅
            total: totalAmount.toFixed(2)
          },
          description: "description"
        }
      ]
    }

    paypal.payment.create(create_payment_json, async (error, paymentinfo) => {
      if (error) {
        
        return res.json({
          message: error.message,
          isSuccess: false
        })
      }
      else {
        const newOrder = new orderModel({
          userId,
          orderStatus,
          paymentMethods,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId,
          cartId,
          payerId,
          cartItems,
          addressInfo
        });

        await newOrder.save()
        const approvelUrl = paymentinfo.links.find(link => link.rel === 'approval_url').href
        return res.json({
          isSuccess: true,
          approvelUrl,
          orderId: newOrder._id
        })
      }
    })

  }
  catch (error) {
    
    res.json({
      message: error.message,
      isSuccess: false,

    })
  }
}
const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;
    const order = await orderModel.findById(orderId)

    if (!order) {
      return res.json({
        message: 'OrderItem Not Found',
        isSuccess: false
      })
    }
    order.paymentStatus = 'paid',
    order.orderStatus = 'InProcess'

    order.paymentId = paymentId
    order.payerId = payerId
    for(let item of order.cartItems){
      let product= await productModel.findById(item.productId)
      if(!product){
        return res.json({
           message: `Not Enough Stock for this Product ${item.title}`,
          isSuccess: false
        })
      }
      
      product.stock-=item.quantity
      await product.save()
    }
    await cartModel.findByIdAndDelete(order.cartId)
    
    await order.save()
    res.json({
      message: "Your order has been successfully placed",
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


const getAllOrderByUsers = async (req, res) => {
  try {
    const { userId } =  req.params ;
    if (!userId) {
      return res.json({
        message: 'Missing Field',
        isSuccess: false
      })
    }
    const orders = await orderModel.find({ userId })
    if(orders.length === 0){
      return res.json({
        message: 'No orders',
        isSuccess: false
      })
    }
  
    return res.json({
        message: 'Fetching Successfully',
        isSuccess: true,
        data:orders
      })

  } catch (error) {
    
    res.json({
      message: error.message,
      isSuccess: false,

    })
  }
}

const getOrderDetails = async (req, res) => {
  const {orderId } =  req.params;
  try {
    if (!orderId) {
      return res.json({
        message: 'Missing Field',
        isSuccess: false
      })
    }
const order = await orderModel.findById(orderId)
    if(!order){
      return res.json({
        message: 'Order Not Found',
        isSuccess: false
      })
    }
    return res.json({
        message: 'Fetching Successfully',
        isSuccess: true,
        data:order
      })


  } catch (error) {
    
    res.json({
      message: error.message,
      isSuccess: false,

    })
  }

}

module.exports = { createOrder, capturePayment,getOrderDetails,getAllOrderByUsers }
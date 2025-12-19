/* Requirments */
const express = require('express')
const cors = require('cors')
const cookieParser=require('cookie-parser')
const dotenvConfig = require('dotenv')
/*  Enabling .env file access  */
dotenvConfig.config()
// database
const setConnection = require('./config/db')
// Routes
const authRouter = require('./routes/auth/auth-routes')
const adminProductRouter = require('./routes/admin/products-routes')
const shopProductRouter = require('./routes/shop/shop-routers')
const searchProductRouter = require('./routes/shop/search-routes')
const addressRouter = require('./routes/shop/address-routers')
const cartItemsRouter = require('./routes/cart/cart-routers')
const orderRouter = require('./routes/order/order-routes')
const adminOrderRouter = require('./routes/admin/admin-order-routes')
const productReviewRouter = require('./routes/review/review-routes')
const featureRouter = require('./routes/feature/feature')
/* Set Database connection  */
setConnection()
/* Create App */
const app = express()

/* Middle Ware */
// json format
app.use(express.json())
// cookieparser
app.use(cookieParser())
// cors
const allowedOrigins=['http://localhost:5174',"http://localhost:5173","https://ecom-mern-mu.vercel.app"]
app.use(cors({
    origin:allowedOrigins,
    credentials:true
}))
// routes
app.use('/api/auth',authRouter)
app.use('/api/admin/products',adminProductRouter)
app.use('/api/shop',shopProductRouter)
app.use('/api/cart',cartItemsRouter)
app.use('/api/address',addressRouter)
app.use('/api/order',orderRouter)
app.use('/api/admin',adminOrderRouter)
app.use('/api/product',searchProductRouter)
app.use('/api/review',productReviewRouter)
app.use('/api/feature',featureRouter)
/*---------------------------------------- */

// server Run
const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`running on http://127.0.0.1:${port}`)
})
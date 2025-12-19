const { addToCart, fetchCartItems, updateCartQuantity, deleteToCart } = require('../../controllers/cart/cart-controller')

const router = require('express').Router()

router.post("/create", addToCart)
router.get("/get/:userId", fetchCartItems)
router.put("/update", updateCartQuantity)
router.delete("/delete/:userId/:productId", deleteToCart)


module.exports = router




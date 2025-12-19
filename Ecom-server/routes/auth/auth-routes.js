const { register, login, logout } = require('../../controllers/auth/auth-controller')
const { authMiddleware } = require('../../middleware/auth/authMiddleware')

const router = require('express').Router()


router.post("/register",register)
router.post("/login",login)
router.get("/logout",logout)
router.get("/is-auth",authMiddleware,(req,res)=>{
    const user = req.user
    res.json({
        isSuccess:true,
        message:"Authenticated user ",
        user
    })
})


module.exports=router
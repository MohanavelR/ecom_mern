const { addAddress, fetchAddress, editAddress, deleteAddress } = require('../../controllers/shop/address-controller')

const routes=require('express').Router()


routes.post('/create',addAddress)
routes.get('/get/:userId',fetchAddress)
routes.put('/edit/:userId/:addressId',editAddress)
routes.delete('/delete/:userId/:addressId',deleteAddress)


module.exports=routes
const { handleImageUpload, productCreate, fetchAllproducts, productUpdate, productDelete } = require('../../controllers/admin/productController')
const { imageUploader } = require('../../helpers/cloudinary')

const router = require('express').Router()
router.post('/upload-image',imageUploader.single("my_file"),handleImageUpload )
router.post("/add",productCreate)
router.get("/fetch",fetchAllproducts)
router.put("/edit/:productId",productUpdate)
router.delete("/delete/:productId",productDelete)
module.exports = router
const couldinary=require('cloudinary').v2
const multer= require('multer')
couldinary.config({
    cloud_name:"ddnaufjv8",
    api_key:"792593363469759",
    api_secret:"GTEg2hDaZPOsljqacN668N60ajc",

})
const storage = new multer.memoryStorage()
async function ImageUploadUtils(file) {
    const result = await couldinary.uploader.upload(file,{
        resource_type:"auto"
    })
    return result
}
const imageUploader = multer({storage})
module.exports={ImageUploadUtils,imageUploader}

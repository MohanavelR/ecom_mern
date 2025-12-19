const productModel = require('../../models/productModel')
const searchProducts = async (req, res) => {
    try {
        const { keyword } = req.params;
        if (!keyword || typeof keyword !== 'string') {
            return res.json({
                isSuccess: false,
                message: 'Keyword is Required and Must be in String format'
            })
        }
        const regEx = new RegExp(keyword, 'i')
        const createSearcQuery = {
            $or: [
                { title: regEx },
                { description: regEx },
                { category: regEx },
                { brand: regEx },
            ]
        }
        const searchedProducts = await productModel.find(createSearcQuery)
        res.json({
            isSuccess: true,
            message: "fetching Searching Products",
            data: searchedProducts
        })
    } catch (error) {
        console.log(error)
        res.json({
            isSuccess: false,
            message: "Some Error Occurred"
        })
    }
}

module.exports = { searchProducts }
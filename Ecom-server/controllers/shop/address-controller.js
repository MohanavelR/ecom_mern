const { default: mongoose } = require("mongoose");
const addressModel = require("../../models/addressModel");
const { isValidObjectId } = require("../../utils/vaildObjectId");

const addAddress = async (req, res) => {

    try {
        const { userId, address, city, pincode, phone, notes } = req.body;
        if (!userId || !address || !city || !pincode || !phone || !notes) {
            return res.json({
                isSuccess: false,
                message: 'Invaild input. Please check your data and try again.'
            })
        }
       
        if (!mongoose.isValidObjectId(userId)) {
            return res.json({
                isSuccess: false,
                message: 'Invaild User ID Format'
            })
        }

        const newAddress = new addressModel({ userId, address, phone, pincode, notes, city })

        await newAddress.save()
        res.status(201).json({
            isSuccess: true,
            message: "Address Added Successfully",
            data: newAddress
        })
    } catch (error) {
       
        res.json({
            isSuccess: false,
            message: "Error occurred"
        })
    }
}
const fetchAddress = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.json({
                isSuccess: false,
                message: 'Invaild Data. Please check your data and try again.'
            })
        }
        if (!mongoose.isValidObjectId(userId)) {
            return res.json({
                isSuccess: false,
                message: 'Invaild User ID Format'
            })
        }
        const addressList = await addressModel.find({ userId })
        res.status(200).json({
            isSuccess: true,
            message: "Address fetched Successfully",
            data: addressList
        })
    } catch (error) {
        res.json({
            isSuccess: false,
            message: "Error occurred"
        })
    }
}
const editAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        const formData = req.body;
        if (!userId || !addressId) {
            return res.json({
                isSuccess: false,
                message: 'Invaild Data. Please check your data and try again.'
            })
        }
        if (!mongoose.isValidObjectId(userId)) {
            return res.json({
                isSuccess: false,
                message: 'Invaild User ID Format'
            })
        }
        if (!mongoose.isValidObjectId(addressId)) {
            return res.json({
                isSuccess: false,
                message: 'Invaild Address ID Format'
            })
        }
        
        const updatedAddress = await addressModel.findOneAndUpdate({
            _id: addressId, userId: userId
        }, formData, { new: true })
        
        if (!updatedAddress) {
            return res.status(404).json({
                isSuccess: false,
                message: "Address Not Found",
            })
        }
        
        res.status(200).json({
            isSuccess: true,
            message: "Address Updated Successfully",
            data: updatedAddress
        })
    } catch (error) {
        res.json({
            isSuccess: false,
            message: "Error occurred"
        })
    }
}
const deleteAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;

        if (!userId || !addressId) {
            return res.json({
                isSuccess: false,
                message: 'Invaild Data. Please check your data and try again.'
            })
        }
        if (!mongoose.isValidObjectId(userId)) {
            return res.json({
                isSuccess: false,
                message: 'Invaild User ID Format'
            })
        }
        if (!mongoose.isValidObjectId(addressId)) {
            return res.json({
                isSuccess: false,
                message: 'Invaild Address ID Format'
            })
        }

        const deletedAddress = await addressModel.findOneAndDelete({
            _id: addressId, userId
        })
        if (!deletedAddress) {
            return res.status(404).json({
                isSuccess: false,
                message: "Address Not Found",
            })
        }
        res.status(200).json({
            isSuccess: true,
            message: "Address Deleted Successfully",
            data: deletedAddress
        })
        // 
    } catch (error) {
        res.json({
            isSuccess: false,
            message: "Error occurred"
        })
    }
}

module.exports = { addAddress, fetchAddress, editAddress, deleteAddress }
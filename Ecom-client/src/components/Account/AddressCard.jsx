import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useDeleteAddress, useFetchAddresses } from '../../store/shop/address-slice';
import { MessageContaxt } from '../../context/message_context';

const AddressCard = ({ address, editFormOpen, currentSelectedAddress, setCurrentSelectedAddress }) => {
    const { user } = useSelector(state => state.auth)
    const { setMessageDisplay, setMessage, setIsSuccess } = useContext(MessageContaxt)
    const dispatch = useDispatch()


    function handleDeleteAddress(addressId, userId) {
        if (confirm("Are Sure To Delete ?")) {
            dispatch(useDeleteAddress({ userId, addressId })).then((data) => {
                if (data?.payload?.isSuccess) {
                    setMessageDisplay(true);
                    setMessage(data.payload.message);
                    dispatch(useFetchAddresses(user.id))
                    setIsSuccess(true);

                } else {
                    setMessageDisplay(true);
                    setMessage(data.payload.message || 'Something went wrong');
                    setIsSuccess(false);
                }
            })
        }
    }

    return (
        <>
            {/* <!-- Address Card --> */}
            <div id="addressCard" className="bg-white rounded-lg shadow-lg p-6 mb-6 transition-all duration-300 hover:shadow-xl">
                {
                    currentSelectedAddress?.isCheckout &&
                    <label className="inline-flex items-center opacity-50 cursor-not-allowed">
                        <input onChange={() => setCurrentSelectedAddress({ ...currentSelectedAddress, addressInfo: address })} type="radio" name='select' className="form-checkbox h-5 w-5 text-gray-400 rounded" />
                        <span className="ml-2 sr-only text-gray-500">Disabled option</span>
                    </label>
                }
                {/* <!-- Card Header --> */}
                <div htmlFor='selectAddress' className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-3 rounded-full">
                            <i className="fas fa-map-marker-alt text-blue-600 text-xl"></i>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">Primary Address</h2>
                            <p className="text-sm text-gray-500">Default shipping address</p>
                        </div>
                    </div>

                </div>

                {/* <!-- Address Details --> */}
                <div id="viewMode" className="space-y-3">
                    <div className="flex items-start space-x-3">
                        <i className="fas fa-home text-gray-400 mt-1"></i>
                        <div className="flex-1">
                            <p className="text-sm text-gray-500">Address</p>
                            <p className="text-gray-800 font-medium">{address?.address}</p>
                        </div>
                    </div>


                    <div className="flex items-start space-x-3">
                        <i className="fas fa-map-pin text-gray-400 mt-1"></i>
                        <div className="flex-1">
                            <p className="text-sm text-gray-500">Pincode</p>
                            <p className="text-gray-800 font-medium">{address?.pincode}</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-3">
                        <i className="fas fa-city text-gray-400 mt-1"></i>
                        <div className="flex-1">
                            <p className="text-sm text-gray-500">City</p>
                            <p className="text-gray-800 font-medium">{address?.city}</p>
                        </div>
                    </div>


                    <div className="flex items-start space-x-3">
                        <i className="fas fa-phone text-gray-400 mt-1"></i>
                        <div className="flex-1">
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="text-gray-800 font-medium">{address?.phone}</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-3">
                        <i className="fas fa-sticky-note text-gray-400 mt-1"></i>
                        <div className="flex-1">
                            <p className="text-sm text-gray-500">Notes</p>
                            <p className="text-gray-800 font-medium">{address?.notes}</p>
                        </div>
                    </div>
                </div>
                <div className="flex mt-3 space-x-2">
                    <button onClick={() => editFormOpen(address)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                        <i className="fas fa-edit"></i>
                    </button>
                    <button onClick={() => handleDeleteAddress(address?._id, address.userId)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                        <i className="fas fa-trash"></i>

                    </button>
                </div>
            </div>
        </>
    )
}

export default AddressCard;

import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddressForm from '../../components/Account/AddressForm';
import AddressCard from '../../components/Account/AddressCard';
import NotAvailable from '../../components/common/NotAvailable';
import CartItems from '../../components/shopping-view/CartItems';
import { useCreateOrder } from '../../store/order-slice';

const CheckoutShop = () => {
  const { addressList, isLoading } = useSelector(state => state.address)
  const { user } = useSelector(state => state.auth)
  const { isLoading: orderIsLoading } = useSelector(state => state.order)
  const [addressFormOpen, setaddressFormOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editAddress, seteditAddress] = useState(null)
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState({
    addressInfo: null,
    isCheckout: true
  })

  const { cartItems } = useSelector(state => state.shoppingCart)
  const { approvalURL } = useSelector(state => state.order)
  const dispatch = useDispatch()
  const [isPaymentStart, setIsPaymentStart] = useState(false)
  const [error, setLoading] = useState(true)
  const totalAmount = cartItems?.items?.length > 0
    ? cartItems.items.reduce((sum, item) => sum + ((item.sale_price > 0 ? item.sale_price : item.price) * item?.quantity || 0), 0)
    : 0;

  
  // --------------
  function handleInitialPaypalPayment() {
    const orderData = {
      userId: user?.id,
      orderStatus: "pending",
      paymentMethods: 'paypal',
      paymentStatus: 'pending',
      totalAmount,
      cartId:cartItems?._id,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: '',
      payerId: '',
      cartItems: cartItems.items.map((cart) => ({
        productId: cart?.productId,
        title: cart?.title,
        image: cart?.image,
        price: cart?.sale_price > 0 ? cart?.sale_price : cart?.price,
        quantity: cart?.quantity
      }
      )),
      addressInfo: {
        address: currentSelectedAddress?.addressInfo.address,
        addressId: currentSelectedAddress?.addressInfo._id,
        city: currentSelectedAddress?.addressInfo.city,
        pincode: currentSelectedAddress?.addressInfo.pincode,
        phone: currentSelectedAddress?.addressInfo.phone,
        notes: currentSelectedAddress?.addressInfo.notes
      }
    }
   
    setLoading(true)
    dispatch(useCreateOrder(orderData)).then((data) => {
      if (data?.payload?.isSuccess) {
        setIsPaymentStart(true)
      }
      else {
        setIsPaymentStart(false)
      }
    })

  }
  useEffect(() => {
    if (currentSelectedAddress.addressInfo && cartItems && cartItems?.items.length > 0) {
      setLoading(false)
    }
  }, [currentSelectedAddress,cartItems?.items])
  // -------------------------
  function editFormOpen(edAddress) {
    setEditMode(true)
    seteditAddress(edAddress)
    setaddressFormOpen(true)
  }

  if(approvalURL){
    return window.location.href=approvalURL
  }
  return (
    <div className='p-2'>
      {
        addressFormOpen &&
        <div className='fixed flex justify-center items-center z-[901] bg-black/70  inset-0 '>
          <AddressForm setEditMode={setEditMode} editAddress={editAddress} seteditAddress={seteditAddress} editMode={editMode} addressFormOpen={addressFormOpen} setaddressFormOpen={setaddressFormOpen} />
        </div>
      }
      {
        isLoading ? <div className='w-full flex justify-center '>
          <div className='loader'></div>
        </div> :
          <div className="grid  grid-cols-1 md:grid-cols-3 gap-6">
            {
              (addressList && addressList.length) ?
                addressList.map((address, index) => (
                  <AddressCard currentSelectedAddress={currentSelectedAddress} setCurrentSelectedAddress={setCurrentSelectedAddress} editFormOpen={editFormOpen} key={index} address={address} />
                ))
                : <NotAvailable />
            }
          </div>
      }
      {
        (addressList && addressList.length >= 3) ? <p className='text-red-400'>You can only add up to 3 addresses.</p> :
          <button onClick={() => setaddressFormOpen(!addressFormOpen)} className="mt-6 flex items-center text-blue-600 hover:text-blue-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New Address
          </button>
      }
      <div className="space-y-4">
        {
          (cartItems && cartItems.items && (cartItems.items).length > 0) ?
            (cartItems?.items).map((item, index) => (
              <CartItems key={index} item={item} />
            ))
            : <NotAvailable />
        }
      </div>
      <div className="w-full mt-4">
        <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h2>
          <div className="space-y-3 mb-6">
            <div className="border-t border-gray-300 pt-3 mt-3">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span className="text-lg whitespace-nowrap"><i className="fa-solid fa-indian-rupee-sign"></i>{totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <button disabled={error} onClick={handleInitialPaypalPayment} className=" w-full flex justify-center disabled:cursor-no-drop disabled:bg-blue-400 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            {orderIsLoading ?  <div className="loader border-white"></div> : "Checkout with Paypal"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CheckoutShop
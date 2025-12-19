import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useCaptureOrder } from '../../store/order-slice'
import { useFetchCartItems } from '../../store/cart-slice'

const PaypalReturn = () => {
  const dispatch=useDispatch()
  const location=useLocation()
  const {user}=useSelector(state=>state.auth)
  const [isLoading,setLoading]=""
  const params=new URLSearchParams(location.search)
   const paymentId = params.get('paymentId');
const payerId = params.get('PayerID');
   useEffect(()=>{
     if(payerId && paymentId){
      const orderId = JSON.parse(sessionStorage.getItem('currentOrderId'))
      const paymentData={
        payerId,paymentId,orderId
      }
      dispatch(useCaptureOrder(paymentData)).then(data=>{
       
        if(data?.payload?.isSuccess){
          sessionStorage.removeItem('currentOrderId')
          window.location.href='/shopping/payment-success'
          dispatch(useFetchCartItems(user.Id))
        }
        // else{
        //   window.location.href='/shopping/payment-success'
        // }
      
      })

     }
   },[payerId,paymentId,dispatch])  
  return (
    <div>
         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
  <div className="flex flex-col items-center space-y-6">
    {/* <!-- Spinner container with dots --> */}
    <div className="relative w-16 h-16">
      {/* <!-- Outer spinner --> */}
      <div className="absolute inset-0 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      
      {/* <!-- Center dots --> */}
      <div className="absolute inset-0 flex items-center justify-center space-x-1">
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay:"0.1s"}}></div>
      </div>
    </div>
    
    {/* <!-- Text with gradient effect --> */}
    <p className=" text-lg font-medium bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent animate-pulse">
      Please Wait Processing ...
    </p>
  </div>
</div>
    </div>
  )
}

export default PaypalReturn
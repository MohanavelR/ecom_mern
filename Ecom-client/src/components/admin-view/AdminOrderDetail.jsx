import React, { useContext, useState } from 'react'
import { deepcopy } from '../../utils/deepCopy'
import { useDispatch, useSelector } from 'react-redux'
import { usegetAllOrder, useGetOrderDetailsOfAdmin, useUpdateOrderStatus } from '../../store/admin-slice/order-slice'
import {MessageContaxt} from '../../context/message_context'  

const AdminOrderDetail = ({ detailOfOrderCancel }) => {
  const {setIsSuccess,setMessage,setMessageDisplay}=useContext(MessageContaxt)
     const [orderStatus,setOrderStatus]=useState("")
 const {orderDetails , isLoading}=useSelector((state)=>state.order)
 const dispatch=useDispatch()
 function handleOrderStatusUpdate(orderId){
   dispatch(useUpdateOrderStatus({orderId,orderStatus})).then((data)=>{
    if(data?.payload?.isSuccess){
      dispatch(usegetAllOrder())
      setMessageDisplay(true)
      setIsSuccess(true)
      setMessage(data?.payload?.message)
      dispatch(useGetOrderDetailsOfAdmin(orderId))
      setOrderStatus("")
    }
    else{
      setMessageDisplay(true)
      setIsSuccess(false)
      setMessage(data?.payload?.message)
    }
   })
 }

  return (
  <>
     
      <div className="fixed top-0 left-0 right-0 items-center  z-[901] overflow-auto h-screen bg-gray-50 flex flex-col">
        
        {/* Close Button */}
         {
        isLoading ? <div className='loader'></div>:
        
        <div className='relative w-[90%] z-[600]'>
          <div className="absolute  top-2 right-10 ">
            <button onClick={detailOfOrderCancel} className="bg-black hover:bg-black/60 hover-duration text-white rounded-full p-2 shadow-lg  transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-15 w-full">
            {/* <!-- Customer Order Card --> */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              {/* <!-- Card Header --> */}
              <div className=" p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <h1 className="text-2xl font-bold ">Order Details</h1>
                    <p className=" mt-1">Order ID #{orderDetails?._id}</p>
                  </div>
                  {/* <div className="mt-4 md:mt-0">
                    <span className="px-4 py-2 bg-blue-950 text-white font-bold  backdrop-blur-sm  rounded-full ">
                      
                    </span>
                  </div> */}
                </div>
                <div className="mt-4  text-sm">
                  <p>Placed on <span className='font-bold'>{orderDetails?.orderDate.split("T")[0]}</span> </p>
                </div>
              </div>

              {/* <!-- Card Body --> */}
              <div className="p-6">
                {/* <!-- Order Status Timeline --> */}
              <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Status</h2>
                  <div className="relative">
                    <h1 className='text-gray-500 my-1'>Current Status: <span className='bg-blue-100 p-1 rounded-sm'>{orderDetails?.orderStatus}</span> </h1>
                    <div className="space-y-6 relative">
                      <select value={orderStatus} onChange={(e)=>setOrderStatus(e.target.value)}  name="" id="" className="w-full px-3 py-2 outline-none border-2 rounded-lg border-gray-200">
                        <option value=""></option>
                        <option className="font-medium" value="pending">Pending</option>
                        <option className="font-medium" value="inProgress">In Progress</option>
                        <option className="font-medium" value="inShopping">In Shipping</option>
                        <option className="font-medium" value="delivered">Delivered</option>
                        <option className="font-medium" value="rejected">Rejected</option>
                      </select>
                    </div>
                      <button onClick={()=>handleOrderStatusUpdate(orderDetails._id)} className='p-3 hover:bg-cyan-700 hover-duration rounded-lg bg-cyan-800 mt-3 text-white font-bold  '>Update Status</button>
                  </div>
                </div>

                {/* <!-- Order Items --> */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h2>
                  <div className="space-y-4">
                    {/* <!-- Item 1 --> */}

                    {
                      orderDetails?.cartItems.map((item)=>(

                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                        <img src={item?.image} alt="Product" className="w-full h-full object-cover"/>
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium text-gray-800">{item?.title} </h3>
                        {/* <p className="text-sm text-gray-500">Color: Black | SKU: BT-HP-100</p> */}
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-800"><i className="fa-solid fa-indian-rupee-sign"></i>{item?.price} </p>
                        <p className="text-sm text-gray-500">Qty: {item?.quantity} </p>
                      </div>
                    </div>
                      ))
                    }

                    
                  </div>
                </div>

                {/* <!-- Order Summary --> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* <!-- Shipping Address --> */}
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">Shipping Address</h2>
                    <div className="space-y-2">
                      {/* <p className="text-gray-700">Alex Johnson</p> */}
                      <p className="text-gray-600">{orderDetails?.addressInfo?.address}</p>
                      <p className="text-gray-600">{orderDetails?.addressInfo?.city}</p>
                      <p className="text-gray-600">{orderDetails?.addressInfo?.pincode}</p>
                      <p className="text-gray-600">Phone : {orderDetails?.addressInfo?.phone}</p>
                    </div>
                  </div>

                  {/* <!-- Payment Method --> */}
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">Payment Method</h2>
                    <div className="flex items-center">
                      {/* <div className="w-10 h-6 bg-gray-300 rounded mr-3">
                        <div className="w-full h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded"></div>
                      </div> */}
                      <div className='flex space-x-2'>
                        <p className="text-gray-700">{orderDetails?.paymentMethods} Payment </p>
                        <p className="px-5 bg-green-700 text-white text-center rounded-full ">{orderDetails?.paymentStatus}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Order Total --> */}
                <div className="bg-gray-50 p-5 rounded-lg mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-3">Order Summary</h2>
                  <div className="space-y-2">
                    
                    <div className="flex justify-between pt-3 border-t border-gray-200 mt-3">
                      <span className="text-lg font-semibold text-gray-800">Total</span>
                      <span className="text-lg font-bold text-blue-600"><i className="fa-solid fa-indian-rupee-sign"></i>{orderDetails?.totalAmount}</span>
                    </div>
                  </div>
                </div>

                {/* <!-- Action Buttons --> */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button onClick={detailOfOrderCancel} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-200 flex items-center justify-center font-medium">
                    {/* <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg> */}
                    Close
                  </button>
                  {/* <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg transition duration-200 flex items-center justify-center font-medium">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                    </svg>
                    Contact Support
                  </button>
                  <button className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 py-3 rounded-lg transition duration-200 flex items-center justify-center font-medium">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    Print Invoice
                  </button> */}
                </div>
              </div>
            </div>
          </div>


        </div>
      }
      </div>
    </>
  )
}

export default AdminOrderDetail
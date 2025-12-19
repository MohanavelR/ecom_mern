import React, { use, useState } from 'react'
import AdminOrderView from '../../components/admin-view/AdminOrderView'
import AdminOrderDetail from '../../components/admin-view/AdminOrderDetail'
import { deepcopy } from '../../utils/deepCopy'
import { useDispatch, useSelector } from 'react-redux'
import { resetOrderDetails, useGetOrderDetailsOfAdmin } from '../../store/admin-slice/order-slice/index';
const initialFormData={
   status:""
}
export const AdminOrders = () => {
   const {totalOrders}=useSelector(state=>state.adminOrder)
   const [openDetailOfOrder,setOpenDetailOfOrder]=useState(false)
   const dispatch=useDispatch()
   const detailOfOrderCancel=()=>{
      setOpenDetailOfOrder(!openDetailOfOrder)
      dispatch(resetOrderDetails())
   }
   const OpenDetailOrderMethod=(orderId)=>{
       if(orderId){
      dispatch(useGetOrderDetailsOfAdmin(orderId)).then((data)=>{
        if(data?.payload?.isSuccess){
          setOpenDetailOfOrder(!openDetailOfOrder)
        }
      })
    }
   }
  return (
     <>
     {
      openDetailOfOrder && 
      <AdminOrderDetail  detailOfOrderCancel={detailOfOrderCancel}  /> 
     }
    <AdminOrderView totalOrders={totalOrders}  OpenDetailOrderMethod={OpenDetailOrderMethod}   />
    </>
  )
}

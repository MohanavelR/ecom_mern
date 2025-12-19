import React, { useState } from 'react'
import AdminHeader from './AdminHeader'
import  AdminSidebar  from './AdminSidebar'
import {Outlet} from 'react-router-dom'
import AddProduct from './forms/AddProduct'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { usegetAllOrder } from '../../store/admin-slice/order-slice'
import { useGetFeatureImage } from '../../store/feature-slice'

export const AdminLayout = () => {
   const [sidebarOpen,setSidebarOpen]=useState(false)
   const dispatch=useDispatch()

  useEffect(()=>{
   dispatch(usegetAllOrder())
   dispatch(useGetFeatureImage())
  },[])
  return (
    <>
  <div className="flex h-screen">
       <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />    
      <div className="flex-1 flex flex-col">
       <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}  />  
    <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
    <Outlet/>
    </main>
    </div>  
    </div>  
    </>
  )
}

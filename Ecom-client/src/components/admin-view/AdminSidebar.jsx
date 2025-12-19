import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminSidebar = ({sidebarOpen,setSidebarOpen}) => {
  const navigate=useNavigate()
return (
  <>
     <div onClick={()=>setSidebarOpen(!sidebarOpen)}  className={`h-screen ${sidebarOpen?"block":"hidden"}  lg:hidden  w-screen  fixed top-0 left-0 bg-black/50`}>
      </div>    
    <div className={`w-78 z-[500] lg:-translate-x-0 hover-duration ${sidebarOpen?"-translate-x-0":"-translate-x-full"} fixed  transform lg:relative  bg-white shadow-lg lg:flex flex-col h-full border-r border-gray-200`}>
      <div onClick={()=>setSidebarOpen(!sidebarOpen)} className='absolute  block lg:hidden transform hover-duration hover:scale-120 top-2 hover:text-black cursor-pointer  text-amber-950 right-3'>
         <svg  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" ><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
      </div>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
            <i className="fas fa-shopping-bag text-white text-xl"></i>
          </div>
          <h1 className="text-xl font-bold text-gray-800">ShopAdmin</h1>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
  
          <li>
            <button onClick={()=>{
              navigate('dashboard')
              setSidebarOpen(false)
            }}  className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 group">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-indigo-200">
                <i className="fas fa-chart-line text-indigo-600"></i>
              </div>
              <span className="font-medium">Dashboard</span>
            </button>
          </li>
          
       
          <li>
            <button onClick={()=>{
              navigate('products')
              setSidebarOpen(false)
            }}  className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 group">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-indigo-200">
                <i className="fas fa-box text-indigo-600"></i>
              </div>
              <span className="font-medium">Products</span>
            </button>
          </li>
          
         
          <li>
            <button onClick={()=>{
              navigate('orders')
              setSidebarOpen(false)
            }} className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 group">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-indigo-200">
                <i className="fas fa-shopping-cart text-indigo-600"></i>
              </div>
              <span className="font-medium">Orders</span>
            </button>
          </li>
          
{/*          
          <li>
            <a href="#" className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 group">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-indigo-200">
                <i className="fas fa-users text-indigo-600"></i>
              </div>
              <span className="font-medium">Customers</span>
            </a>
          </li>
          
         
          <li>
            <a href="#" className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 group">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-indigo-200">
                <i className="fas fa-tags text-indigo-600"></i>
              </div>
              <span className="font-medium">Categories</span>
            </a>
          </li>
          
       
          <li>
            <a href="#" className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 group">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-indigo-200">
                <i className="fas fa-chart-bar text-indigo-600"></i>
              </div>
              <span className="font-medium">Analytics</span>
            </a>
          </li>
          
   
          <li>
            <a href="#" className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 group">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-indigo-200">
                <i className="fas fa-bullhorn text-indigo-600"></i>
              </div>
              <span className="font-medium">Marketing</span>
            </a>
          </li>
          
 
          <li>
            <a href="#" className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 group">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-indigo-200">
                <i className="fas fa-cog text-indigo-600"></i>
              </div>
              <span className="font-medium">Settings</span>
            </a>
          </li> */}
        </ul>
      </nav>
      
   
      {/* <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <img className="w-10 h-10 rounded-full mr-3" src="https://picsum.photos/seed/admin/40/40.jpg" alt="Admin"/>
          <div>
            <p className="text-sm font-medium text-gray-800">Admin User</p>
            <p className="text-xs text-gray-500">admin@shop.com</p>
          </div>
        </div> */}
      {/* </div> */}
    </div>
  </>

  );
};

export default AdminSidebar;

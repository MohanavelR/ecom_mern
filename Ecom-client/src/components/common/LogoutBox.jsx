import React, { useContext, useEffect, useState } from 'react'
import { MessageContaxt } from '../../context/message_context'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/auth-slice'

const LogoutBox = () => {
   const {logoutOpen,setLogoutOpen,setIsSuccess,setMessage,setMessageDisplay }= useContext(MessageContaxt)
   const [isLoading,setLoading]=useState(false) 
   const dispatch=useDispatch()
   function handleLogout(){
    setLoading(true)
    dispatch(logout()).then(data=>{  
       if (data?.payload?.isSuccess){
        setMessageDisplay(true)
        setMessage(data.payload.message)
        setIsSuccess(data.payload.isSuccess)
        setLoading(false)
        setLogoutOpen(false)
      }
      else{
        setMessageDisplay(true)
        setMessage(data.payload.message)
        setIsSuccess(data.payload.isSuccess)
        setLoading(false)
        setLogoutOpen(false)
      }
      }) 
   }
  function closebtn(){
    setLogoutOpen(false)
  }
   return (
    <div className={`fixed hover-duration z-[600] right-0 bottom-0 top-0 transform ${logoutOpen ?"flex":"hidden"} left-0  p-5  justify-center items-center w-screen min-h-screen bg-black/70`}>
        <div className=' w-sm md:w-lg rounded-2xl p-5  bg-white min-h-35' >
             <h1 className='text-center text-2xl font-bold'>Logout</h1>
             <p className='text-center my-3 text-lg'>Are you sure to Logout ? </p>
             <div className='flex justify-between mt-6'>
                 <button onClick={closebtn} className='cursor-pointer  hover-duration py-3 px-8 rounded-full hover:bg-black/90 text-white bg-black'>close</button>
                 <button onClick={handleLogout} className='cursor-pointer  hover-duration py-3 px-8 rounded-full hover:bg-red-700/90 text-white bg-red-700'>{isLoading?<div className='loader'></div>:"Logout"}</button>
             </div>
        </div>
    </div>
  )
}

export default LogoutBox
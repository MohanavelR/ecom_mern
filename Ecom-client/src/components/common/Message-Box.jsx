import React, { useContext, useEffect, useState } from 'react'
import { MessageContaxt } from '../../context/message_context'

const MessageBox = () => {
    
    const { setIsSuccess,setMessage,setMessageDisplay,message,messageDisplay,isSuccess} = useContext(MessageContaxt)
    
    // close method
    function closeMessage(){
        setMessageDisplay(false)
    }

    useEffect(()=>{
    if(messageDisplay){     
        setTimeout(()=>{
        setMessageDisplay(false)
        setIsSuccess(false)
        setMessage(null)
        },2000)       
    }
    },[messageDisplay])
    return (
<>

<div className={`w-screen z-[920] p-5  transform transition-all duration-700  justify-end ${messageDisplay ? "flex opacity-100":"hidden opacity-0"}`}>
   {
     isSuccess?
    <div id="success-message" className={`bg-green-100 hover-duration z-[900] ${messageDisplay ? "block opacity-100":"hidden opacity-0"}   border-l-4 border-green-500 w-full md:w-[50%]   p-4 rounded shadow-md`}>
             <div className="flex items-center p-4">
                 <div className="flex-shrink-0">
                     <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                     </svg>
                 </div>
                 <div className="ml-3">
                     <h3 className="text-sm font-medium text-green-800">Success!</h3>
                     <div className="mt-1 text-lg text-green-700">
                        {message}
                     </div>
                 </div>
                 <button type="button" onClick={closeMessage} className="ml-auto flex-shrink-0 text-green-500 hover:text-green-700">
                     <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                         <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                     </svg>
                 </button>
             </div>
     </div>:
         <div id="error-message" className={`bg-red-200 w-full border-l-4 md:w-[50%]  border-red-500 p-4 rounded shadow-md`}>
             <div className="flex items-center">
                 <div className="flex-shrink-0">
                     <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                     </svg>
                 </div>
                 <div className="ml-3 ">
                     <h3 className="text-sm font-medium text-red-800">Error!</h3>
                     <div className="mt-1 text-lg text-red-700">
                          {message}
                     </div>
                 </div>
                 <button type="button" onClick={closeMessage} className="ml-auto flex-shrink-0 text-red-500 hover:text-red-700">
                     <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                         <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                     </svg>
                 </button>
             </div>
        </div>
   }      
 </div>

</>
)
}

export default MessageBox
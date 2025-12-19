import React from 'react'
import { useNavigate } from 'react-router-dom'

const PaymentSuccess = () => {

   const nav=useNavigate()

  return (
    <>

<div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center p-4">
  <div className="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden">
    {/* <!-- Header with success animation --> */}
    <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center">
      <div className="flex justify-center mb-4">
        <div className="relative">
          {/* <!-- Success circle --> */}
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center animate-ping absolute"></div>
            {/* <!-- Checkmark icon --> */}
            <svg className="w-10 h-10 text-green-600 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>
      </div>
      <h1 className="text-3xl font-bold text-white mb-2">Payment Successfully!</h1>
      <p className="text-green-100">Your transaction has been completed</p>
    </div>  
  </div>

      <div className="flex  flex-col mt-6 sm:flex-row gap-3">
        <button onClick={()=>nav('/shopping/account')} className="flex-1 whitespace-nowrap bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium py-3 px-4 rounded-xl transition duration-300 flex items-center justify-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
          </svg>
          View Order Details
        </button>
        <button onClick={()=>nav('/shopping/home')}  className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-xl transition duration-300 flex items-center justify-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          Return to Home
        </button>
      </div>
</div>  
    </>
  )
}

export default PaymentSuccess
import React from 'react'

const NotAvailable = () => {
  return (
    <>
     <div className="bg-gradient-to-br w-full from-gray-50 to-gray-100 h-[400px] flex items-center justify-center p-4">
    <div className="text-center animate__animated animate__fadeIn">
      <div className="mb-6 inline-block">
  <svg className="w-24 h-24 text-red-500" fill="none" stroke="currentColor" strokeWidth="2"
       viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" strokeLinejoin="round"
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
    </path>
  </svg>
</div>
       <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
  Not Available Products
</h1>
    </div>
</div>

    </>
  )
}

export default NotAvailable

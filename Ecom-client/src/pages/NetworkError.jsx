
import React from 'react'

const NetworkError = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
            <svg className="w-24 h-24 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
                <line x1="6" y1="6" x2="18" y2="18" stroke-linecap="round" strokeLinejoin="round" strokeWidth="2"></line>
            </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Network Error</h1>
        <p className="text-gray-600 mb-8">
            Oops! It seems you are not connected to the internet. Please check your connection and try again.
        </p>
        <button className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
            Retry
        </button>
    </div>
    </div>
  )
}

export default NetworkError

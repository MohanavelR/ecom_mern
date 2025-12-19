import React from 'react'

const NotFound = () => {
  return (
    <div className='bg-gray-100 min-h-screen flex items-center justify-center p-4'>
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8 text-center">
         
            <div className="text-9xl font-extrabold text-gray-200 mb-4">404</div>
    
            
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h1>
            <p className="text-gray-600 mb-6">Oops! The page you're looking for doesn't exist or has been moved.</p>
            
       
            <a href="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300">
                Go to Homepage
            </a>
        </div>
        
        
        <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
    </div>
    </div>
  )
}

export default NotFound

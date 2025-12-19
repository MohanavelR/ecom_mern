import React from 'react'

const HomeShopCard = ({product}) => {
  return (
    <>
<div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 mx-auto">
            {/* <!-- Product Image --> */}
            <div className="relative">
                <img src={product?.image} alt="Product Image" className="w-full h-64 object-cover"/>
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">SALE</div>
            </div>
            
            {/* <!-- Product Details --> */}
            <div className="p-5">
                {/* <!-- Category and Brand --> */}
                <div className="flex justify-between items-start mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">{product?.category}</span>
                    <span className="text-gray-600 text-sm">Brand: <span className="font-medium">{product?.brand}</span></span>
                </div>
                
                {/* <!-- Title --> */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product?.title}</h3>
                
                {/* <!-- Description --> */}
                <p className="text-gray-600 text-sm mb-4">{product?.description}</p>
                
                {/* <!-- Price Section --> */}
                <div className="flex items-center mb-4">
                    <div className="mr-2">
                        <span className="text-2xl font-bold text-gray-900">{product?.sale_price}</span>
                        <span className="text-sm text-gray-500 line-through ml-2">{product?.price}</span>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded ml-auto">35% OFF</span>
                </div>
                
                {/* <!-- Review Section --> */}
                <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400 mr-2">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                    </div>
                    <span className="text-gray-600 text-sm">4.5 (128 reviews)</span>
                </div>
                
                {/* <!-- Stock Information --> */}
                <div className="flex items-center mb-5">
                    <span className="text-green-600 text-sm font-medium">
                        <i className="fas fa-check-circle mr-1"></i>
                        In Stock
                    </span>
                    <span className="text-gray-500 text-sm ml-2">| {product?.stock} available</span>
                </div>
                
                {/* <!-- Add to Cart Button --> */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
                    <i className="fas fa-shopping-cart mr-2"></i>
                    Add to Cart
                </button>
            </div>
</div>

    </>
  )
}

export default HomeShopCard
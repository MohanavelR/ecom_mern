import React, { useState } from 'react'
import capitilize from '../../utils/capitilize'
import { useSelector } from 'react-redux'

const ShopProductCard = ({ product,handleaddToCart, handleProductDetails }) => {
  const {user,isLoading}=useSelector(state=>state.auth)

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden  w-full transition-transform hover:shadow-xl">
        {/* <!-- Product Image --> */}
        <div className="relative  hover:cursor-pointer" onClick={() => handleProductDetails(product._id)}>
          <img src={product?.image} alt={product?.title} className="w-full h-64 object-cover" />
          {
            product?.stock > 0 &&
            <div className="absolute top-3 right-3 px-2  bg-green-600 text-white rounded-2xl shadow  transition">
              sale
            </div>
          }
        </div>

        {/* <!-- Product Details --> */}
        <div className="p-5">
          {/* <!-- Category & Brand --> */}
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-blue-600  bg-blue-100 p-0.5 rounded-sm  tracking-wider">{capitilize(product?.category)}</span>
            <span className="text-xs text-gray-500">Brand :{capitilize(product?.brand)}</span>
          </div>

          {/* <!-- Title --> */}
          <h3 onClick={() => handleProductDetails(product._id)} className=" cursor-pointer text-lg font-bold text-gray-800 mb-1">{product?.title.toUpperCase()}</h3>

          {/* <!-- Description --> */}
          <p className="text-sm text-gray-600 w-[100px] mb-3 truncate">
            {product?.description}
          </p>

          {/* <!-- Price & Stock --> */}
          <div className="flex justify-between items-center mb-3">
              {
               product.sale_price > 0? 
               <div className=''>
              <span className="md:text-lg text-sm  font-bold text-gray-900 whitespace-nowrap"><i className="fa-solid fa-indian-rupee-sign"></i>{product?.sale_price}</span>
              <span className="md:text-sm text-xs text-gray-500 line-through ml-2">{product?.price}</span>
            </div>
            : <span className="md:text-lg text-sm  font-bold text-gray-900 whitespace-nowrap"><i className="fa-solid fa-indian-rupee-sign"></i>{product?.price}</span>
            }
            <span className={`md:text-sm text-xs whitespace-nowrap text-green-600 ${product?.stock > 0 ? "text-green-500" : "text-red-500"} flex items-center`}>
              {
                product?.stock > 0 ?
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span> :
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
              }
              {product?.stock > 0 ?"In":"Out" } Stock |{product?.stock > 0 && <span className=' ms-1 text-gray-500 '> {product?.stock} available</span>}
            </span>
          </div>

          {/* <!-- Rating --> */}

          {/* <!-- Action Buttons --> */}

          <div className="flex space-x-3">
            <button disabled={product?.stock ===0  } onClick={()=>handleaddToCart(product?._id,1,product?.stock )} className="flex-1 bg-blue-600 disabled:bg-red-500 disabled:cursor-default hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
              {product?.stock > 0 ? <i className="fas fa-shopping-cart mr-2"></i>:<i className="fas fa-ban mr-1 text-white"></i>}
             
              {product?.stock > 0 ?"Add To Cart":"Out of Stock"}
              
            </button>
          </div>
        </div>
      </div>

    </>
  )
}

export default ShopProductCard

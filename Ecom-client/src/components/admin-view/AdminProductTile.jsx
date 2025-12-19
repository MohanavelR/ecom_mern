import React, { useContext } from 'react'
import { useDispatch } from 'react-redux';
import { useDeleteProduct, useGetAllProducts } from '../../store/admin-slice/product-slice';
import { MessageContaxt } from '../../context/message_context';

const AdminProductTile = ({product, setEditId, openAddProductForm, setOpenAddProductForm}) => {
 const { setMessage, setIsSuccess, setMessageDisplay } = useContext(MessageContaxt)
    const dispatch=useDispatch()
    function handleDeleteProduct(productId){
     if(confirm("Are Sure To Delete Product?")){
           dispatch(useDeleteProduct(productId)).then((data)=>{
             if(data?.payload?.isSuccess){
                dispatch(useGetAllProducts())
                setMessageDisplay(true)
                setIsSuccess(true)
                setMessage(data?.payload?.message)
             }
             else{
                setMessageDisplay(true)
                setIsSuccess(false)
                setMessage(data?.payload?.message)
             }
           })
     }
    }
    return (
    <>
<div className="max-w-sm bg-white  w-full rounded-lg shadow-md overflow-hidden transition-shadow  duration-300 hover:shadow-xl  mx-auto">
  {/* Product Image */}
  <div className="relative">
    <img 
      src={product?.image} 
      alt="Product Image" 
      className="w-full h-64 transform hover:scale-101 object-cover"
    />
    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
      SALE
    </div>
  </div>
  
  {/* Product Details */}
  <div className="p-5">
    {/* Category and Brand */}
    <div className="flex justify-between items-start mb-2">
      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
        {product?.category}
      </span>
      <span className="text-gray-600 text-sm">
        Brand: <span className="font-medium">{product?.brand}</span>
      </span>
    </div>
    
    {/* Title */}
    <h3 className="text-xl font-bold text-gray-900 mb-2">
      {product?.title}
    </h3>
    
    {/* Description */}
    <p className="text-gray-600 text-sm mb-4">
      {product?.description}
    </p>
    
    {/* Price Section */}
    <div className="flex items-center mb-4">
      <div className="mr-2">
        {
               product.sale_price > 0? 
               <div className=''>
              <span className="md:text-lg text-sm  font-bold text-gray-900 whitespace-nowrap"><i className="fa-solid fa-indian-rupee-sign"></i>{product?.sale_price}</span>
              <span className="md:text-sm text-xs text-gray-500 line-through ml-2">{product?.price}</span>
            </div>
            : <span className="md:text-lg text-sm  font-bold text-gray-900 whitespace-nowrap"><i className="fa-solid fa-indian-rupee-sign"></i>{product?.price}</span>
            }
      </div>
      <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded ml-auto">
        35% OFF
      </span>
    </div>
    
    {/* Review Section */}
   
    
    {/* Stock Information */}
    <div className="flex items-center mb-5">
       <div className="flex justify-between items-center mb-3">
              
            <span className={`md:text-sm text-xs whitespace-nowrap text-green-600 ${product?.stock > 0 ? "text-green-500" : "text-red-500"} flex items-center`}>
              {
                product?.stock > 0 ?
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span> :
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
              }
              {product?.stock > 0 ?"In":"Out" } Stock |{product?.stock > 0 && <span className=' ms-1 text-gray-500 '> {product?.stock} available</span>}
            </span>
          </div>
      {/* <span className="text-gray-500 text-sm ml-2">
        | {product?.stock} available
      </span> */}
    </div>
    
    {/* Action Buttons */}
    <div className="flex space-x-2">
      <button 
        onClick={() => {
          setOpenAddProductForm(!openAddProductForm);
          setEditId(product?._id);
        }}
        className="text-blue-600 hover:text-blue-800 transition-colors p-5 rounded hover:bg-blue-50"
      >
        <i className="fas fa-edit"></i>
        
      </button>
      <button 
        className="text-red-600 hover:text-red-800 transition-colors p-1.5 rounded hover:bg-red-50"
        onClick={()=>handleDeleteProduct(product._id)}
      >
        <i className="fas fa-trash-alt"></i>
      </button>
    </div>
  </div>
</div>
    </>
  )
}

export default AdminProductTile


// 
/*  */
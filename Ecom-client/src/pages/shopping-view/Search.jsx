import React, { useContext, useEffect, useState } from 'react'
import ShopProductCard from '../../components/shopping-view/ShopProductCard'
import { useDispatch, useSelector } from 'react-redux'
import NotAvailable from '../../components/common/NotAvailable'

import ProductView from '../../components/shopping-view/ProductView'
import { useAddToCart, useFetchCartItems } from '../../store/cart-slice'
import { MessageContaxt } from '../../context/message_context'
import { useGetProductDetails } from '../../store/shop/product-slice'
import NotSearch from '../../components/search/NotSearch'
import { resetSearchProducts, useGetSearchProducts } from '../../store/shop/search-slice'


const Search = () => {

  const { isLoading, searchProducts } = useSelector((state) => state.searchProducts)
  const { user   } = useSelector((state) => state.auth)
  const {cartItems}=useSelector(state=>state.shoppingCart)
  const dispatch = useDispatch()
  const { setIsSuccess,setMessage,setMessageDisplay}=useContext(MessageContaxt)
  const [productDetail,setProductDetail]=useState(null)
  const [openProductDetail,setOpenProductDetail]=useState(false)
  
//  

function handleSearch(keyword){
    if(keyword.trim().length >= 3){
    setTimeout(()=>{
        dispatch(useGetSearchProducts(keyword.trim()))
    },1000)
}
else{
    dispatch(resetSearchProducts())
}
}

function handleaddToCart(productId,quantity,stock){
  const data={
   userId:user.id,
   productId,
   quantity
  }
  let getcartItems=cartItems.items
  if(getcartItems.length > 0){
    let indexofcart= getcartItems.findIndex(item=>item.productId==productId)
    if(indexofcart > -1){
      let getquantity=getcartItems[indexofcart].quantity
      if(getquantity + quantity > stock ){
      setMessageDisplay(true)
      setIsSuccess(false)
      setMessage(`Only ${getquantity} Quantity can be Add for This Item `)
      return
      }
    }
  }
 
    dispatch(useAddToCart(data)).then((res)=>{
      if(res?.payload?.isSuccess){
      dispatch(useFetchCartItems(user.id))
      setMessageDisplay(res?.payload?.isSuccess)
      setIsSuccess(res?.payload?.isSuccess)
      setMessage(res?.payload?.message)
      }
    })
  
 
}


function handleProductDetails(productId){
  dispatch(useGetProductDetails(productId)).then((data)=>{
    setOpenProductDetail(true)
    if(data?.payload?.isSuccess){
      setProductDetail(data?.payload?.product)
    }
  })
}
  return (
    <>
    {
      openProductDetail  &&
    <ProductView handleaddToCart={handleaddToCart} setProductDetail={setProductDetail} isLoading={isLoading} productDetail={productDetail}   openProductDetail={openProductDetail} setOpenProductDetail={setOpenProductDetail} />
    } 
             <div class=" flex my-10 justify-center mx-8">
                    <div class="relative  md:w-3xl w-[80%]   font-input ">
                        <input 
                            type="text" 
                            onChange={(e)=>handleSearch(e.target.value)}
                            id="searchInput"
                            placeholder="Search for products..."
                            class="w-full rounded-full px-4 py-4 font-input pl-10 outline-none  pr-4 text-gray-700  bg-gray-100 border border-gray-400 transition-all"
                        />
                        <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    </div>
                </div>
      <div className='flex'>
        <div className=" w-full mt-8">              
          <div className='flex border-b border-gray-300 justify-between py-3 px-10' >
            <h1 className='font-bold text-xl'>Search Products</h1>
            <p className='text-gray-500 hidden md:block'>{searchProducts && (searchProducts.length > 1 ? `${searchProducts.length} Products` : `${searchProducts.length} Product`)} </p>
          </div>
          <div className='p-4 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>

             {
                isLoading ? <div className='w-[90vw] flex z-[100] justify-center items-center'>
                  <div className='loader'></div>
                </div> :
                  (searchProducts && searchProducts.length > 0) ?  searchProducts.map((product, index) => (
                    <ShopProductCard handleaddToCart={handleaddToCart} handleProductDetails={handleProductDetails} setProductDetail={setProductDetail} productDetail={productDetail} key={index} product={product} />
                 )) : <NotSearch/>
}
          </div>

        </div>
      </div>

    </>
  )
}

export default Search

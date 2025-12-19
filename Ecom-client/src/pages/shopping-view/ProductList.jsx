import React, { useContext, useEffect, useState } from 'react'
import ProductFilter from '../../components/shopping-view/ProductFilter'
import ShopProductCard from '../../components/shopping-view/ShopProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { useGetFilterProducts, useGetProductDetails } from '../../store/shop/product-slice/index'
import NotAvailable from '../../components/common/NotAvailable'
import NetworkError from '../NetworkError'
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import createSearchParamsHelper from '../../utils/createSearchParams'
import ProductView from '../../components/shopping-view/ProductView'
import { useAddToCart, useFetchCartItems } from '../../store/cart-slice'
import { MessageContaxt } from '../../context/message_context'
import CartItems from '../../components/shopping-view/CartItems'

const ProductList = () => {
  const [fillterOpen, setFilterOpen] = useState(false)
  const { isLoading, filterProducts, isError } = useSelector((state) => state.shopProducts)
  const { user   } = useSelector((state) => state.auth)
  const {cartItems}=useSelector(state=>state.shoppingCart)
  const dispatch = useDispatch()
  const { setIsSuccess,setMessage,setMessageDisplay}=useContext(MessageContaxt)
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState(null)
  const [searchparams, setSearchParams] = useSearchParams()
  const [productDetail,setProductDetail]=useState(null)
  const [openProductDetail,setOpenProductDetail]=useState(false)
  const nav=useNavigate()
//  

function handleaddToCart(productId,quantity,stock){
  const data={
   userId:user.id,
   productId,
   quantity
  }
  let getcartItems=cartItems?.items
  if(getcartItems?.length > 0){
    let indexofcart= getcartItems.findIndex(item=>item?.productId==productId)
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

 
 
 
  function handlesort(value) {
    setSort(value)
    setFilterOpen(false)
    sessionStorage.setItem('sortItem', value)
  }
  function handleFilter(options, category) {
    let filterobjects = { ...filters }
    const indexofObject = Object.keys(filterobjects).indexOf(options)
    if (indexofObject === -1) {
      filterobjects = {
        ...filterobjects, [options]: [category]
      }
    }
    else {
      const indexOfArray = filterobjects[options].indexOf(category)
      if (indexOfArray === -1) {
        filterobjects[options].push(category)
      }
      else {
        filterobjects[options].splice(indexOfArray, 1)
      }
    }
    setFilters(filterobjects)
    sessionStorage.setItem('filters', JSON.stringify(filterobjects))
  }
  useEffect(() => {
    setSort(sessionStorage.getItem('sortItem') || "")
    setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})
  },[location.search])

  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(useGetFilterProducts({ filterParams: filters, sortParams: sort }))
    }
    dispatch(useGetFilterProducts())
  }, [sort, filters])

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQuery = createSearchParamsHelper(filters)
      
      setSearchParams(new URLSearchParams(createQuery))
    }
  }, [filters])

  return (
    <>
    {
      openProductDetail  &&
    <ProductView handleaddToCart={handleaddToCart} setProductDetail={setProductDetail} isLoading={isLoading} productDetail={productDetail}   openProductDetail={openProductDetail} setOpenProductDetail={setOpenProductDetail} />
    } 
      <div className='flex'>
        <div className='fixed top-20 md:hidden right-2 z-[100] '>
          <button onClick={() => setFilterOpen(!fillterOpen)} className='text-white hover-duration hover:bg-cyan-700  bg-cyan-800 px-10 py-3 rounded-lg font-bold'>
            <i className="fa-solid fa-filter"></i> Filter
          </button>
        </div>
        <ProductFilter handleFilter={handleFilter} sort={sort} setSort={setSort} handlesort={handlesort} filters={filters} setFilters={setFilters} fillterOpen={fillterOpen} setFilterOpen={setFilterOpen} />
        {/* <!-- Main Content Area --> */}
        <div className="flex-1 mt-8">
          <div className='flex border-b border-gray-300 justify-between py-3 px-10' >
            <h1 className='font-bold text-xl'>All Products</h1>
            <p className='text-gray-500 hidden md:block'>{filterProducts && (filterProducts.length > 1 ? `${filterProducts.length} Products` : `${filterProducts.length} Product`)} </p>
          </div>
          <div className='p-4 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>

            {
              isError ? <NetworkError /> : (
                isLoading ? <div className='w-[70vw] flex z-[100] justify-center items-center'>
                  <div className='loader'></div>
                </div> :
                  filterProducts ? filterProducts.length > 0 && filterProducts.map((product, index) => (
                    <ShopProductCard handleaddToCart={handleaddToCart} handleProductDetails={handleProductDetails} setProductDetail={setProductDetail} productDetail={productDetail} key={index} product={product} />
                  )) : <NotAvailable />
              )}

          </div>
        </div>
      </div>

    </>
  )
}

export default ProductList

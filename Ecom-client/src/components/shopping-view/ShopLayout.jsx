import React, { useState,useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import ShopHeader  from './ShopHeader'
import ProductFilter from './ProductFilter'
import ShopProductCard from './ShopProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { useFetchCartItems } from '../../store/cart-slice'
import { useFetchAddresses } from '../../store/shop/address-slice'

const ShopLayout = () => {
  const {user}=useSelector(state=>state.auth)
const dispatch=useDispatch()
  useEffect(()=>{
  dispatch(useFetchCartItems(user.id))
  dispatch(useFetchAddresses(user.id))
},[])
  return (
    <div className=''>
      <ShopHeader/>
    <Outlet/>
    </div>
  )
}

export default ShopLayout

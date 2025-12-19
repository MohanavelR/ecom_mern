import React,{useEffect} from 'react'
import AccountTap from '../../components/Account/AccountTap'
import AddressForm from '../../components/Account/AddressForm'
import { useDispatch, useSelector } from 'react-redux'
import { useFetchAddresses } from '../../store/shop/address-slice'
import { usegetAllOrderByUsers } from '../../store/order-slice'

const AccountShop = () => {
   const {user}= useSelector(state=>state.auth)
   const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(useFetchAddresses(user.id))
    dispatch(usegetAllOrderByUsers(user.id))
  },[])
  return (
    <div>
            <div className="w-full h-[300px] overflow-hidden">
        <img 
          src="https://picsum.photos/seed/banner123/1600/300.jpg" 
          alt="Banner" 
          className="w-full h-full object-cover"
        />
      </div>

     <AccountTap/>

    
    </div>
  )
}

export default AccountShop

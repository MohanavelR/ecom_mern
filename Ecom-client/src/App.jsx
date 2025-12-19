import { useEffect, useState,useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import { AuthLayout } from './components/auth/AuthLayout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import { AdminLayout } from './components/admin-view/AdminLayout'
import { AdminDashboard } from './pages/admin-view/AdminDashboard'
import { AdminProducts } from './pages/admin-view/AdminProducts'
import  AdminFeatures  from './pages/admin-view/AdminFeatures'
import { AdminOrders } from './pages/admin-view/AdminOrders'
import ShopLayout from './components/shopping-view/ShopLayout'
import NotFound from './pages/NotFound'
import HomeShop from './pages/shopping-view/HomeShop'
import AccountShop from './pages/shopping-view/AccountShop'
import ProductList from './pages/shopping-view/ProductList'
import CheckoutShop from './pages/shopping-view/CheckoutShop'
import CheckAuth from './components/common/CheckAuth'
import MessageBox from './components/common/Message-Box'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './store/auth-slice'
import LogoutBox from './components/common/LogoutBox'
import { MessageContaxt } from './context/message_context'
import NetworkError from './pages/NetworkError'
import PaypalReturn from './pages/Payment/PaypalReturn'
import PaypalCancel from './pages/Payment/PaypalCancel'
import PaymentSuccess from './pages/Payment/PaymentSuccess'
import Search from './pages/shopping-view/Search'

function App() {
  const {isAuthenticated, user,isLoading,isError }= useSelector(state=>state.auth )
   const {logoutOpen,setLogoutOpen}= useContext(MessageContaxt)
  const dispatch =useDispatch()
  useEffect(()=>{
    dispatch(checkAuth())
  },[dispatch])
  if(isLoading){
    return <div className='min-h-screen w-full flex justify-center items-center '>
      <div className="loader w-[100px] h-[100px] border-8 "></div>
    </div>
  }
  if(isError){
    return <NetworkError/>
  }
  return (
<>
   <div className='fixed bottom-10 z-[920]  right-2'>
   <MessageBox/>
   </div>
   <LogoutBox/>

    <Routes>
       <Route path='/' element={
         <CheckAuth isAuthenticated={isAuthenticated} user={user} >
            
          </CheckAuth>
       }/>
        <Route path='/auth' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user} >
            <AuthLayout/>
          </CheckAuth>
        }>
           <Route path='login' element={<Login/>}/>
           <Route path='register' element={<Register/>}/>
        </Route>
        <Route path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user} >
            <AdminLayout/>
          </CheckAuth>
          }>
              <Route path='dashboard' element={<AdminDashboard/>}/>
              <Route path='products' element={<AdminProducts/>}/>
              <Route path='features' element={<AdminFeatures/>}/>
              <Route path='orders' element={<AdminOrders/>}/>
                    
        </Route>
        <Route element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user} >
            <ShopLayout/>
          </CheckAuth>
          } path='/shopping'>
        <Route path='home' element={<HomeShop/>} />
        <Route path='account' element={<AccountShop/>} />
        <Route path='products' element={<ProductList/>} />
        <Route path='checkout' element={<CheckoutShop/>} />
        <Route path='paypal-return' element={<PaypalReturn/>} />
        <Route path='paypal-cancel' element={<PaypalCancel/>} />
        <Route path='payment-success' element={<PaymentSuccess/>} />
        <Route path='search' element={<Search/>} />
        </Route>
        <Route element={<NotFound/>} path='*'/>
    </Routes>
    </>
  )
}

export default App

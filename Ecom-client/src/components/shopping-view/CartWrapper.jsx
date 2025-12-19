import React from 'react'
import CartItems from './CartItems'
import { useSelector } from 'react-redux'
import NotAvailable from '../common/NotAvailable'
import { useNavigate } from 'react-router-dom'

const CartWrapper = ({ openCart, setOpenCart }) => {
    const navigate=useNavigate()
    const {cartItems} =useSelector(state=>state.shoppingCart)
    const totalAmount = cartItems?.items?.length > 0
  ? cartItems.items.reduce((sum, item) => sum + ((item?.sale_price > 0?item?.sale_price:item.price)*item?.quantity || 0), 0)
  : 0;
    return (
        <>
            <div className="fixed top-0 left-0 right-0 items-center  z-[901] overflow-auto h-screen bg-gray-50 flex flex-col">
                {/* Close Button */}
                <div className='relative w-[90%] z-[600]'>
                    <div className="absolute  top-2 right-10 ">
                        <button onClick={() => setOpenCart(!openCart)} className="bg-black hover:bg-black/60 hover-duration text-white rounded-full p-2 shadow-lg  transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    {/* <!-- Main Cart Content --> */}
                    <div className="flex-1 mt-5">
                        <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Shopping Cart</h1>

                        {/* <!-- Cart Items --> */}
                        <div className="space-y-4">
                          {
                            (cartItems &&cartItems.items && (cartItems.items).length > 0)?
                            (cartItems?.items).map((item,index)=>(
                                <CartItems key={index} item={item} />
                            ))
                            :<NotAvailable/>
                          }
                        </div>
                    </div>

                    {/* <!-- Cart Summary Sidebar --> */}
                    <div className="w-full mt-4">
                        <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                              
                                <div className="border-t border-gray-300 pt-3 mt-3">
                                    <div className="flex justify-between font-bold">
                                        <span>Total</span>
                                        <span className="text-lg whitespace-nowrap"><i className="fa-solid fa-indian-rupee-sign"></i>{totalAmount.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <button onClick={()=>{
                                navigate('checkout')
                                setOpenCart(false)
                            }
                                } className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                Proceed to Checkout
                            </button>

                            <button onClick={() => setOpenCart(!openCart)} className="w-full mt-3 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default CartWrapper

import React, { useContext } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { useDeleteFromCart, useFetchCartItems, useUpdateCartQuantity } from '../../store/cart-slice'
import { MessageContaxt } from '../../context/message_context'
const CartItems = ({ item }) => {
  const dispatch=useDispatch()
  const {user}=useSelector(state=>state.auth)
  const { filterProducts }=useSelector(state=>state.shopProducts)
  const { cartItems }=useSelector(state=>state.shoppingCart)
  const{ setIsSuccess,setMessage,setMessageDisplay} =  useContext(MessageContaxt)
 
 function handleDeleteCart(productId){
  if(confirm("Are Sure To Delete From Cart ?")){
     dispatch(useDeleteFromCart({userId:user.id,productId})).then((data)=>{
        if(data?.payload?.isSuccess){
           dispatch(useFetchCartItems(user.id))
           setMessageDisplay(data?.payload?.isSuccess)
           setIsSuccess(data?.payload?.isSuccess)
           setMessage(data?.payload?.message)
        }
     })
  }
 }

 console.log(item)
function updateQuantityToCart (typeOfAction,productId,quantity){
 if (typeOfAction === 'Inc') {
  const getcartItems = cartItems.items;

  if (getcartItems.length > 0) {
    const indexofcart = getcartItems.findIndex(item => item.productId == productId);

    if (indexofcart > -1) {
      const currentQuantity = getcartItems[indexofcart].quantity;
      const getProductIndex = filterProducts.findIndex(product => product._id === productId);
      const stock = filterProducts[getProductIndex].stock;

      if ((currentQuantity + 1) > stock) {
        setMessageDisplay(true);
        setIsSuccess(false);
        setMessage(`Only ${stock} in stock. You already have ${currentQuantity} in cart.`);
        return;
      }
    }
  }
}

    const data={
        userId:user?.id,
        quantity:typeOfAction==="Inc"?quantity+1:quantity >1? quantity-1:quantity,
        productId
    }

//    let getcartItems=cartItems.items
//   if(getcartItems.length > 0){
//     let indexofcart= getcartItems.findIndex(item=>item.productId==productId)
//     if(indexofcart > -1){
//       let getquantity=getcartItems[indexofcart].quantity
//       if(getquantity + quantity > stock ){
//       setMessageDisplay(true)
//       setIsSuccess(false)
//       setMessage(`Only ${getquantity} Quantity can be Add for This Item `)
//       return
//       }
//     }
//   }
    dispatch(useUpdateCartQuantity(data)).then((res)=>{
       if(res?.payload?.isSuccess){
           dispatch(useFetchCartItems(user.id))
       }
    })
}
    return (
        <>
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <img src={item?.image} alt={item?.title} className="sm:w-[200px] w-full  h-[200px] object-cover rounded-lg" />

                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800">{item?.title}</h3>
                        <p className="text-sm text-gray-500">{item?.brand}</p>

                        <div className="mt-2 flex items-center gap-2">
                         {
               item.sale_price > 0? 
               <div className=''>
              <span className="md:text-lg text-sm  font-bold text-gray-900 whitespace-nowrap"><i className="fa-solid fa-indian-rupee-sign"></i>{item?.sale_price}</span>
              <span className="md:text-sm text-xs text-gray-500 line-through ml-2">{item?.price}</span>
            </div>
            : <span className="md:text-lg text-sm  font-bold text-gray-900 whitespace-nowrap"><i className="fa-solid fa-indian-rupee-sign"></i>{item?.price}</span>
            }
                        </div>
                        <div>
                            <span>Quantity : {item?.quantity}</span>
                        </div>
                        <div className="">
                            <div className="flex items-center">
                                <button
                                    onClick={() => updateQuantityToCart("Dec",item?.productId,item?.quantity)}
                                    className="w-10 h-10 rounded-l-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                    </svg>
                                </button>
                                <div className="w-12 h-10 flex items-center justify-center border-t border-b border-gray-200">
                                    <span className="text-gray-900 font-medium">{item?.quantity}</span>
                                </div>
                                <button
                                    onClick={() => updateQuantityToCart("Inc",item?.productId,item?.quantity)}
                                    className="w-10 h-10 rounded-r-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </button>
                            </div>

                        </div>
                        <span className='whitespace-nowrap'>Total Price :<i className="fa-solid fa-indian-rupee-sign"></i> <span>{((item?.sale_price > 0?item?.sale_price:item.price) * item?.quantity).toFixed(2)}</span>  </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={()=>handleDeleteCart(item.productId)} className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CartItems
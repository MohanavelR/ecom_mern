import React from 'react'
import HomeSlider from './Slider'
import HomeShopCard from '../../components/shopping-view/HomeShopCard'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
const HomeShop = () => {
const {filterProducts}=useSelector((state)=>state.shopProducts)
const navigate=useNavigate()
function handleNavigateToListPage(section,sectionvalue){
  sessionStorage.removeItem('filters')
  const currentFilters = {
    [section]:[sectionvalue]
  }
  sessionStorage.setItem('filters',JSON.stringify(currentFilters))
   navigate('/shopping/products')
}


  return (
    <>
  <HomeSlider/>
     <section className="my-12 px-5   overflow-hidden ">
            <h2 className="text-2xl font-bold mb-6 border-gray-300 text-gray-800 border-b pb-2">Shop by Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {/* <!-- Men Category --> */}
                <b onClick={()=>handleNavigateToListPage('category','men')} className="flex flex-col items-center cursor-pointer p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <i className="fas fa-tshirt text-4xl text-blue-600 mb-3"></i>
                    <span className="font-medium text-gray-800">Men</span>
                </b>
                
                {/* <!-- Women Category --> */}
                <b onClick={()=>handleNavigateToListPage('category','women')}  className="flex flex-col items-center cursor-pointer p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <i className="fas fa-female text-4xl text-pink-600 mb-3"></i>
                    <span className="font-medium text-gray-800">Women</span>
                </b>
                
                {/* <!-- Kids Category --> */}
                <b onClick={()=>handleNavigateToListPage('category','kids')}  className="flex flex-col items-center cursor-pointer p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <i className="fas fa-child text-4xl text-yellow-600 mb-3"></i>
                    <span className="font-medium text-gray-800">Kids</span>
                </b>
                
                {/* <!-- Accessories Category --> */}
                <b onClick={()=>handleNavigateToListPage('category','accessories')}  className="flex flex-col items-center cursor-pointer p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <i className="fas fa-gem text-4xl text-purple-600 mb-3"></i>
                    <span className="font-medium text-gray-800">Accessories</span>
                </b>
                
                {/* <!-- Footwear Category --> */}
                <b onClick={()=>handleNavigateToListPage('category','footwear')}  className="flex flex-col items-center cursor-pointer p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <i className="fas fa-shoe-prints text-4xl text-green-600 mb-3"></i>
                    <span className="font-medium text-gray-800">Footwear</span>
                </b>
            </div>
        </section>

        {/* <!-- Shop by Brand Section --> */}
        <section className='my-10 px-5 '>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-gray-300 border-b pb-2">Shop by Brand</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {/* <!-- Nike --> */}
                <b onClick={()=>handleNavigateToListPage('brand','nike')}  className="flex flex-col items-center cursor-pointer p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <i className="fab fa-nike text-4xl text-gray-800 mb-3"></i>
                    <span className="font-medium text-gray-800">Nike</span>
                </b>
                
                {/* <!-- Reebok --> */}
                <b onClick={()=>handleNavigateToListPage('brand','reebok')}  className="flex flex-col items-center cursor-pointer p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <i className="fas fa-running text-4xl text-blue-800 mb-3"></i>
                    <span className="font-medium text-gray-800">Reebok</span>
                </b>
                {/* <!-- Puma --> */}
                <button onClick={()=>handleNavigateToListPage('brand','puma')}  className="flex flex-col items-center cursor-pointer p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <i className="fas fa-paw text-4xl text-orange-600 mb-3"></i>
                    <span className="font-medium text-gray-800">Puma</span>
                </button>
                
                {/* <!-- Under Armour --> */}
                <button onClick={()=>handleNavigateToListPage('brand','under-armour')}   className="flex flex-col items-center cursor-pointer p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <i className="fas fa-shield-alt text-4xl text-red-600 mb-3"></i>
                    <span className="font-medium text-gray-800">Under Armour</span>
                </button>
                
                {/* <!-- Adidas --> */}
                <button onClick={()=>handleNavigateToListPage('brand','adidas')}   className="flex flex-col items-center cursor-pointer p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <i className="fas fa-shoe-prints text-4xl text-black mb-3"></i>
                    <span className="font-medium text-gray-800">Adidas</span>
                </button>
            </div>
        </section>
       {/* <section>
        <div className='grid grid-cols-1 md:grid-cols-3'>
           {
            filterProducts && filterProducts.length > 0 &&
           filterProducts.map((product,index)=>(
               <HomeShopCard key={index} product={product}  />
           ))
           }
        </div>
       </section> */}
    </>
  )
}

export default HomeShop

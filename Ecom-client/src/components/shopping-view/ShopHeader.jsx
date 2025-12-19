import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { MessageContaxt } from '../../context/message_context';
import CartWrapper from './CartWrapper';
import { useGetFilterProducts } from '../../store/shop/product-slice';

const ShopHeader = () => {
  const {cartItems}=useSelector(state=>state.shoppingCart)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [favoriteItems, setFavoriteItems] = useState(6);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const [dropMenuOpen, setDropMenuOpen] = useState(false)
  const { logoutOpen,setLogoutOpen } = useContext(MessageContaxt)
  const navigate = useNavigate();
  const [openCart,setOpenCart]=useState(false)
  const dispatch=useDispatch()
  const location=useLocation()
  const [searchparams,setSearchParams]=useSearchParams()
  // DropDown Menu
  const DropDownMenu = () => {
    return <>
      <div id="dropdown-menu" className="absolute right-10 top-0 w-70 p-5  bg-white rounded-md shadow-lg overflow-hidden z-[301] ">
        <div className="block px-4 py-2 text-gray-800">Logged in as <span className='text-lg text-blue-800'> {user?.username} </span></div>
        <button onClick={()=>{
          navigate('account')
          setDropMenuOpen(false)
          }} className="flex space-x-2 w-full px-4 py-2 text-gray-800 hover:bg-blue-100"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg><span>Account</span></button>
        <button onClick={() => setLogoutOpen(!logoutOpen)} className="flex w-full px-4 py-2 text-gray-400 hover:bg-blue-100"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" className='fill-gray-500' width="24px" ><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" /></svg> <span className='text-gray-500'>Logout</span></button>
      </div>
    </>
  }
  const navFunction = (path, key) => {
    const newFilters = key !== "home" && key !=="list" ? { category: [key] } : null;
    if (newFilters) {
      sessionStorage.setItem("filters", JSON.stringify(newFilters));
    } else {
      sessionStorage.removeItem("filters");
    }
    location.pathname.includes('products') && newFilters !==null ? setSearchParams(new URLSearchParams(`?category=${key}`))
    :navigate(`${path}`);
 setMobileMenuOpen(!mobileMenuOpen);
  };



  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const toggleDropMenu = () => {
    setDropMenuOpen(!dropMenuOpen)
  }

  return (
    <header className="sticky z-[300]  top-0  bg-white shadow-md">

    {
 openCart && 
     <CartWrapper openCart={openCart} setOpenCart={setOpenCart} />
    } 
      <div className="container mx-auto px-4">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600" width="24" height="24">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span className="text-xl font-bold text-gray-800">Ecommece</span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            <button onClick={() => navFunction("home",'home')} className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Home</button>
            <button onClick={() => navFunction("products","list")} className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Shopping</button>
            <button onClick={() => navFunction("products","men")} className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Men</button>
            <button onClick={() => navFunction("products","women")} className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Women</button>
            <button onClick={() => navFunction("products","footwear")} className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Footwear</button>
            <button onClick={() => navFunction("products","accessories")} className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Accessories</button>
            <button onClick={() => navFunction("products","kids")} className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Kids</button>
          </nav>
          {/* Right Side Icons */}
          {isAuthenticated && (
            <div className="flex items-center space-x-6">
              {/* <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors relative">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <span className="sr-only">Favorites</span>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{favoriteItems}</span>
              </a> */}
               <Link  to="search" className="text-gray-600 hover:text-indigo-600 pt-2">
                <i class="fas fa-search text-xl "></i>
            </Link>
              <button onClick={()=>setOpenCart(!openCart)} className="text-gray-600 hover:text-indigo-600 transition-colors relative">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                  <circle cx="8" cy="21" r="1"></circle>
                  <circle cx="19" cy="21" r="1"></circle>
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                </svg>
                <span className="sr-only">Cart</span>
                {
                 cartItems &&cartItems.items && (cartItems.items).length > 0 &&
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{(cartItems.items).length}</span>
                }
              </button>
              <div className='relative'>
                <button onClick={toggleDropMenu} className="text-gray-600 hover:text-indigo-600 transition-colors relative">
                  <div className='h-8 flex justify-center relative items-center w-8 rounded-full bg-blue-950 text-white'>
                    {user?.username[0].toUpperCase()}
                  </div>
                  <span className="sr-only">User</span>
                </button>
                {
                  dropMenuOpen &&
                  <DropDownMenu />
                }
              </div>
            </div>
          )}
        </div>

        {/* Mobile Header */}
        <div className="flex items-center justify-between h-16 md:hidden">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600" width="20" height="20">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span className="text-lg font-bold text-gray-800">Ecommece</span>
          </div>
          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4">
          
            {/* <a href="#" className="text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <div className="relative">
                <span className="sr-only">Favorites</span>
                <span className="absolute -top-8 -right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{favoriteItems}</span>
              </div>
            </a> */}
             <Link  to="search" className="text-gray-600 hover:text-indigo-600 pt-2">
                <i class="fas fa-search text-xl "></i>
            </Link>
            <button onClick={()=>setOpenCart(!openCart)} className="text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
              </svg>
              <div className="relative">
                <span className="sr-only">Cart</span>
               {
                cartItems &&cartItems.items && (cartItems.items).length > 0 &&
                  <span className="absolute -top-8 -right-3 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{(cartItems?.items).length}</span>
               }
              </div>
            </button>

            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 ms-10"
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
              <span className="sr-only">Menu</span>
            </button>
              <div className='relative'>
              <button onClick={toggleDropMenu} href="#" className="text-gray-600 hover:text-indigo-600 transition-colors relative">
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg> */}
                <div className='h-8 flex justify-center items-center w-8 rounded-full bg-blue-950 text-white'>
                  {user?.username[0].toUpperCase()}
                </div>
                <span className="sr-only">User</span>
              </button>
              
            {
                dropMenuOpen &&
                <DropDownMenu />
              }
            </div>
          </div>
        </div>
      </div>

      {/* Side Drawer Mobile Menu */}
      <div className={`md:hidden z-[400] fixed transform ${mobileMenuOpen ? " -translate-x-0" : " -translate-x-full"} top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 `}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Menu</h3>
            <button onClick={toggleMobileMenu} className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
        <div className="p-4">
          <nav className="flex flex-col space-y-4">
            <button onClick={() => navFunction("home",'home')} className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Home</button>
              <button onClick={() => navFunction("products","list")} className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Shopping</button>
            <button onClick={() => navFunction("products","men")} className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Men</button>
            <button onClick={() => navFunction("products","women")} className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Women</button>
            <button onClick={() => navFunction("products","footwear")} className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Footwear</button>
            <button onClick={() => navFunction("products","accessories")} className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Accessories</button>
            <button onClick={() => navFunction("products","kids")} className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Kids</button>
          </nav>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/70  "
          onClick={toggleMobileMenu}
        ></div>
      )}
    </header>
  );
};

export default ShopHeader;
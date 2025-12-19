import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import { MessageContaxt } from '../../context/message_context'


 const AdminHeader = ({sidebarOpen,setSidebarOpen}) => {
   const {logoutOpen,setLogoutOpen}= useContext(MessageContaxt)
  return (
       <>
      <header className="bg-white z-[300]  shadow-sm border-b border-gray-200">
        <div className="flex justify-between items-center px-6 py-4">
          <button  onClick={()=>setSidebarOpen(!sidebarOpen)} className='transform lg:hidden hover-duration hover:scale-120 top-2 hover:text-black cursor-pointer  text-amber-950'>
              <svg  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" ><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
          </button>
          <div className="lg:flex hidden  items-center">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link to='dashboard' className="text-gray-700 hover:text-indigo-600">
                    <i className="fas fa-home"></i>
                  </Link>
                </li>
              </ol>
            </nav>
          </div>         
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button onClick={()=>setLogoutOpen(!logoutOpen)} className='bg-indigo-950 flex space-x-5 text-white cursor-pointer px-10 py-3 hover:bg-indigo-900 hover-duration rounded-full'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>Logout</button>
            </div>
          </div>
        </div>
      </header>
      
    </>
  )
}
export default AdminHeader
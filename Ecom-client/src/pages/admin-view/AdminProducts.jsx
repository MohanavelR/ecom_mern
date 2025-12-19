import React, { useContext, useState } from 'react'

import { MessageContaxt } from '../../context/message_context'
import AdminProductTile from '../../components/admin-view/AdminProductTile'
import { useSelector } from 'react-redux'
import AddProduct from '../../components/admin-view/forms/AddProduct'
export const AdminProducts = () => {
  const { totalProducts, isLoading } = useSelector(state => state.adminProducts)
  const [ openAddProductForm, setOpenAddProductForm ] = useState(false)
  const [editId,setEditId]=useState(null)
  const [formData,setFormData]=useState(null)
  return (
    <>
      <div className='my-3 flex w-full justify-end'>
        <button onClick={() => setOpenAddProductForm(!openAddProductForm)} className='bg-green-600 cursor-pointer hover-duration hover:bg-green-900 text-white px-10 py-3 rounded-lg'>
         Add Product
        </button>
        <AddProduct setEditId={setEditId} editId={editId} productData={formData} setProductData={setFormData}   openAddProductForm={openAddProductForm} setOpenAddProductForm={setOpenAddProductForm} />
      
      </div>
      {
        isLoading?<div className='w-full flex z-[100] justify-center items-center h-screen'>
             <div className='loader'></div>
        </div>:  
      <div className='grid gap-4  md:grid-cols-3'>
        {
          totalProducts && totalProducts.length > 0 && totalProducts.map((product) => (
            <AdminProductTile  openAddProductForm={openAddProductForm} setOpenAddProductForm={setOpenAddProductForm} product={product} setFormData={setFormData} setEditId={setEditId}  editId={editId}  />
          ))
        }
      </div>
        }
    </>
  )
}

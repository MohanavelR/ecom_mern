import React, { useState, useContext, useRef, useEffect } from 'react'
import { MessageContaxt } from '../../../context/message_context'
import axios from 'axios'
import { deepcopy } from '../../../utils/deepCopy'
import {useDispatch,useSelector} from 'react-redux'
import { useCreateProduct, useGetAllProducts, useUpdateProduct } from '../../../store/admin-slice/product-slice'
import { getAllProducts } from '../../../services/adminservices/product-services/services'

const initialFormData = {
    title: '',
    description: '',
    category: '',
    brand: '',
    price: '',
    sale_price: '',
    stock: '',
    image: null
}

const initialErrors = {
    title: false,
    description: false,
    category: false,
    brand: false,
    price: false,
    stock: false,
    image: false
}

const AddProduct = ({openAddProductForm,editId ,setEditId,setProductData,productData,setOpenAddProductForm}) => {
    const { setMessage, setIsSuccess, setMessageDisplay } = useContext(MessageContaxt)
    const [formData, setFormData] = useState(deepcopy(initialFormData))
    const [errors, setErrors] = useState(deepcopy(initialErrors))
    const [isLoading, setIsLoading] = useState(false)
    const [imageFile, setImageFile] = useState(null)
    const [processbar, setProcessbar] = useState({
        is_show: false,
        percentage: 0,
        loading:false
    })
    const {totalProducts}=useSelector(state=>state.adminProducts)
    const dispatch=useDispatch()
    const inputRef = useRef(null)
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }
// 

useEffect(()=>{
dispatch(useGetAllProducts())
},[])
useEffect(()=>{
    if(editId !==null){
        const editProduct=totalProducts.find((data)=>data._id===editId)
        setFormData(editProduct)

    }
},[editId])

    function handleImageFile(event) {
        const selectedFile = event?.target?.files?.[0]
        if (selectedFile) {
            setImageFile(selectedFile)
        }
    }
    function handleImageDrop(event) {
        event.preventDefault()
        const dropImage = event?.dataTransfer?.files?.[0]
        if (dropImage) {
            setImageFile(dropImage)
            setErrors(prev => ({ ...prev, image: false }))
        } else {
            setImageFile(null)
            setErrors(prev => ({ ...prev, image: true }))
        }
    }

    function handleImageDropOver(event) {
        event.preventDefault()
    }
    const handleCancel = () => {
        setOpenAddProductForm(false)
        setFormData(initialFormData)
        setErrors(initialErrors)
        setImageFile(null)
        setEditId(null)
    }

    function handleSubmit(e) {
        setIsLoading(true)
        e.preventDefault()
        let has_error = false
        const error = { ...initialErrors }

        if (formData.title.trim() === '') {
            error.title = true
            has_error = true
        }
        if (formData.description.trim() === '') {
            error.description = true
            has_error = true
        }
        if (formData.category.trim() === '') {
            error.category = true
            has_error = true
        }
        if (formData.brand.trim() === '') {
            error.brand = true
            has_error = true
        }
        if (formData.price === '' || Number(formData.price) <= 0) {
            error.price = true
            has_error = true
        }
        if (formData.stock === '' || Number(formData.stock) < 0) {
            error.stock = true
            has_error = true
        }
        if (formData.image === null) {
            error.image = true
            has_error = true
        }
        if (!has_error) {
           ( editId?dispatch(useUpdateProduct({productId:editId,formData})):dispatch(useCreateProduct(formData)))
            .then((data)=>{
               if (data?.payload?.isSuccess){
                dispatch(useGetAllProducts())
                setEditId(null)
                setMessageDisplay(true)
                setMessage(data?.payload?.message)
                setIsSuccess(true)
                setFormData(deepcopy(initialFormData))
                setIsLoading(false)
                setImageFile(null)
                setOpenAddProductForm(false)
                
               }  
               else{
                setMessageDisplay(true)
                setMessage(data?.payload?.message)
                setIsSuccess(false)
                setIsLoading(false)
               }  
            })

        } else {
            setErrors({ ...error })
            setIsLoading(false)
            setTimeout(() => {
                setErrors({ ...initialErrors })
            }, 3000)
        }
    }
    async function uploadImageToCloudinary() {
        setIsLoading(true)
        setProcessbar(prev => ({ ...prev, is_show: true, percentage: 0 ,loading:false}));
        const data = new FormData();
        data.append("my_file", imageFile);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/admin/products/upload-image`,
                data,
                {
                    onUploadProgress: (progressEvent) => {
                        const progress = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setProcessbar(prev => ({ ...prev, percentage: Number(progress)-1 }));
                       
                    },
                }
            );

            if (response?.data?.isSuccess) {
                
                setFormData({ ...formData, image: response?.data?.result?.url })
                setProcessbar(prev => ({ ...prev, loading:true,percentage:100 }));
                setIsLoading(false)
            }
            else {
                setMessageDisplay(true)
                setMessage(response?.data?.message)
                setIsSuccess(false)
                setProcessbar({ is_show: false, percentage: 0 });
            }
        } catch (error) {
            setMessageDisplay(true)
            setMessage("Error:" + e.message)
            setIsSuccess(false)
            setProcessbar({ is_show: false, percentage: 0 });
        }
    }
    useEffect(() => {
        if (imageFile !== null && formData.image === null) {
            uploadImageToCloudinary()
        }
    }, [imageFile])

    return (
        <>
 
        <div className={`fixed hover-duration ${openAddProductForm ? "scale-100" : "scale-0"} top-0 z-[500] left-0 w-full p-3   min-h-screen  bg-black/60  flex justify-center items-center`}>
            
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6 text-white">
                    <h1 className="text-2xl font-bold">{editId?"Edit Product":"Add New Product"}</h1>
                   {
                   !editId &&
                    <p className="text-indigo-100 mt-1">Fill in the details below to add a new product to your inventory</p>
                   } 
                </div>

                <form  className="flex-grow p-8 overflow-y-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Product Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData?.title}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                        {errors.title && <p className="text-red-600 text-sm mt-1">Title is required</p>}
                    </div>

                    <div className="col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData?.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-3 border  border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                        {errors.description && <p className="text-red-600 text-sm mt-1">Description is required</p>}
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select
                            name="category"
                            value={formData?.category}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        >
                            <option value="" disabled>Select category</option>
                            <option value="men">Men</option>
                            <option value="women">Women</option>
                            <option value="kids">Kids</option>
                            <option value="accessories">Accessories</option>
                            <option value="footwear">Footwear</option>
                        </select>
                        {errors.category && <p className="text-red-600 text-sm mt-1">Category is required</p>}
                    </div>

                    <div>
                        <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                        <select
                            name="brand"
                            value={formData?.brand}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        >
                            <option value="" disabled>Select brand</option>
                            <option value="nike">Nike</option>
                            <option value="adidas">Adidas</option>
                            <option value="puma">Puma</option>
                            <option value="reebok">Reebok</option>
                            <option value="under-armour">Under Armour</option>
                        </select>
                        {errors.brand && <p className="text-red-600 text-sm mt-1">Brand is required</p>}
                    </div>

                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData?.price}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                        {errors.price && <p className="text-red-600 text-sm mt-1">Price is required</p>}
                    </div>

                    <div>
                        <label htmlFor="sale_price" className="block text-sm font-medium text-gray-700 mb-2">Sale Price ($)</label>
                        <input
                            type="number"
                            name="sale_price"
                            value={formData?.sale_price}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                    </div>

                    <div className="col-span-2">
                        <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">Total Stock</label>
                        <input
                            type="number"
                            name="stock"
                            value={formData?.stock}
                            onChange={handleChange}
                            min="0"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                        {errors.stock && <p className="text-red-600 text-sm mt-1">Stock is required</p>}
                    </div>
                    <div className="w-full col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                        <div className="flex flex-col  items-center justify-center w-full">
                            <label
                                onDrag={handleImageDrop}
                                onDragOver={handleImageDropOver}
                                for="product-image"
                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 2MB)</p>
                                </div>
                                <input
                                    onChange={handleImageFile}

                                    disabled={imageFile !== null}
                                    ref={inputRef}
                                    id="product-image" type="file" className="hidden " accept="image/*" />
                            </label>
                        </div>
                        {
                            editId ?(formData?.image&&<div className='text-center flex justify-center space-x-5 '>
                                <p className='truncate'>{formData?.image}</p>
                                <button onClick={() => {
                                    setImageFile(null)
                                    setFormData({ ...formData, image: null })
                                    if (inputRef.current) {
                                        inputRef.current.value = ''
                                    }
                                }} className='cursor-pointer '>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" ><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                                </button>
                            </div>):

                            imageFile && (processbar.loading ? 
                            <div className='text-center flex justify-center space-x-5 '>
                                <p>{imageFile?.name}</p>
                                <button onClick={() => {
                                    setImageFile(null)
                                    setFormData({ ...formData, image: null })
                                    if (inputRef.current) {
                                        inputRef.current.value = ''
                                    }
                                }} className='cursor-pointer '>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" ><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                                </button>
                            </div>:<div className='flex justify-center text-gray-400'>Loading...</div>)
                        }
                        {
                            errors.image && <p className='text-red-600 text-sm'>Image is required</p>
                        }
                    </div>
                    {processbar.is_show && imageFile && (
                        <div className="w-full col-span-2 mt-1">
                            <div className='flex w-full justify-between' >
                            <p className="text-sm mb-1">{processbar.percentage}%</p>
                            {
                               processbar.loading ?<span className='text-gray-400'>uploaded !</span>:<span className='text-gray-400'>uploading...</span>
                            }
                            </div>

                            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                                <div
                                    className="bg-green-500 h-4 rounded-full transition-all duration-300"
                                    style={{ width: `${processbar.percentage}%` }}
                                ></div>
                            </div>
                        </div>
                    )}






                </form>

                <div className="p-6 border-t border-t-gray-300 bg-gray-50 flex justify-end space-x-4">
                    <button
                        type="button"
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                        onClick={handleCancel}
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-3 cursor-pointer disabled:cursor-progress disabled:bg-indigo-900 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
                        onClick={handleSubmit}
                        disabled={isLoading && !processbar.loading }
                    >
                        {isLoading ? <div className='loader border-t-amber-50 border-r-amber-50'></div> : editId?"Update Product":'Add Product'}
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}

export default AddProduct;

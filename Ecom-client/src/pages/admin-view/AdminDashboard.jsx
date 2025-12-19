import React, { useState, useContext, useRef, useEffect } from 'react'
import { MessageContaxt } from '../../context/message_context'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useAddFeatureImage, useGetFeatureImage } from '../../store/feature-slice';

export const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const {images}=useSelector(state=>state.featureImage)
  const [image, setImage] = useState(null);
  const inputRef = useRef(null);
  const dispatch = useDispatch()

 const { setMessage, setIsSuccess, setMessageDisplay } = useContext(MessageContaxt)
  const [processbar, setProcessbar] = useState({
    is_show: false,
    percentage: 0,
    loading: false,
  });

  function handleImageFile(event) {
    const selectedFile = event?.target?.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  }

  async function uploadImageToCloudinary() {
    setIsLoading(true);
    setProcessbar({ is_show: true, percentage: 0, loading: false });

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
            setProcessbar(prev => ({
              ...prev,
              percentage: Math.min(progress - 1, 99)
            }));
          },
        }
      );

      if (response?.data?.isSuccess) {
        setImage(response.data.result.url);
        setProcessbar({ is_show: true, percentage: 100, loading: true });
      } else {
        setProcessbar({ is_show: false, percentage: 0, loading: false });
      }
    } catch (error) {
      console.error("Upload failed:", error);
      setProcessbar({ is_show: false, percentage: 0, loading: false });
    } finally {
      setIsLoading(false);
    }
  }
  function handleSubmit(e) {
    setIsLoading(true)
    e.preventDefault()
    if(image){
       dispatch(useAddFeatureImage({image})).then((data)=>{
        if(data.payload?.isSuccess){
          setMessageDisplay(true)
          setIsSuccess(true)
          setMessage(data.payload?.message)
           setIsLoading(false)
           setImageFile(null)
           setImage(null)
           dispatch(useGetFeatureImage())
        }
        else{
           setMessageDisplay(true)
          setIsSuccess(false)
          setMessage(data.payload?.message)
        }
       })
    }
    else{
      setMessageDisplay(true)
          setIsSuccess(false)
          setMessage("Select Image")
           setIsLoading(false)
    }

  }

  useEffect(() => {
    if (imageFile && !image) {
      uploadImageToCloudinary();
    }
  }, [imageFile]);

  const handleReset = () => {
    setImage(null);
    setImageFile(null);
    inputRef.current.value = '';
    setProcessbar({ is_show: false, percentage: 0, loading: false });
  };

  return (
    <>
      <form className="flex-grow border-b border-gray-300 p-8 overflow-y-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Feature Image</label>
          <div className="flex flex-col items-center justify-center w-full">
            <label
              htmlFor="product-image"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 2MB)</p>
              </div>
              <input
                id="product-image"
                type="file"
                accept="image/*"
                ref={inputRef}
                disabled={imageFile !== null}
                onChange={handleImageFile}
                className="hidden"
              />
            </label>
          </div>

          {/* Uploaded Image URL + Clear Button */}
          {image && (
            <div className='text-center flex justify-center items-center space-x-3 mt-2'>
              <p className='truncate max-w-xs text-sm '>{imageFile?.name}</p>
              <button onClick={handleReset} type="button" className='cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="red">
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </button>
            </div>
          )}

          {/* Image File with Progress or Loading */}
          {imageFile && !image && (
            <div className='text-center flex justify-center items-center space-x-3 mt-2 text-sm text-gray-500'>
              {/* <p>{imageFile?.name}</p> */}
              {processbar.loading ? (
                <span className='text-green-500'>Uploaded!</span>
              ) : (
                <span className='text-gray-400'>loading...</span>
              )}
            </div>
          )}

          {/* Progress Bar */}
          {processbar.is_show && imageFile && (
            <div className="w-full col-span-2 mt-2">
              <div className='flex w-full justify-between text-sm'>
                <p>{processbar.percentage}%</p>
                <span className='text-gray-400'>{processbar.loading ? 'Uploaded!' : 'Uploading...'}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mt-1">
                <div
                  className="bg-green-500 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${processbar.percentage}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="px-6 py-3 w-50 cursor-pointer disabled:cursor-progress disabled:bg-indigo-900 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
          onClick={handleSubmit}     
          disabled={isLoading && !processbar.loading }
        >
          {isLoading ? <div className='loader border-t-amber-50 border-r-amber-50'></div> : 'Upload'}
        </button>
      </form>
        <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
          {
            (images && images.length > 0 )?images.map(image=>(

          <div className=''>
            <img className='object-cover' src={image?.image} alt="" />
          </div>  
            )):""
          }
        </div>
    </>


  );
};

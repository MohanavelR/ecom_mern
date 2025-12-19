import React, { useContext, useEffect, useState } from 'react';
import { MessageContaxt } from '../../context/message_context';
import StarRating from '../common/StarRating';
import { useSelector, useDispatch } from 'react-redux'
import { resetReviews, useAddReview, useGetProductReview } from '../../store/review-slice';
const ProductView = ({ productDetail, handleaddToCart, isLoading, setProductDetail, openProductDetail, setOpenProductDetail }) => {
  const [quantity, setQuantity] = useState(1);
  const { user } = useSelector(state => state.auth)
  const { reviews } = useSelector(state => state.review)
  const dispatch = useDispatch()
  const { setMessageDisplay, setIsSuccess, setMessage } = useContext(MessageContaxt)
  const [showReviews, setShowReviews] = useState(false);
  
  const averageReview = (reviews && reviews.length > 0)
  ? (reviews.reduce((sum, cur) => sum + cur.reviewValue, 0) / reviews.length)
  : 0;

  const [rating, setRating] = useState(0);
  const [reviewMessage, setReviewMessage] = useState("")
  function handleRatingChange(star) {
    setRating(star)
  }
  function handleAddReview() {
    const data = {
      userId: user.id,
      productId: productDetail._id,
      reviewMessage,
      userName: user.username,
      reviewValue: rating
    }
    dispatch(useAddReview(data)).then((res) => {
      if (res?.payload?.isSuccess) {
        setMessage(res?.payload?.message)
        setMessageDisplay(true)
        setIsSuccess(res?.payload?.isSuccess)
        dispatch(useGetProductReview(productDetail?._id))
        setRating(0)
        setReviewMessage('')
      }
      else {
        setMessage(res?.payload?.message)
        setMessageDisplay(true)
        setIsSuccess(res?.payload?.isSuccess)
      }
    })
  }

  useEffect(() => {
    if(productDetail !==null){
      dispatch(useGetProductReview(productDetail._id))
    }
  }, [productDetail])

  function closeProductView() {
    setOpenProductDetail(!openProductDetail)
    setProductDetail(null)
    dispatch(resetReviews())
  }
  const incrementQuantity = (value) => {
    if (quantity < value && quantity < 3) {
      setQuantity(quantity + 1);
    }
    else {
      setMessageDisplay(true)
      setIsSuccess(false)
      setMessage("Stock Not Available")
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  useEffect(() => {
    if (productDetail === null) setOpenProductDetail(false)
  })
  return (

    <>
      {
        isLoading ? <div>
          <div className='loader'></div>
        </div> :
          <div className="fixed top-0 left-0 right-0 items-center  z-[901] overflow-auto h-screen bg-gray-50 flex flex-col">
            {/* Close Button */}
            <div className='relative w-[90%] z-[600]'>
              <div className="absolute  top-2 right-10 ">
                <button onClick={closeProductView} className=" bg-black hover:bg-black/60 hover-duration text-white rounded-full p-2 shadow-lg  transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 flex items-center justify-center ">
                <div className="w-screen p-2 bg-white  overflow-hidden">
                  <div className="md:flex">
                    {/* Product Image */}
                    <div className="md:w-1/2 relative">
                      <img
                        src={productDetail?.image}
                        alt="Product"
                        className="w-full h-96 md:h-full object-cover"
                      />
                    </div>
                    {/* Product Details */}
                    <div className="md:w-1/2 p-8 flex flex-col">
                      {/* Product Info */}
                      <div>
                        {/* <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">Premium</span> */}
                        <h1 className="text-xl md:text-3xl font-bold text-gray-900 mt-2">{productDetail?.title}</h1>
                        {/* <p className="text-gray-500 mt-1">SKU: WH-1000XM5</p> */}
                      </div>

                      {/* Price */}
                      <div className="mt-6">
                        <div className="flex items-end">
                          {
                            productDetail.sale_price > 0 ?
                              <div className=''>
                                <span className="md:text-lg text-sm  font-bold text-gray-900 whitespace-nowrap"><i className="fa-solid fa-indian-rupee-sign"></i>{productDetail?.sale_price}</span>
                                <span className="md:text-sm text-xs text-gray-500 line-through ml-2">{productDetail?.price}</span>
                              </div>
                              : <span className="md:text-lg text-sm  font-bold text-gray-900 whitespace-nowrap"><i className="fa-solid fa-indian-rupee-sign"></i>{productDetail?.price}</span>
                          }
                          <span className="ml-2 text-xs whitespace-nowrap text-green-600 font-semibold">Save 14%</span>
                        </div>
                      </div>

                      {/* Stock Status */}
                      <div className="mt-4">
                        <span className={`md:text-sm text-xs whitespace-nowrap text-green-600 ${productDetail?.stock > 0 ? "text-green-500" : "text-red-500"} flex items-center`}>
                          {
                            productDetail?.stock > 0 ?
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span> :
                              <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                          }
                          {productDetail?.stock > 0 ? "In" : "Out"} Stock |{productDetail?.stock > 0 && <span className=' ms-1 text-gray-500 '> {productDetail?.stock} available</span>}
                        </span>
                      </div>

                      {/* Description */}
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-900">Description</h3>
                        <p className="mt-2 text-gray-600 leading-relaxed">
                          {productDetail?.description}
                        </p>
                      </div>

                      {/* Product Details */}
                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Category</p>
                          <p className="font-medium bg-blue-100 mt-3 inline p-1 rounded-sm text-gray-900">{productDetail?.category.toUpperCase()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Brand</p>
                          <p className="font-medium text-blue-900">{productDetail?.brand.toUpperCase()}</p>
                        </div>
                      </div>
                       <div className='flex mt-3 space-x-1 '>

                       <div className='flex space-x-1 text-yellow-400 '>
                       {[...Array((averageReview))].map((_, index) => (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>

                      ))} 
                       </div>
                       <sub className='mt-2'>({averageReview.toFixed(1)})</sub>
                       </div>
                      {/* Quantity Selector */}
                      <div className="mt-8">
                        <p className="text-sm text-gray-500 mb-2">Quantity</p>
                        <div className="flex items-center">
                          <button
                            onClick={decrementQuantity}
                            className="w-10 h-10 rounded-l-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <div className="w-12 h-10 flex items-center justify-center border-t border-b border-gray-200">
                            <span className="text-gray-900 font-medium">{quantity}</span>
                          </div>
                          <button
                            onClick={() => incrementQuantity(productDetail?.stock)}
                            className="w-10 h-10 rounded-r-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Add to Cart Button */}
                      <div className="mt-6">
                        <button disabled={productDetail?.stock === 0} onClick={() => handleaddToCart(productDetail?._id, quantity, productDetail?.stock)} className=" w-full bg-blue-600 disabled:bg-red-500 disabled:cursor-default hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
                          {productDetail?.stock > 0 ? <i className="fas fa-shopping-cart mr-2"></i> : <i className="fas fa-ban mr-1 text-white"></i>}

                          {productDetail?.stock > 0 ? "Add To Cart" : "Out of Stock"}
                        </button>
                      </div>

                    </div>
                  </div>
                  {/* Reviews Section */}
                  <div className="my-8 ">
                    {/* Comment Input */}
                    <div className="mt-4 p-2">
                      <textarea
                        placeholder="Add your review..."
                        value={reviewMessage}
                        onChange={(e) => setReviewMessage(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                        rows="3"
                      ></textarea>
                      <div className='flex space-x-8 '>
                        <StarRating rating={rating} handleRatingChange={handleRatingChange} />
                        <button onClick={handleAddReview} disabled={(rating > 0 && reviewMessage !== "") ? false : true} className="mt-2  bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 disabled:bg-blue-400 disabled:cursor-not-allowed rounded-lg font-medium transition-colors">
                          Submit
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowReviews(!showReviews)}
                      className="flex ms-2 px-5 py-2 rounded-sm  bg-cyan-800 text-white mb-20  mt-5 items-center  font-medium"
                    >
                      <span>Reviews</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ml-1 transform hover-duration transition-transform ${showReviews ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {showReviews &&
                      <div className="mt-2 w-full mb-20 space-y-2">
                        {/* Review Item */}
                        {
                          (reviews && reviews.length > 0) ?
                            reviews.map((review) => (
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center">
                                  <div alt="User" className="w-10 text-white font-extrabold flex items-center justify-center bg-blue-900 h-10 rounded-full" >
                                    {review.userName[0].toUpperCase()}
                                  </div>
                                  <div className="ml-3">
                                    <p className="font-medium text-gray-900">{review.userName}</p>
                                    <div className="flex text-yellow-400 mt-1">
                                     
                                      {[...Array(review.reviewValue)].map((_, index) => (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>

                                      ))}

                                    </div>
                                  </div>
                                </div>
                                <p className="mt-2 text-gray-600">{review.reviewMessage}</p>
                              </div>
                            ))
                            : <p>No Reviews</p>


                        }

                      </div>
                    }

                  </div>
                </div>
              </div>
            </div>
          </div>
      }
    </>
  );
};

export default ProductView;
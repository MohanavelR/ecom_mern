import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
const HomeSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
 const navigate=useNavigate()
  const slides = [
    {
      id: 1,
      image: "https://picsum.photos/seed/product1/1200/800.jpg",
      title: "Premium Headphones",
      price: "$129.99",
      description: "Wireless noise-cancelling headphones with premium sound quality",
      discount: "20% OFF"
    },
    {
      id: 2,
      image: "https://picsum.photos/seed/product2/1200/800.jpg",
      title: "Smart Watch",
      price: "$199.99",
      description: "Track your fitness and stay connected with our latest smart watch",
      discount: "15% OFF"
    },
    {
      id: 3,
      image: "https://picsum.photos/seed/product3/1200/800.jpg",
      title: "Laptop Pro",
      description: "Powerful laptop for professionals with all-day battery life",
    
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-[90vw] mx-auto overflow-hidden shadow-2xl">
      {/* Slider Container */}
      <div 
        className="flex transition-transform duration-700 ease-in-out" 
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div 
            key={slide.id} 
            className="relative w-full flex-shrink-0"
            style={{ height: '70vh' }}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/50 bg-opacity-40"></div>
            </div>
            
            {/* Content Layer */}
            <div className="relative h-full flex items-center">
              <div className="px-8 md:px-16 max-w-lg">
                {/* Discount Badge */}
                <div className="inline-block mb-4 px-4 py-1 bg-red-600 text-white font-bold rounded-full">
                  {slide.discount}
                </div>
                
                {/* Product Info */}
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {slide.title}
                </h2>
                <p className="text-xl text-white mb-6">{slide.description}</p>
                
                  {/* <div className=''>
                     <button onClick={()=>navigate('/shopping/products')}  className='scale-95 text-green-500 border-green-500 hover-duration  hover:bg-green-500 hover:scale-105 hover:text-white  border-2 rounded-full px-8 py-2 inline'>Get Shop</button>
                  </div> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full text-black transition-all"
      >
        <i className="fas fa-arrow-left"></i>

      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full text-black transition-all"
      >
      <i className="fas fa-arrow-right"></i>
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeSlider;
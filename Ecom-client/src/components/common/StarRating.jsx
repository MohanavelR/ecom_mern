import React, { useState } from 'react'

const StarRating = ({ rating,handleRatingChange }) => {
  const [isSelected, setSelected] = useState(false)
  // function handelStar() {
  //   if (isSelected) {
  //     setSelected(false)
  //   }
  //   else {
  //     setSelected(true)
  //   }
  // }
  return (
    <div>
      {

        [1, 2, 3, 4, 5].map(((star, index) => (
          <button onClick={() => handleRatingChange(star)} className={`p-1  hover-duration   ms-3 rounded-full`}>
            <svg class={`${star <= rating ? "fill-yellow-500" : "fill-black"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="25" height="25" >
              <path d="M287.9 17.8L354 150.2l146.1 21.3c26.2 3.8 36.7 36 17.7 54.6L416 347.1
           l25 145.5c4.5 26.1-23 46-46.4 33.7L288 439.6l-130.6 68.7c-23.4 12.3-50.9-7.6
           -46.4-33.7l25-145.5L58.2 226.1c-19-18.6-8.5-50.8 17.7-54.6L222 150.2 288.1
           17.8c11.7-23.6 45.6-23.9 57.2 0z"/>
            </svg>
          </button>
        )))
      }
    </div>
  )
}

export default StarRating
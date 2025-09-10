
// import { useEffect, useState } from "react";
// import React from 'react'
// import {  getReview } from "Services/review";
// import '../Style/ClientReviews.css'
// import Reviews from "./Review";

// // import {useState} from "react";





// const ClientReviews = () => {
// const [reviews, setReviews] = useState([]);
   
// useEffect(() => {
//     getReview()

//       .then((data) => {
//         if (data.error) {
//           setReviews([]);
//         } else {
//           setReviews(data || []);
//         }
//       })
//       .catch((err) => console.error("Error fetching reviews:", err));
//   }, []);
// console.log(Reviews)
//   return (
//     <div className='reviews'>
//       <h2>what is our client say</h2>
//      {reviews.map((review)=>(
//       <div key={review._id}className='reviews-card'>
//         <p> {review.comment}</p>
//         <h4>{review.author}</h4>
//       </div>
//      ))}
//     </div>
//   )
// }

// export default ClientReviews




import { useEffect, useState } from "react";
import React from "react";
import { getReview } from "Services/review";
import "../Style/ClientReviews.css";

const ClientReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReview()
      .then((data) => {
        if (data.error) {
          setReviews([]);
        } else {
          setReviews(data || []);
        }
      })
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  return (
    <div className="reviews">
      <h2>What our clients say</h2>
      <div className="reviews-scroll">
        {reviews.map((review) => (
          <div key={review._id} className="reviews-card">
            <p>{review.comment}</p>
            <h4>— {review.author}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientReviews;

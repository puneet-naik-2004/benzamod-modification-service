import { useEffect, useState } from "react";
import { postReview, getReview } from "Services/review";
 import "../Style/Review.css";

function Reviews() {
  // const [reviews, setReviews] = useState([]);
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  // ✅ Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!author.trim() || !comment.trim()) {
      alert("Please fill all fields!");
      return;
    }

    const newReview = { author, comment};

    postReview(newReview)
      .then((addedReview) => {
        // setReviews([...reviews, addedReview]);
        resetForm();
      })
      .catch((err) => console.error("Error adding review:", err));
  };

  const resetForm = () => {
    setAuthor("");
    setComment("");
    // setRating(5);
  };

  return (
    <div className="reviews-container">
      {/* Heading */}
      <h2 className="reviews-title">⭐ Customer Reviews</h2>
      <p className="reviews-subtitle">
        Share your experience with us. Your feedback matters!
      </p>
      {/* <h2 className="page-title">⭐ Customer Reviews</h2> */}

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="review-form">
        <input
          type="text"
          placeholder="Your Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

       

        <button type="submit" className="btn btn-primary">
          Submit Review
        </button>
      </form>

    </div>
  );
}

export default Reviews;

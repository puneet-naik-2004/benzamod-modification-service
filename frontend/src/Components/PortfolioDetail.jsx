import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPortfolio, createPortfolio } from "Services/portfolio"; 
import "../Style/PortfolioDetail.css";

export default function PortfolioDetail() {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState(null);

  // Review form fields
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  // Toggle form
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getPortfolio().then((data) => {
      if (!data.error) {
        const found = (data.portfolio || []).find((p) => p._id === id);
        setPortfolio(found || null);
      }
    });
  }, [id]);

  if (!portfolio) return <p>Loading portfolio...</p>;

  // Handle Review Add
  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) {
      alert("Please fill all review fields");
      return;
    }

    const updatedPortfolio = {
      ...portfolio,
      reviews: [
        ...(portfolio.reviews || []),
        {
          name: reviewName,
          rating: reviewRating,
          comment: reviewComment,
        },
      ],
    };

    try {
      await createPortfolio(updatedPortfolio); // replace with updatePortfolio if available
      setPortfolio(updatedPortfolio);

      // reset review form
      setReviewName("");
      setReviewRating(5);
      setReviewComment("");
      setShowForm(false); // hide form after submit
    } catch (err) {
      alert("❌ Failed to add review");
      console.error(err);
    }
  };

  return (
    <div className="portfolio-detail">
      <h2>{portfolio.title}</h2>
      <p>{portfolio.description}</p>
      <p>💰 Price: {portfolio.price}</p>

      <div className="portfolio-images">
        {portfolio.beforePhoto && <img src={portfolio.beforePhoto} alt="Before" />}
        {portfolio.afterPhoto && <img src={portfolio.afterPhoto} alt="After" />}
      </div>

      {/* Reviews */}
      <h3>Reviews ({portfolio.reviews?.length || 0})</h3>
      <ul>
        {portfolio.reviews?.map((r, i) => (
          <li key={i}>
            <strong>{r.name}</strong> ({r.rating}⭐): {r.comment}
          </li>
        ))}
      </ul>

      {/* Toggle Review Form */}
      {!showForm ? (
        <button onClick={() => setShowForm(true)} className="btn-add-review">
          ➕ Add Review
        </button>
      ) : (
        <form onSubmit={handleAddReview} className="review-form">
          <h4>Write Your Review</h4>
          <input
            type="text"
            placeholder="Your Name"
            value={reviewName}
            onChange={(e) => setReviewName(e.target.value)}
          />
          <select
            value={reviewRating}
            onChange={(e) => setReviewRating(Number(e.target.value))}
          >
            <option value="5">⭐⭐⭐⭐⭐ (5)</option>
            <option value="4">⭐⭐⭐⭐ (4)</option>
            <option value="3">⭐⭐⭐ (3)</option>
            <option value="2">⭐⭐ (2)</option>
            <option value="1">⭐ (1)</option>
          </select>
          <textarea
            placeholder="Write your comment..."
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
          />
          <div className="review-buttons">
            <button type="submit" className="btn-submit">
              ✅ Submit
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="btn-cancel"
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      )}

      <br />
      <Link to="/portfolio">⬅ Back to Portfolio</Link>
    </div>
  );
}





// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { createPortfolio, getPortfolio } from "Services/portfolio";
// import "../Style/PortfolioList.css";
// import "../Style/Portfolio.css";

// export function PortfolioListComponent() {
//   const [portfolios, setPortfolios] = useState([]);

//   // Portfolio fields
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [beforePhoto, setBeforePhoto] = useState("");
//   const [afterPhoto, setAfterPhoto] = useState("");
//   const [showForm, setShowForm] = useState(false);

//   // Review fields (👇 under portfolio form)
//   const [reviewName, setReviewName] = useState("");
//   const [reviewRating, setReviewRating] = useState(5);
//   const [reviewComment, setReviewComment] = useState("");

//   // Load portfolios
//   useEffect(() => {
//     getPortfolio().then((data) => {
//       if (!data.error) setPortfolios(data.portfolio || []);
//     });
//   }, []);

//   // Add new portfolio with review
//   const handleAddPortfolio = (e) => {
//     e.preventDefault();
//     if (!title || !price || !beforePhoto || !afterPhoto) {
//       alert("Please fill all required fields");
//       return;
//     }

//     const newPortfolio = {
//       title,
//       description,
//       price,
//       beforePhoto,
//       afterPhoto,
//       reviews: reviewName
//         ? [{ name: reviewName, rating: reviewRating, comment: reviewComment }]
//         : [],
//     };

//     createPortfolio(newPortfolio)
//       .then((addedPortfolio) => {
//         setPortfolios([...portfolios, addedPortfolio]);
//         setShowForm(false);

//         // reset form
//         setTitle("");
//         setDescription("");
//         setPrice("");
//         setBeforePhoto("");
//         setAfterPhoto("");
//         setReviewName("");
//         setReviewRating(5);
//         setReviewComment("");
//       })
//       .catch((err) => console.error("Error adding portfolio:", err));
//   };

//   return (
//     <div className="portfolio-container">
//       <h2>🎨 Portfolio Manager</h2>

//       {/* Toggle Form */}
//       <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
//         {showForm ? "❌ Cancel" : "➕ Add Portfolio"}
//       </button>

//       {/* Form */}
//       {showForm && (
//         <form onSubmit={handleAddPortfolio} className="product-form">
//           <input
//             type="text"
//             placeholder="Product Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <textarea
//             placeholder="Product Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//           <input
//             type="number"
//             placeholder="Price"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Before Photo URL"
//             value={beforePhoto}
//             onChange={(e) => setBeforePhoto(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="After Photo URL"
//             value={afterPhoto}
//             onChange={(e) => setAfterPhoto(e.target.value)}
//           />

//           {/* Review Section */}
//           <h4>⭐ Add First Review</h4>
//           <input
//             type="text"
//             placeholder="Reviewer Name"
//             value={reviewName}
//             onChange={(e) => setReviewName(e.target.value)}
//           />
//           <select
//             value={reviewRating}
//             onChange={(e) => setReviewRating(Number(e.target.value))}
//           >
//             <option value="5">⭐⭐⭐⭐⭐ (5)</option>
//             <option value="4">⭐⭐⭐⭐ (4)</option>
//             <option value="3">⭐⭐⭐ (3)</option>
//             <option value="2">⭐⭐ (2)</option>
//             <option value="1">⭐ (1)</option>
//           </select>
//           <textarea
//             placeholder="Review Comment"
//             value={reviewComment}
//             onChange={(e) => setReviewComment(e.target.value)}
//           />

//           <button type="submit" className="btn btn-success">
//             ✅ Save Portfolio
//           </button>
//         </form>
//       )}

//       {/* Portfolio List */}
//       <div className="products-grid">
//         {portfolios.map((p) => (
//           <div key={p._id} className="product-card">
//             <h3>{p.title}</h3>
//             <Link to={`/portfolio/${p._id}`}>
//               <img
//                 src={p.afterPhoto || p.beforePhoto}
//                 alt={p.title}
//                 className="portfolio-img"
//               />
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPortfolio } from "Services/portfolio";
import "../Style/PortfolioList.css";
import "../Style/Portfolio.css";

export function PortfolioListComponent() {
  const [portfolios, setPortfolios] = useState([]);

  // Load portfolios
  useEffect(() => {
    getPortfolio().then((data) => {
      if (!data.error) setPortfolios(data.portfolio || []);
    });
  }, []);

  return (
    <div className="portfolio-container">
      <h2>🎨 Portfolio Manager</h2>

      {/* Portfolio List */}
      <div className="products-grid">
        {portfolios.map((p) => (
          <div key={p._id} className="product-card">
            <h3>{p.title}</h3>
            <Link to={`/portfolio/${p._id}`}>
              <img
                src={p.afterPhoto || p.beforePhoto}
                alt={p.title}
                className="portfolio-img"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

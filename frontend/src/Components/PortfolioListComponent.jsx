// // import React, { useEffect, useState } from "react";
// // import { createPortfolio, getPortfolio, deletePortfolio } from "Services/portfolio";
// // import "../Style/PortfolioList.css";
// // import "../Style/Portfolio.css";

// // export function PortfolioListComponent() {
// //   const [portfolios, setPortfolios] = useState([]);
// //   const [title, setTitle] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [price, setPrice] = useState("");
// //   const [beforePhoto, setBeforePhoto] = useState("");
// //   const [afterPhoto, setAfterPhoto] = useState("");

// //   // 🔹 Review fields (inside add product form)
// //   const [name, setName] = useState("");
// //   const [rating, setRating] = useState(5);
// //   const [comment, setComment] = useState("");

// //   // 🔹 Load portfolios
// //   useEffect(() => {
// //     getPortfolio().then((data) => {
// //       if (!data.error) setPortfolios(data.portfolio || []);
// //     });
// //   }, []);

// //   // 🔹 Add product with review
// //   const handleAddProduct = (e) => {
// //     e.preventDefault();

// //     if (!title || !price || !beforePhoto || !afterPhoto) {
// //       alert("Please fill all product fields");
// //       return;
// //     }
// //     if (!name || !rating || !comment) {
// //       alert("Please fill review fields");
// //       return;
// //     }

// //     const newProduct = {
// //       title,
// //       description,
// //       price,
// //       beforePhoto,
// //       afterPhoto,
// //       reviews: [
// //         {
// //           name,
// //           rating,
// //           comment,
// //         },
// //       ],
// //     };

// //     createPortfolio(newProduct)
// //       .then((addedPortfolio) => {
// //         setPortfolios([...portfolios, addedPortfolio]);
// //       })
// //       .catch((err) => console.error("Error adding portfolio:", err));

// //     // reset form
// //     setTitle("");
// //     setDescription("");
// //     setPrice("");
// //     setBeforePhoto("");
// //     setAfterPhoto("");
// //     setName("");
// //     setRating(5);
// //     setComment("");
// //   };

// //   // 🔹 Delete portfolio
// //   const handleDelete = (id) => {
// //     if (!window.confirm("Are you sure you want to delete this portfolio?")) return;

// //     deletePortfolio(id)
// //       .then(() => {
// //         setPortfolios(portfolios.filter((p) => p._id !== id));
// //       })
// //       .catch((err) => console.error("Error deleting portfolio:", err));
// //   };

// //   return (
// //     <div className="portfolio-container">
// //       <h2>🎨 Add Portfolio</h2>

// //       <form onSubmit={handleAddProduct} className="product-form">
// //         <input
// //           type="text"
// //           placeholder="Product Title"
// //           value={title}
// //           onChange={(e) => setTitle(e.target.value)}
// //         />
// //         <textarea
// //           placeholder="Product Description"
// //           value={description}
// //           onChange={(e) => setDescription(e.target.value)}
// //         />
// //         <input
// //           type="number"
// //           placeholder="Price"
// //           value={price}
// //           onChange={(e) => setPrice(e.target.value)}
// //         />
// //         <input
// //           type="text"
// //           placeholder="Before Photo URL"
// //           value={beforePhoto}
// //           onChange={(e) => setBeforePhoto(e.target.value)}
// //         />
// //         <input
// //           type="text"
// //           placeholder="After Photo URL"
// //           value={afterPhoto}
// //           onChange={(e) => setAfterPhoto(e.target.value)}
// //         />

// //         {/* Review Section inside Add Product */}
// //         <h4>⭐ Add Review</h4>
// //         <input
// //           type="text"
// //           placeholder="Reviewer Name"
// //           value={name}
// //           onChange={(e) => setName(e.target.value)}
// //         />
// //         <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
// //           <option value="5">⭐⭐⭐⭐⭐ (5)</option>
// //           <option value="4">⭐⭐⭐⭐ (4)</option>
// //           <option value="3">⭐⭐⭐ (3)</option>
// //           <option value="2">⭐⭐ (2)</option>
// //           <option value="1">⭐ (1)</option>
// //         </select>
// //         <textarea
// //           placeholder="Review Comment"
// //           value={comment}
// //           onChange={(e) => setComment(e.target.value)}
// //         />

// //         <button type="submit" className="btn btn-primary">
// //           ➕ Add Portfolio with Review
// //         </button>
// //       </form>

// //       {/* Portfolio List */}
// //       <div className="products-grid">
// //         {portfolios.map((p, index) => (
// //           <div key={index} className="product-card">
// //             <h3>{p.title}</h3>
// //             <p className="price">💰 ${p.price}</p>
// //             <div className="before-after">
// //               <div className="photo-block">
// //                 <h4>Before</h4>
// //                 <img src={p.beforePhoto} alt={`${p.title} before`} />
// //               </div>
// //               <div className="photo-block">
// //                 <h4>After</h4>
// //                 <img src={p.afterPhoto} alt={`${p.title} after`} />
// //               </div>
// //             </div>
// //             <p>{p.description}</p>

// //             {/* Reviews List */}
// //             <div className="reviews-section">
// //               <h4>Customer Reviews</h4>
// //               {p.reviews && p.reviews.length > 0 ? (
// //                 <ul className="review-list">
// //                   {p.reviews.map((r, i) => (
// //                     <li key={i} className="review-card">
// //                       <p>
// //                         <strong>{r.name}</strong> ({r.rating}⭐)
// //                       </p>
// //                       <p>{r.comment}</p>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               ) : (
// //                 <p>No reviews added yet.</p>
// //               )}
// //             </div>

// //             {/* 🔹 Delete Button */}
// //             <button
// //               className="btn btn-danger"
// //               onClick={() => handleDelete(p._id)}
// //             >
// //               🗑️ Delete
// //             </button>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }


// import React, { useEffect, useState } from "react";
// import { createPortfolio, getPortfolio, deletePortfolio } from "Services/portfolio";
// import "../Style/PortfolioList.css";
// import "../Style/Portfolio.css";

// export function PortfolioListComponent() {
//   const [portfolios, setPortfolios] = useState([]);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [beforePhoto, setBeforePhoto] = useState("");
//   const [afterPhoto, setAfterPhoto] = useState("");

//   // Review fields
//   const [name, setName] = useState("");
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");

//   // Show/hide form
//   const [showForm, setShowForm] = useState(false);

//   // Load portfolios
//   useEffect(() => {
//     getPortfolio().then((data) => {
//       if (!data.error) setPortfolios(data.portfolio || []);
//     });
//   }, []);

//   // Add product with review
//   const handleAddProduct = (e) => {
//     e.preventDefault();

//     if (!title || !price || !beforePhoto || !afterPhoto) {
//       alert("Please fill all product fields");
//       return;
//     }
//     if (!name || !rating || !comment) {
//       alert("Please fill review fields");
//       return;
//     }

//     const newProduct = {
//       title,
//       description,
//       price,
//       beforePhoto,
//       afterPhoto,
//       reviews: [
//         {
//           name,
//           rating,
//           comment,
//         },
//       ],
//     };

//     createPortfolio(newProduct)
//       .then((addedPortfolio) => {
//         setPortfolios([...portfolios, addedPortfolio]);
//         setShowForm(false); // hide form after add
//       })
//       .catch((err) => console.error("Error adding portfolio:", err));

//     // reset form
//     setTitle("");
//     setDescription("");
//     setPrice("");
//     setBeforePhoto("");
//     setAfterPhoto("");
//     setName("");
//     setRating(5);
//     setComment("");
//   };

//   // Delete portfolio
//   const handleDelete = (id) => {
//     if (!window.confirm("Are you sure you want to delete this portfolio?")) return;

//     deletePortfolio(id)
//       .then(() => {
//         setPortfolios(portfolios.filter((p) => p._id !== id));
//       })
//       .catch((err) => console.error("Error deleting portfolio:", err));
//   };

//   return (
//     <div className="portfolio-container">
//       <h2>🎨 Portfolio Manager</h2>

//       {/* Toggle Button */}
//       <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
//         {showForm ? "❌ Cancel" : "➕ Add Portfolio"}
//       </button>

//       {/* Form appears only when showForm is true */}
//       {showForm && (
//         <form onSubmit={handleAddProduct} className="product-form">
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
//           <h4>⭐ Add Review</h4>
//           <input
//             type="text"
//             placeholder="Reviewer Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
//             <option value="5">⭐⭐⭐⭐⭐ (5)</option>
//             <option value="4">⭐⭐⭐⭐ (4)</option>
//             <option value="3">⭐⭐⭐ (3)</option>
//             <option value="2">⭐⭐ (2)</option>
//             <option value="1">⭐ (1)</option>
//           </select>
//           <textarea
//             placeholder="Review Comment"
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//           />

//           <button type="submit" className="btn btn-success">
//             ✅ Save Portfolio
//           </button>
//         </form>
//       )}

//       {/* Portfolio List */}
//       <div className="products-grid">
//         {portfolios.map((p, index) => (
//           <div key={index} className="product-card">
//             <h3>{p.title}</h3>
//             <p className="price">💰 ${p.price}</p>
//             <div className="before-after">
//               <div className="photo-block">
//                 <h4>Before</h4>
//                 <img src={p.beforePhoto} alt={`${p.title} before`} />
//               </div>
//               <div className="photo-block">
//                 <h4>After</h4>
//                 <img src={p.afterPhoto} alt={`${p.title} after`} />
//               </div>
//             </div>
//             <p>{p.description}</p>

//             {/* Reviews */}
//             <div className="reviews-section">
//               <h4>Customer Reviews</h4>
//               {p.reviews && p.reviews.length > 0 ? (
//                 <ul className="review-list">
//                   {p.reviews.map((r, i) => (
//                     <li key={i} className="review-card">
//                       <p>
//                         <strong>{r.name}</strong> ({r.rating}⭐)
//                       </p>
//                       <p>{r.comment}</p>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p>No reviews added yet.</p>
//               )}
//             </div>

//             {/* Delete Button */}
//             {/* <button className="btn btn-danger" onClick={() => handleDelete(p._id)}>
//               🗑️ Delete
//             </button> */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }





import React, { useEffect, useState } from "react";
import {
  createPortfolio,
  getPortfolio,
  deletePortfolio,
} from "Services/portfolio";
import "../Style/PortfolioList.css";
import "../Style/Portfolio.css";

export function PortfolioListComponent() {
  const [portfolios, setPortfolios] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [beforePhoto, setBeforePhoto] = useState("");
  const [afterPhoto, setAfterPhoto] = useState("");

  // Review fields
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // Show/hide form
  const [showForm, setShowForm] = useState(false);

  // Modal state
  const [selectedImages, setSelectedImages] = useState(null);

  // Load portfolios
  useEffect(() => {
    getPortfolio().then((data) => {
      if (!data.error) setPortfolios(data.portfolio || []);
    });
  }, []);

  // Add product with review
  const handleAddProduct = (e) => {
    e.preventDefault();

    if (!title || !price || !beforePhoto || !afterPhoto) {
      alert("Please fill all product fields");
      return;
    }
    if (!name || !rating || !comment) {
      alert("Please fill review fields");
      return;
    }

    const newProduct = {
      title,
      description,
      price,
      beforePhoto,
      afterPhoto,
      reviews: [
        {
          name,
          rating,
          comment,
        },
      ],
    };

    createPortfolio(newProduct)
      .then((addedPortfolio) => {
        setPortfolios([...portfolios, addedPortfolio]);
        setShowForm(false); // hide form after add
      })
      .catch((err) => console.error("Error adding portfolio:", err));

    // reset form
    setTitle("");
    setDescription("");
    setPrice("");
    setBeforePhoto("");
    setAfterPhoto("");
    setName("");
    setRating(5);
    setComment("");
  };

  // Delete portfolio
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this portfolio?"))
      return;

    deletePortfolio(id)
      .then(() => {
        setPortfolios(portfolios.filter((p) => p._id !== id));
      })
      .catch((err) => console.error("Error deleting portfolio:", err));
  };

  return (
    <div className="portfolio-container">
      <h2>🎨 Portfolio Manager</h2>

      {/* Toggle Button */}
      <button
        className="btn btn-primary"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "❌ Cancel" : "➕ Add Portfolio"}
      </button>

      {/* Form appears only when showForm is true */}
      {showForm && (
        <form onSubmit={handleAddProduct} className="product-form">
          <input
            type="text"
            placeholder="Product Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="text"
            placeholder="Before Photo URL"
            value={beforePhoto}
            onChange={(e) => setBeforePhoto(e.target.value)}
          />
          <input
            type="text"
            placeholder="After Photo URL"
            value={afterPhoto}
            onChange={(e) => setAfterPhoto(e.target.value)}
          />

          {/* Review Section */}
          <h4>⭐ Add Review</h4>
          <input
            type="text"
            placeholder="Reviewer Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value="5">⭐⭐⭐⭐⭐ (5)</option>
            <option value="4">⭐⭐⭐⭐ (4)</option>
            <option value="3">⭐⭐⭐ (3)</option>
            <option value="2">⭐⭐ (2)</option>
            <option value="1">⭐ (1)</option>
          </select>
          <textarea
            placeholder="Review Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button type="submit" className="btn btn-success">
            ✅ Save Portfolio
          </button>
        </form>
      )}

      {/* Portfolio List */}
      <div className="products-grid">
        {portfolios.map((p, index) => (
          <div key={index} className="product-card">
            <h3>{p.title}</h3>
            <p className="price">💰 ${p.price}</p>

            {/* Only show Before photo here */}
            <div className="photo-block">
              <h4>Before / After</h4>
              <img
                src={p.beforePhoto}
                alt={`${p.title} before`}
                onClick={() => setSelectedImages([p.beforePhoto, p.afterPhoto])}
              />
            </div>

            <p>{p.description}</p>

            {/* Reviews */}
            <div className="reviews-section">
              <h4>Customer Reviews</h4>
              {p.reviews && p.reviews.length > 0 ? (
                <ul className="review-list">
                  {p.reviews.map((r, i) => (
                    <li key={i} className="review-card">
                      <p>
                        <strong>{r.name}</strong> ({r.rating}⭐)
                      </p>
                      <p>{r.comment}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No reviews added yet.</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Before & After */}
      {selectedImages && (
        <div className="image-modal" onClick={() => setSelectedImages(null)}>
          <div
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Before & After</h3>
            <div className="modal-images">
              <img src={selectedImages[0]} alt="Before" />
              <img src={selectedImages[1]} alt="After" />
            </div>
            <button
              className="close-btn"
              onClick={() => setSelectedImages(null)}
            >
              ❌ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import "../Style/Portfolio.css";
import "../Style/PortfolioList.css";
import { createPortfolio, deletePortfolio, getPortfolio } from "Services/portfolio";

const ProductPortfolio = () => {
  // Admin fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [beforePhoto, setBeforePhoto] = useState("");
  const [afterPhoto, setAfterPhoto] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [products, setProducts] = useState([]);

  // Load portfolios
  useEffect(() => {
    getPortfolio().then((data) => {
      if (!data.error) setProducts(data.portfolio || []);
    });
  }, []);

  // Add product
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!title || !price || !beforePhoto || !afterPhoto) {
      alert("Please fill all fields (including both photos)");
      return;
    }
    const newProduct = {
      title,
      description,
      price,
      beforePhoto,
      afterPhoto,
      reviews: [],
    };
    createPortfolio(newProduct)
      .then((addedPortfolio) => {
        setProducts([...products, addedPortfolio]);
        setShowForm(false);
      })
      .catch((err) => console.error("Error adding service:", err));

    // reset form
    setTitle("");
    setDescription("");
    setPrice("");
    setBeforePhoto("");
    setAfterPhoto("");
  };

  // Delete portfolio
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this portfolio?")) return;
    try {
      await deletePortfolio(id);
      setProducts(products.filter((p) => p._id !== id));
      alert("✅ Portfolio deleted successfully!");
    } catch (err) {
      console.error("Error deleting portfolio:", err);
      alert("❌ Failed to delete portfolio");
    }
  };

  // SEO Schema
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "ItemList",
    itemListElement: products.map((p, index) => ({
      "@type": "Product",
      position: index + 1,
      name: p.title,
      description: p.description,
      image: [p.beforePhoto, p.afterPhoto],
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: p.price,
        availability: "https://schema.org/InStock",
        url: window.location.href,
      },
      aggregateRating: p.reviews.length
        ? {
            "@type": "AggregateRating",
            ratingValue:
              p.reviews.reduce((sum, r) => sum + r.rating, 0) / p.reviews.length,
            reviewCount: p.reviews.length,
          }
        : undefined,
    })),
  };

  return (
    <div className="portfolio-container">
      {/* SEO Helmet */}
      <Helmet>
        <title>Before & After Product Portfolio with Reviews</title>
        <meta
          name="description"
          content="Showcasing before and after transformations of our products with customer reviews."
        />
        <link rel="canonical" href={window.location.href} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <h2 className="page-title">🛠️ Before & After Product Portfolio</h2>

      {/* Toggle Form */}
      <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
        {showForm ? "❌ Cancel" : "➕ Add Portfolio"}
      </button>

      {/* Form */}
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
          <button type="submit" className="btn btn-success">
            ✅ Save Portfolio
          </button>
        </form>
      )}

      {/* Portfolio List */}
      <div className="portfolio-list">
        {products.length > 0 ? (
          products.map((portfolio) => (
            <div key={portfolio._id} className="portfolio-card">
              <div className="portfolio-info">
                <h4>📌 {portfolio.title}</h4>
                <p>📝 {portfolio.description}</p>
                {portfolio.beforePhoto && (
                  <img
                    src={portfolio.beforePhoto}
                    alt="Before"
                    className="portfolio-img"
                  />
                )}
                {portfolio.afterPhoto && (
                  <img
                    src={portfolio.afterPhoto}
                    alt="After"
                    className="portfolio-img"
                  />
                )}
                <p>⭐ Reviews: {portfolio.reviews?.length || 0}</p>
              </div>
              <div className="portfolio-actions">
                <button
                  className="btn-view"
                  onClick={() =>
                    alert(`
Title: ${portfolio.title}
Description: ${portfolio.description}
Reviews: ${portfolio.reviews?.length || 0}
                    `)
                  }
                >
                  👁 View
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(portfolio._id)}
                >
                  ❌ Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No portfolio items found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPortfolio;

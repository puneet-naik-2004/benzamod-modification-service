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

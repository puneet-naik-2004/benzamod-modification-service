import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../Style/ProductList.css";
import { getServices } from "Services/service";
import { Helmet } from "react-helmet-async";

export const ServiceListComponent = () => {
  const { type } = useParams();
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getServices().then((fetchedServices) => {
      if (fetchedServices.error) {
        setServices([]);
      } else {
        setServices(fetchedServices);
      }
    });
  }, []);

  // ✅ Filtered Services by type + search
  const filteredServices = services
    .filter((data) => data.type.toLowerCase() === type.toLowerCase())
    .filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  // ✅ SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "CollectionPage",
    name: `${type} Services | BENZAMOD`,
    description: `Explore our wide range of ${type} serivces at BENZAMOD.`,
    url: window.location.href,
    mainEntity: filteredServices.map((p) => ({
      "@type": "Service",
      name: p.title,
      image: p.photo,
      description: p.description,
      sku: p._id,
      brand: {
        "@type": "Brand",
        name: "BENZAMOD",
      },
      offers: {
        "@type": "Offer",
        url: `${window.location.origin}/service/${type}/${p._id}`,
        priceCurrency: "USD",
        price: p.price,
        availability: "https://schema.org/InStock",
      },
    })),
  };

  return (
    <div id="ProductList">
      {/* 🔎 SEO Helmet */}
      <Helmet>
        <title>{`${type} Services | BENZAMOD`}</title>
        <meta
          name="description"
          content={`Buy the best ${type} Services at BENZAMOD. Explore top deals, high quality items, and exclusive offers.`}
        />
        <meta name="keywords" content={`${type}, ${type} Service, BENZAMOD`} />

        {/* OpenGraph */}
        <meta property="og:title" content={`${type} Services | BENZAMOD`} />
        <meta
          property="og:description"
          content={`Discover the best ${type} Services at BENZAMOD.`}
        />
        <meta
          property="og:image"
          content={filteredServices[0]?.photo || "/default-service.jpg"}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />

        {/* Canonical */}
        <link rel="canonical" href={window.location.href} />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="products-list-page">
        <h2 className="products-title">{type.toUpperCase()} Services</h2>

        {/* 🔎 Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder={`Search ${type}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <ul className="products-grid">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <li key={service._id} className="product-card">
                <Link to={`/service/${type}/${service._id}`}>
                  <img
                    className="product-img"
                    src={service.photo}
                    alt={service.title}
                  />
                  <div className="product-info">
                    <h3>{service.title}</h3>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <p className="no-results">No Service found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

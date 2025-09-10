import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../Style/ServiceList.css";
import { getServices } from "Services/service";
import { Helmet } from "react-helmet-async";

export const ServicesListComponent = () => {
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

  // ✅ Filtered services by type + search
  const filteredServices = services
    .filter((data) => data.type.toLowerCase() === type.toLowerCase())
    .filter((s) => s.title.toLowerCase().includes(searchTerm.toLowerCase()));

  // ✅ SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "CollectionPage",
    name: `${type} Services | SHOPPER`,
    description: `Explore our professional ${type} services at SHOPPER.`,
    url: window.location.href,
    mainEntity: filteredServices.map((s) => ({
      "@type": "Service",
      name: s.title,
      image: s.photo,
      description: s.description,
      serviceType: s.type,
      provider: {
        "@type": "Organization",
        name: "SHOPPER",
      },
    })),
  };

  return (
    <div className="services-list-page">
      {/* 🔎 SEO Helmet */}
      <Helmet>
        <title>{`${type} Services | SHOPPER`}</title>
        <meta
          name="description"
          content={`Discover expert ${type} services at SHOPPER. Quality solutions tailored for you.`}
        />
        <meta name="keywords" content={`${type}, ${type} services, SHOPPER`} />

        {/* OpenGraph */}
        <meta property="og:title" content={`${type} Services | SHOPPER`} />
        <meta
          property="og:description"
          content={`Check out the best ${type} services at SHOPPER.`}
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

      <h2 className="services-title">{type.toUpperCase()} Produts</h2>

      {/* 🔎 Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder={`Search ${type} services...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ul className="services-grid">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <li key={service._id} className="service-card">
              <Link to={`/service/${type}/${service._id}`}>
                <img
                  className="service-img"
                  src={service.photo}
                  alt={service.title}
                />
                <div className="service-info">
                  <h3>{service.title}</h3>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <p className="no-results">No services found.</p>
        )}
      </ul>
    </div>
  );
};


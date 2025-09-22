import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import "../Style/ProductDetail.css";
import { Helmet } from "react-helmet-async";

import { getServices } from "Services/service";
import { createInquiry } from "Services/inquiry";

export const ServiceDetailComponent = () => {
  const { id: service_id } = useParams();
  const [service, setService] = useState(null);

  // Inquiry form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getServices().then((fetchedServices) => {
      if (!fetchedServices.error) {
        setService(fetchedServices.find((data) => data._id === service_id));
      }
    });
  }, [service_id]);

  if (!service) return <h2>Loading service...</h2>;

  // --- INQUIRY FORM ---
  const handleInquirySubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !description) {
      alert("⚠️ Please fill all fields");
      return;
    }

    // Get user from localStorage
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    if (!user) {
      Navigate({ to: "/login" });
    }
    const inquiryData = {
      customer_id: user?._id || null, // <-- added customer_id
      name,
      email,
      description,
      serviceTitle: service.title,
      date: new Date().toISOString(),
    };

    createInquiry(inquiryData)
      .then((res) => {
        if (!res.error) {
          alert("✅ Inquiry submitted successfully!");
          setName("");
          setEmail("");
          setDescription("");
        } else alert("❌ Failed to submit inquiry");
      })
      .catch(() => alert("⚠️ Server error"));
  };

  // ✅ SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Service",
    name: service?.title,
    image: [service?.photo],
    description: service?.description,
    serviceType: service?.type,
    offers: {
      "@type": "Offer",
      url: window.location.href,
      priceCurrency: "USD",
      price: service?.price,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="product-detail-container">
      <Helmet>
        <title>
          {service?.title
            ? `${service.title} | SHOPPER`
            : "Service Detail | SHOPPER"}
        </title>
        <meta
          name="description"
          content={
            service?.description?.slice(0, 160) ||
            "Check out this amazing service on SHOPPER"
          }
        />
        <meta
          name="keywords"
          content={`${service?.title}, ${service?.type}, buy online`}
        />

        <meta property="og:title" content={service?.title || "Service"} />
        <meta
          property="og:description"
          content={service?.description || "Shop the best services at SHOPPER"}
        />
        <meta
          property="og:image"
          content={service?.photo || "/default-service.jpg"}
        />
        <meta property="og:type" content="service" />
        <meta property="og:url" content={window.location.href} />

        <link rel="canonical" href={window.location.href} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* Left Side - Service Info */}
      <div className="product-info-card">
        <h2>{service?.title}</h2>
        <img src={service?.photo} alt={service?.title} />
        <p className="desc">{service?.description}</p>
        <p className="price">💰 ${service?.price}</p>
        <p className="type">Category: {service?.type}</p>
        <h3 className="vehicle">🚦 {service?.vehicleType}</h3>
      </div>

      {/* Right Side - Inquiry Form */}
      <form onSubmit={handleInquirySubmit} className="inquiry-form">
        <h3>Inquiry Form</h3>
        <input value={service.title} readOnly />
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Your Message"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">
          Submit Inquiry
        </button>
      </form>
    </div>
  );
};

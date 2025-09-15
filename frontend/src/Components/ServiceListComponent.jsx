
// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import "../Style/ProductList.css";
// import { getProducts } from "Services/product";
// import { Helmet } from "react-helmet-async";

// export const ProductsListComponent = () => {
//   const { type } = useParams();
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     getProducts().then((fetchedProducts) => {
//       if (fetchedProducts.error) {
//         setProducts([]);
//       } else {
//         setProducts(fetchedProducts);
//       }
//     });
//   }, []);

//   // ✅ Filtered products by type + search
//   const filteredProducts = products
//     .filter((data) => data.type.toLowerCase() === type.toLowerCase())
//     .filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

//   // ✅ SEO Structured Data
//   const structuredData = {
//     "@context": "https://schema.org/",
//     "@type": "CollectionPage",
//     name: `${type} Products | SHOPPER`,
//     description: `Explore our wide range of ${type} products at SHOPPER.`,
//     url: window.location.href,
//     mainEntity: filteredProducts.map((p) => ({
//       "@type": "Product",
//       name: p.title,
//       image: p.photo,
//       description: p.description,
//       sku: p._id,
//       brand: {
//         "@type": "Brand",
//         name: "SHOPPER",
//       },
//       offers: {
//         "@type": "Offer",
//         url: `${window.location.origin}/product/${type}/${p._id}`,
//         priceCurrency: "USD",
//         price: p.price,
//         availability: "https://schema.org/InStock",
//       },
//     })),
//   };

//   return (
//     <div id="ProductList">
//       {/* 🔎 SEO Helmet */}
//       <Helmet>
//         <title>{`${type} Products | SHOPPER`}</title>
//         <meta
//           name="description"
//           content={`Buy the best ${type} products at SHOPPER. Explore top deals, high quality items, and exclusive offers.`}
//         />
//         <meta name="keywords" content={`${type}, ${type} products, SHOPPER`} />

//         {/* OpenGraph */}
//         <meta property="og:title" content={`${type} Products | SHOPPER`} />
//         <meta
//           property="og:description"
//           content={`Discover the best ${type} products at SHOPPER.`}
//         />
//         <meta
//           property="og:image"
//           content={filteredProducts[0]?.photo || "/default-category.jpg"}
//         />
//         <meta property="og:type" content="website" />
//         <meta property="og:url" content={window.location.href} />

//         {/* Twitter Card */}
//         <meta name="twitter:card" content="summary_large_image" />

//         {/* Canonical */}
//         <link rel="canonical" href={window.location.href} />

//         {/* Structured Data */}
//         <script type="application/ld+json">
//           {JSON.stringify(structuredData)}
//         </script>
//       </Helmet>

//       <div className="products-list-page">
//         <h2 className="products-title">{type.toUpperCase()} SERVICES</h2>

//         {/* 🔎 Search Bar */}
//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder={`Search ${type}...`}
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         <ul className="products-grid">
//           {filteredProducts.length > 0 ? (
//             filteredProducts.map((product) => (
//               <li key={product._id} className="product-card">
//                 <Link to={`/product/${type}/${product._id}`}>
//                   <img
//                     className="product-img"
//                     src={product.photo}
//                     alt={product.title}
//                   />
//                   <div className="product-info">
//                     <h3>{product.title}</h3>
//                   </div>
//                 </Link>
//               </li>
//             ))
//           ) : (
//             <p className="no-results">No products found.</p>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };



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
    description: `Explore our wide range of ${type} services at SHOPPER.`,
    url: window.location.href,
    mainEntity: filteredServices.map((s) => ({
      "@type": "Service",
      name: s.title,
      image: s.photo,
      description: s.description,
      sku: s._id,
      provider: {
        "@type": "Organization",
        name: "SHOPPER",
      },
      offers: {
        "@type": "Offer",
        url: `${window.location.origin}/service/${type}/${s._id}`,
        priceCurrency: "USD",
        price: s.price,
        availability: "https://schema.org/InStock",
      },
    })),
  };

  return (
    <div id="ServiceList">
      {/* 🔎 SEO Helmet */}
      <Helmet>
        <title>{`${type} Services | SHOPPER`}</title>
        <meta
          name="description"
          content={`Book the best ${type} services at SHOPPER. Explore top deals, high quality services, and exclusive offers.`}
        />
        <meta name="keywords" content={`${type}, ${type} services, SHOPPER`} />

        {/* OpenGraph */}
        <meta property="og:title" content={`${type} Services | SHOPPER`} />
        <meta
          property="og:description"
          content={`Discover the best ${type} services at SHOPPER.`}
        />
        <meta
          property="og:image"
          content={filteredServices[0]?.photo || "/default-category.jpg"}
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

      <div className="services-list-page">
        <h2 className="services-title">{type.toUpperCase()} SERVICES</h2>

        {/* 🔎 Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder={`Search ${type}...`}
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
    </div>
  );
};

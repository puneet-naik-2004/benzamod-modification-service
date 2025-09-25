
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
//     .filter((data) => (data.type.toLowerCase() === type.toLowerCase())|| (data?.vehicleType?.toLowerCase() === type?.toLowerCase()))
//     .filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

//   // ✅ SEO Structured Data
//   const structuredData = {
//     "@context": "https://schema.org/",
//     "@type": "CollectionPage",
//     name: `${type} Products | BENZAMOD`,
//     description: `Explore our wide range of ${type} products at BENZAMOD.`,
//     url: window.location.href,
//     mainEntity: filteredProducts.map((p) => ({
//       "@type": "Product",
//       name: p.title,
//       image: p.photo,
//       description: p.description,
//       sku: p._id,
//       brand: {
//         "@type": "Brand",
//         name: "BENZAMOD",
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
//         <title>{`${type} Products | BENZAMOD`}</title>
//         <meta
//           name="description"
//           content={`Buy the best ${type} products at BENZAMOD. Explore top deals, high quality items, and exclusive offers.`}
//         />
//         <meta name="keywords" content={`${type}, ${type} products, BENZAMOD`} />

//         {/* OpenGraph */}
//         <meta property="og:title" content={`${type} Products | BENZAMOD`} />
//         <meta
//           property="og:description"
//           content={`Discover the best ${type} products at BENZAMOD.`}
//         />
//         <meta
//           property="og:image"
//           content={filteredProducts[0]?.photo || "/default-service.jpg"}
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
//         <h2 className="products-title">{type.toUpperCase()} PRODUCTS</h2>

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
import "../Style/ProductList.css";
import { getProducts } from "Services/product";
import { Helmet } from "react-helmet-async";

export const ProductsListComponent = () => {
  const { type } = useParams();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getProducts().then((fetchedProducts) => {
      if (fetchedProducts.error) {
        setProducts([]);
      } else {
        setProducts(fetchedProducts);
      }
    });
  }, []);

  // Filter products by type + search
  const filteredProducts = products
    .filter(
      (data) =>
        data.type.toLowerCase() === type.toLowerCase() ||
        data?.vehicleType?.toLowerCase() === type?.toLowerCase()
    )
    .filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  // SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "CollectionPage",
    name: `${type} Products | BENZAMOD`,
    description: `Explore our wide range of ${type} products at BENZAMOD.`,
    url: window.location.href,
    mainEntity: filteredProducts.map((p) => ({
      "@type": "Product",
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
        url: `${window.location.origin}/product/${type}/${p._id}`,
        priceCurrency: "USD",
        price: p.price,
        availability: "https://schema.org/InStock",
      },
    })),
  };

  return (
    <div id="ProductList">
      {/* SEO Helmet */}
      <Helmet>
        <title>{`${type} Products | BENZAMOD`}</title>
        <meta
          name="description"
          content={`Buy the best ${type} products at BENZAMOD. Explore top deals, high quality items, and exclusive offers.`}
        />
        <meta name="keywords" content={`${type}, ${type} products, BENZAMOD`} />
        {/* OpenGraph */}
        <meta property="og:title" content={`${type} Products | BENZAMOD`} />
        <meta
          property="og:description"
          content={`Discover the best ${type} products at BENZAMOD.`}
        />
        <meta
          property="og:image"
          content={filteredProducts[0]?.photo || "/default-service.jpg"}
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
        <h2 className="products-title">{type.toUpperCase()} PRODUCTS</h2>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder={`Search ${type}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <ul className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <li key={product._id} className="product-card">
                <Link to={`/product/${type}/${product._id}`}>
                  <img
                    className="product-img"
                    src={product.photo}
                    alt={product.title}
                  />
                  <div className="product-list-info">
                    <h3>{product.title}</h3>
                    <p className="product-price">${product.price.toFixed(2)}</p>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <p className="no-results">No products found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

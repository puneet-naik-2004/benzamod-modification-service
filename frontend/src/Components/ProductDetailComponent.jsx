// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "../Style/ProductDetail.css";
// import { Helmet } from "react-helmet-async";

// import { getProducts } from "Services/product";
// import { createOrder } from "Services/order";
// import { useAuth } from "Context/AuthContext";
// import { createCart } from "Services/cart";

// export const ProductDetailComponent = () => {
//   const { id: product_id,type } = useParams();
//   const [product, setProduct] = useState(null);
//   const [cart, setCart] = useState([]);
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   // Inquiry form states
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [description, setDescription] = useState("");

//   useEffect(() => {
//     getProducts().then((fetchedProducts) => {
//       if (!fetchedProducts.error) {
//         setProduct(fetchedProducts.find((data) => data._id === product_id));
//       }
//     });
//   }, [product_id]);

//   if (!product) return <h2>Loading product...</h2>;

//   // --- CART ---
//   const handleAddToCart = () => {
//     if (!user) {
//       navigate("/login", { state: { from: `/product/${type}/${product_id}` } });
//       return;
//     }

//     const cartData = {
//       productId: product._id,
//       title: product.title,
//       price: product.price,
//       type: product.type,
//       description: product.description,
//       photo: product.photo,
//       customer_id: user._id,
//       orderDate: new Date().toISOString(),
//     };

//     createCart(cartData)
//       .then((res) => {
//         if (!res.error) {
//           alert("✅ Added to cart successfully!");
//         } else {
//           alert("❌ Failed to add to cart");
//         }
//       })
//       .catch(() => alert("⚠️ Server error"));
//   };

//   // --- BUY NOW ---
//   const handleBuyNow = () => {
//     if (!user) {
//       navigate("/login", { state: { from: `/product/${product_id}` } });
//       return;
//     }

//     const orderData = {
//       product_id: product._id,
//       title: product.title,
//       price: product.price,
//       type: product.type,
//       description: product.description,
//       photo: product.photo,
//       customer_id: user._id,
//       orderDate: new Date().toISOString(),
//     };

//     createOrder(orderData)
//       .then((res) => {
//         if (!res.error) {
//           alert("✅ Order placed successfully!");
//         } else {
//           alert("❌ Failed to place order");
//         }
//       })
//       .catch(() => alert("⚠️ Server error"));
//   };

//   // ✅ SEO Structured Data
//   const structuredData = {
//     "@context": "https://schema.org/",
//     "@type": "Product",
//     name: product?.title,
//     image: [product?.photo],
//     description: product?.description,
//     sku: product?._id,
//     brand: {
//       "@type": "Brand",
//       name: "SHOPPER",
//     },
//     offers: {
//       "@type": "Offer",
//       url: window.location.href,
//       priceCurrency: "USD",
//       price: product?.price,
//       availability: "https://schema.org/InStock",
//     },
//     aggregateRating: {
//       "@type": "AggregateRating",
//       ratingValue: "4.5", // You can replace this with real data later
//       reviewCount: "24",
//     },
//   };

//   return (
//     <div className="product-detail-container">
//       {/* 🔎 SEO Helmet */}
//       <Helmet>
//         <title>
//           {product?.title
//             ? `${product.title} | SHOPPER`
//             : "Product Detail | SHOPPER"}
//         </title>
//         <meta
//           name="description"
//           content={
//             product?.description?.slice(0, 160) ||
//             "Check out this amazing product on SHOPPER"
//           }
//         />
//         <meta
//           name="keywords"
//           content={`${product?.title}, ${product?.type}, buy online`}
//         />

//         {/* OpenGraph */}
//         <meta property="og:title" content={product?.title || "Product"} />
//         <meta
//           property="og:description"
//           content={product?.description || "Shop the best products at SHOPPER"}
//         />
//         <meta
//           property="og:image"
//           content={product?.photo || "/default-product.jpg"}
//         />
//         <meta property="og:type" content="product" />
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

//       {/* Left Side - Product Info */}
//       <div className="product-info-card">
//         <h2>{product?.title}</h2>
//         <img src={product?.photo} alt={product?.title} />
//         <p className="desc">{product?.description}</p>
//         <p className="price">💰 ${product?.price}</p>
//         <p className="type">Category: {product?.type}</p>

//         <button className="btn btn-cart" onClick={handleAddToCart}>
//           🛒 Add to Cart
//         </button>

//         <button className="btn btn-buy" onClick={handleBuyNow}>
//           ⚡ BUY NOW
//         </button>
//       </div>

//       {/* Right Side - Inquiry Form */}
//       <form onSubmit={(e) => e.preventDefault()} className="inquiry-form">
//         <h3>Inquiry Form</h3>
//         <input
//           type="text"
//           placeholder="Your Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           type="email"
//           placeholder="Your Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <textarea
//           placeholder="Your Message"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         ></textarea>
//         <button type="submit" className="btn btn-primary">
//           Submit Inquiry
//         </button>
//       </form>
//     </div>
//   );
// };






import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Style/ProductDetail.css";
import { Helmet } from "react-helmet-async";

import { getProducts } from "Services/product";
import { createOrder } from "Services/order";
import { useAuth } from "Context/AuthContext";
import { createCart } from "Services/cart";
import { createInquiry } from "Services/inquiry"; // ⬅️ NEW service (you create this like others)

export const ProductDetailComponent = () => {
  const { id: product_id, type } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Inquiry form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getProducts().then((fetchedProducts) => {
      if (!fetchedProducts.error) {
        setProduct(fetchedProducts.find((data) => data._id === product_id));
      }
    });
  }, [product_id]);

  if (!product) return <h2>Loading product...</h2>;

  // --- CART ---
  const handleAddToCart = () => {
    if (!user) {
      navigate("/login", { state: { from: `/product/${type}/${product_id}` } });
      return;
    }

    const cartData = {
      product_id: product._id,
      title: product.title,
      price: product.price,
      type: product.type,
      description: product.description,
      photo: product.photo,
      customer_id: user._id,
      orderDate: new Date().toISOString(),
    };

    createCart(cartData)
      .then((res) => {
        if (!res.error) {
          alert("✅ Added to cart successfully!");
        } else {
          alert("❌ Failed to add to cart");
        }
      })
      .catch(() => alert("⚠️ Server error"));
  };

  // --- BUY NOW ---
  const handleBuyNow = () => {
    if (!user) {
      navigate("/login", { state: { from: `/product/${product_id}` } });
      return;
    }

    const orderData = {
      product_id: product._id,
      title: product.title,
      price: product.price,
      type: product.type,
      description: product.description,
      photo: product.photo,
      customer_id: user._id,
      orderDate: new Date().toISOString(),
    };

    createOrder(orderData)
      .then((res) => {
        if (!res.error) {
          alert("✅ Order placed successfully!");
        } else {
          alert("❌ Failed to place order");
        }
      })
      .catch(() => alert("⚠️ Server error"));
  };

  // --- INQUIRY FORM ---
  const handleInquirySubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !description) {
      alert("⚠️ Please fill all fields");
      return;
    }

    const inquiryData = {
      name,
      email,
      description,
      productId: product._id,
      productTitle: product.title,
      date: new Date().toISOString(),
    };

    createInquiry(inquiryData)
      .then((res) => {
        if (!res.error) {
          alert("✅ Inquiry submitted successfully!");
          setName("");
          setEmail("");
          setDescription("");
        } else {
          alert("❌ Failed to submit inquiry");
        }
      })
      .catch(() => alert("⚠️ Server error"));
  };

  // ✅ SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product?.title,
    image: [product?.photo],
    description: product?.description,
    sku: product?._id,
    brand: {
      "@type": "Brand",
      name: "SHOPPER",
    },
    offers: {
      "@type": "Offer",
      url: window.location.href,
      priceCurrency: "USD",
      price: product?.price,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      reviewCount: "24",
    },
  };

  return (
    <div className="product-detail-container">
      {/* 🔎 SEO Helmet */}
      <Helmet>
        <title>
          {product?.title
            ? `${product.title} | SHOPPER`
            : "Product Detail | SHOPPER"}
        </title>
        <meta
          name="description"
          content={
            product?.description?.slice(0, 160) ||
            "Check out this amazing product on SHOPPER"
          }
        />
        <meta
          name="keywords"
          content={`${product?.title}, ${product?.type}, buy online`}
        />

        {/* OpenGraph */}
        <meta property="og:title" content={product?.title || "Product"} />
        <meta
          property="og:description"
          content={product?.description || "Shop the best products at SHOPPER"}
        />
        <meta
          property="og:image"
          content={product?.photo || "/default-product.jpg"}
        />
        <meta property="og:type" content="product" />
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

      {/* Left Side - Product Info */}
      <div className="product-info-card">
        <h2>{product?.title}</h2>
        <img src={product?.photo} alt={product?.title} />
        <p className="desc">{product?.description}</p>
        <p className="price">💰 ${product?.price}</p>
        <p className="type">Service: {product?.type}</p>

        <button className="btn btn-cart" onClick={handleAddToCart}>
          🛒 Add to Cart
        </button>

        {/* <button className="btn btn-buy" onClick={handleBuyNow}>
          ⚡ BUY NOW
        </button> */}
      </div>

      {/* Right Side - Inquiry Form */}
      <form onSubmit={handleInquirySubmit} className="inquiry-form">
        <h3>Inquiry Form</h3>
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
        ></textarea>
        <button type="submit" className="btn btn-primary">
          Submit Inquiry
        </button>
      </form>
    </div>
  );
};


// // // import { createProduct, deleteProduct, getProducts, updateProduct, } from "Services/product"; 
// // // import { useState, useEffect, useRef } from "react"; 
// // // import "../Style/Product.css"; 
// // // import { Helmet } from "react-helmet-async"; 

// // // function Products() { 
// // //   const [title, setTitle] = useState(""); 
// // //   const [price, setPrice] = useState(""); 
// // //   const [type, setType] = useState("Wraps"); 
// // //   const [description, setDescription] = useState(""); 
// // //   const [photo, setPhoto] = useState(""); 
// // //   const [products, setProducts] = useState([]); 
// // //   const [editingId, setEditingId] = useState(null); 
// // //   const [searchTerm, setSearchTerm] = useState(""); // ✅ search bar state 
// // //   const formRef = useRef(null); 

// // //   useEffect(() => { 
// // //     getProducts() 
// // //       .then((data) => { 
// // //         if (data.error) { 
// // //           setProducts([]); 
// // //         } else { 
// // //           setProducts(data || []); 
// // //         } 
// // //       }) 
// // //       .catch((err) => console.error("Error fetching products:", err)); 
// // //   }, []); 

// // //   const handleSubmit = (e) => { 
// // //     e.preventDefault(); 
// // //     if (!title?.trim() || !price || !type?.trim() || !photo?.trim()) { 
// // //       alert("Please fill all fields!"); 
// // //       return; 
// // //     } 

// // //     const newProduct = { title, price, type, description, photo }; 

// // //     if (editingId) { 
// // //       updateProduct(editingId, newProduct) 
// // //         .then((updatedProduct) => { 
// // //           setProducts( 
// // //             products.map((p) => (p._id === editingId ? updatedProduct : p)) 
// // //           ); 
// // //           resetForm(); 
// // //         }) 
// // //         .catch((err) => console.error("Error updating product:", err)); 
// // //     } else { 
// // //       createProduct(newProduct) 
// // //         .then((addedProduct) => { 
// // //           setProducts([...products, addedProduct]); 
// // //           resetForm(); 
// // //         }) 
// // //         .catch((err) => console.error("Error adding product:", err)); 
// // //     } 
// // //   }; 

// // //   const handleDelete = (id) => { 
// // //     deleteProduct(id) 
// // //       .then(() => { 
// // //         setProducts(products.filter((p) => p._id !== id)); 
// // //       }) 
// // //       .catch((err) => console.error("Error deleting product:", err)); 
// // //   }; 

// // //   const handleEdit = (product) => { 
// // //     setEditingId(product._id); 
// // //     setTitle(product.title); 
// // //     setPrice(product.price); 
// // //     setType(product.type); 
// // //     setDescription(product.description); 
// // //     setPhoto(product.photo); 

// // //     const yOffset = -150; 
// // //     const y = formRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset; 
// // //     window.scrollTo({ top: y, behavior: "smooth" }); 
// // //   }; 

// // //   const resetForm = () => { 
// // //     setEditingId(null); 
// // //     setTitle(""); 
// // //     setPrice(""); 
// // //     setType("Wraps"); 
// // //     setDescription(""); 
// // //     setPhoto(""); 
// // //   }; 

// // //   // ✅ Filter products based only on title 
// // //   const filteredProducts = products.filter((p) => 
// // //     p.title.toLowerCase().includes(searchTerm.toLowerCase()) 
// // //   ); 

// // //   // ✅ SEO Structured Data 
// // //   const structuredData = { 
// // //     "@context": "https://schema.org/", 
// // //     "@type": "Product", 
// // //     name: "Manage Products | SHOPPER Admin", 
// // //     description: "Admin panel to manage wraps, exhausts, lights, and seats products. Add, update, or delete products.", 
// // //     url: window.location.href, 
// // //     brand: { 
// // //       "@type": "Organization", 
// // //       name: "SHOPPER", 
// // //     }, 
// // //   }; 

// // //   return ( 
// // //     <div className="products-container"> 
// // //       {/* 🔎 SEO Helmet */} 
// // //       <Helmet> 
// // //         <title>Manage Products | SHOPPER Admin</title> 
// // //         <meta name="description" content="Admin panel to manage Wraps, Exhausts, Lights, and Seats products at SHOPPER." /> 
// // //         <meta name="keywords" content="Admin, Manage Products, SHOPPER, Wraps, Exhausts, Lights, Seats" /> 
// // //         <meta property="og:title" content="Manage Products | SHOPPER Admin" /> 
// // //         <meta property="og:description" content="Admin panel for managing Wraps, Exhausts, Lights, and Seats products." /> 
// // //         <meta property="og:type" content="website" /> 
// // //         <meta property="og:url" content={window.location.href} /> 
// // //         <link rel="canonical" href={window.location.href} /> 
// // //         <script type="application/ld+json"> 
// // //           {JSON.stringify(structuredData)} 
// // //         </script> 
// // //       </Helmet> 

// // //       <h2 className="page-title"> 🛒 Manage Products (Wraps & Exhausts & Lights & Seats) </h2> 

// // //       {/* Product Form */} 
// // //       <form ref={formRef} onSubmit={handleSubmit} className="product-form"> 
// // //         <h3>{editingId ? "✏️ Update Product" : "➕ Add New Product"}</h3> 
// // //         <input type="text" placeholder="Product Title" value={title} onChange={(e) => setTitle(e.target.value)} /> 
// // //         <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} /> 
// // //         <select value={type} onChange={(e) => setType(e.target.value)}> 
// // //           <option value="Wraps">🏍️ Wraps</option> 
// // //           <option value="Exhausts">🚘 Exhausts</option> 
// // //           <option value="Lights">💡 Lights</option> 
// // //           <option value="Seats">💺 Seats</option> 
// // //         </select> 
// // //         <textarea placeholder="Product Description" value={description} onChange={(e) => setDescription(e.target.value)} /> 
// // //         <input type="text" placeholder="Photo URL" value={photo} onChange={(e) => setPhoto(e.target.value)} /> 
// // //         <div className="form-buttons"> 
// // //           <button type="submit" className="btn btn-primary"> 
// // //             {editingId ? "Update Product" : "Add Product"} 
// // //           </button> 
// // //           {editingId && ( 
// // //             <button type="button" onClick={resetForm} className="btn btn-cancel" > 
// // //               Cancel 
// // //             </button> 
// // //           )} 
// // //         </div> 
// // //       </form> 

// // //       {/* 🔍 Search Bar */} 
// // //       <div className="search-bar"> 
// // //         <input type="text" placeholder="Search products by title..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /> 
// // //       </div> 

// // //       {/* Product List */} 
// // //       <h3 className="list-title">📋 Available Products</h3> 
// // //       <div className="product-list"> 
// // //         {filteredProducts.length > 0 ? ( 
// // //           filteredProducts.map((p) => ( 
// // //             <div key={p._id} className="product-card"> 
// // //               <img src={p.photo} alt={p.title} className="product-img" /> 
// // //               <div className="product-info"> 
// // //                 <h4>{p.title}</h4> 
// // //                 <p className="price">💰 ${p.price}</p> 
// // //                 <p className="type">{p.type}</p> 
// // //                 <p className="desc">{p.description}</p> 
// // //                 <div className="card-buttons"> 
// // //                   <button onClick={() => handleEdit(p)} className="btn btn-edit" > ✏️ Edit </button> 
// // //                   <button onClick={() => handleDelete(p._id)} className="btn btn-delete" > 🗑️ Delete </button> 
// // //                 </div> 
// // //               </div> 
// // //             </div> 
// // //           )) 
// // //         ) : ( 
// // //           <p className="no-results">No products found.</p> 
// // //         )} 
// // //       </div> 
// // //     </div> 
// // //   ); 
// // // } 

// // // export default Products











// // import {
// //   createService,
// //   deleteService,
// //   getServices,
// //   updateService,
// // } from "Services/service";
// // import { useState, useEffect, useRef } from "react";
// // import "../Style/Service.css";
// // import { Helmet } from "react-helmet-async";

// // function Services() {
// //   const [title, setTitle] = useState("");
// //   const [price, setPrice] = useState("");
// //   const [type, setType] = useState("Wraps");
// //   const [description, setDescription] = useState("");
// //   const [photo, setPhoto] = useState("");

// //   const [services, setServices] = useState([]);
// //   const [editingId, setEditingId] = useState(null);
// //   const [searchTerm, setSearchTerm] = useState(""); // ✅ search bar state
// //   const formRef = useRef(null);

// //   useEffect(() => {
// //     getServices()
// //       .then((data) => {
// //         if (data.error) {
// //           setServices([]);
// //         } else {
// //           setServices(data || []);
// //         }
// //       })
// //       .catch((err) => console.error("Error fetching services:", err));
// //   }, []);

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (!title?.trim() || !price || !type?.trim() || !photo?.trim()) {
// //       alert("Please fill all fields!");
// //       return;
// //     }

// //     const newService = { title, price, type, description, photo };

// //     if (editingId) {
// //       updateService(editingId, newService)
// //         .then((updatedService) => {
// //           setServices(
// //             services.map((s) => (s._id === editingId ? updatedService : s))
// //           );
// //           resetForm();
// //         })
// //         .catch((err) => console.error("Error updating service:", err));
// //     } else {
// //       createService(newService)
// //         .then((addedService) => {
// //           setServices([...services, addedService]);
// //           resetForm();
// //         })
// //         .catch((err) => console.error("Error adding service:", err));
// //     }
// //   };

// //   const handleDelete = (id) => {
// //     deleteService(id)
// //       .then(() => {
// //         setServices(services.filter((s) => s._id !== id));
// //       })
// //       .catch((err) => console.error("Error deleting service:", err));
// //   };

// //   const handleEdit = (service) => {
// //     setEditingId(service._id);
// //     setTitle(service.title);
// //     setPrice(service.price);
// //     setType(service.type);
// //     setDescription(service.description);
// //     setPhoto(service.photo);

// //     const yOffset = -150;
// //     const y =
// //       formRef.current.getBoundingClientRect().top +
// //       window.pageYOffset +
// //       yOffset;

// //     window.scrollTo({ top: y, behavior: "smooth" });
// //   };

// //   const resetForm = () => {
// //     setEditingId(null);
// //     setTitle("");
// //     setPrice("");
// //     setType("Wraps");
// //     setDescription("");
// //     setPhoto("");
// //   };

// //   // ✅ Filter services based only on title
// //   const filteredServices = services.filter((s) =>
// //     s.title.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   // ✅ SEO Structured Data
// //   const structuredData = {
// //     "@context": "https://schema.org/",
// //     "@type": "Service",
// //     name: "Manage Services | SHOPPER Admin",
// //     description:
// //       "Admin panel to manage wraps, exhausts, lights, and seats services. Add, update, or delete services.",
// //     url: window.location.href,
// //     provider: {
// //       "@type": "Organization",
// //       name: "SHOPPER",
// //     },
// //   };

// //   return (
// //     <div className="services-container">
// //       {/* 🔎 SEO Helmet */}
// //       <Helmet>
// //         <title>Manage Services | SHOPPER Admin</title>
// //         <meta
// //           name="description"
// //           content="Admin panel to manage Wraps, Exhausts, Lights, and Seats services at SHOPPER."
// //         />
// //         <meta
// //           name="keywords"
// //           content="Admin, Manage Services, SHOPPER, Wraps, Exhausts, Lights, Seats"
// //         />

// //         <meta property="og:title" content="Manage Services | SHOPPER Admin" />
// //         <meta
// //           property="og:description"
// //           content="Admin panel for managing Wraps, Exhausts, Lights, and Seats services."
// //         />
// //         <meta property="og:type" content="website" />
// //         <meta property="og:url" content={window.location.href} />

// //         <link rel="canonical" href={window.location.href} />

// //         <script type="application/ld+json">
// //           {JSON.stringify(structuredData)}
// //         </script>
// //       </Helmet>

// //       <h2 className="page-title">
// //         🚗 Manage Services (Wraps & Exhausts & Lights & Seats)
// //       </h2>

// //       {/* Service Form */}
// //       <form ref={formRef} onSubmit={handleSubmit} className="service-form">
// //         <h3>{editingId ? "✏️ Update Service" : "➕ Add New Service"}</h3>
// //         <input
// //           type="text"
// //           placeholder="Service Title"
// //           value={title}
// //           onChange={(e) => setTitle(e.target.value)}
// //         />

// //         <input
// //           type="number"
// //           placeholder="Price"
// //           value={price}
// //           onChange={(e) => setPrice(e.target.value)}
// //         />

// //         <select value={type} onChange={(e) => setType(e.target.value)}>
// //           <option value="Wraps">🏍️ Wraps</option>
// //           <option value="Exhausts">🚘 Exhausts</option>
// //           <option value="Lights">💡 Lights</option>
// //           <option value="Seats">💺 Seats</option>
// //         </select>

// //         <textarea
// //           placeholder="Service Description"
// //           value={description}
// //           onChange={(e) => setDescription(e.target.value)}
// //         />

// //         <input
// //           type="text"
// //           placeholder="Photo URL"
// //           value={photo}
// //           onChange={(e) => setPhoto(e.target.value)}
// //         />

// //         <div className="form-buttons">
// //           <button type="submit" className="btn btn-primary">
// //             {editingId ? "Update Service" : "Add Service"}
// //           </button>
// //           {editingId && (
// //             <button
// //               type="button"
// //               onClick={resetForm}
// //               className="btn btn-cancel"
// //             >
// //               Cancel
// //             </button>
// //           )}
// //         </div>
// //       </form>

// //       {/* 🔍 Search Bar */}
// //       <div className="search-bar">
// //         <input
// //           type="text"
// //           placeholder="Search services by title..."
// //           value={searchTerm}
// //           onChange={(e) => setSearchTerm(e.target.value)}
// //         />
// //       </div>

// //       {/* Service List */}
// //       <h3 className="list-title">📋 Available Services</h3>
// //       <div className="service-list">
// //         {filteredServices.length > 0 ? (
// //           filteredServices.map((s) => (
// //             <div key={s._id} className="service-card">
// //               <img src={s.photo} alt={s.title} className="service-img" />
// //               <div className="service-info">
// //                 <h4>{s.title}</h4>
// //                 <p className="price">💰 ${s.price}</p>
// //                 <p className="type">{s.type}</p>
// //                 <p className="desc">{s.description}</p>
// //                 <div className="card-buttons">
// //                   <button
// //                     onClick={() => handleEdit(s)}
// //                     className="btn btn-edit"
// //                   >
// //                     ✏️ Edit
// //                   </button>
// //                   <button
// //                     onClick={() => handleDelete(s._id)}
// //                     className="btn btn-delete"
// //                   >
// //                     🗑️ Delete
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           ))
// //         ) : (
// //           <p className="no-results">No services found.</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Services;





// import {
//   createService,
//   deleteService,
//   getServices,
//   updateService,
// } from "Services/service";
// import { useState, useEffect, useRef } from "react";
// import "../Style/Service.css";
// import { Helmet } from "react-helmet-async";

// function Services() {
//   const [title, setTitle] = useState("");
//   const [price, setPrice] = useState("");
//   const [type, setType] = useState("Wraps");
//   const [description, setDescription] = useState("");
//   const [photo, setPhoto] = useState("");

//   const [services, setServices] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState(""); 
//   const formRef = useRef(null);

//   // ✅ Fetch services
//   useEffect(() => {
//     getServices()
//       .then((data) => {
//         if (data.error) {
//           setServices([]);
//         } else {
//           setServices(data || []);
//         }
//       })
//       .catch((err) => console.error("Error fetching services:", err));
//   }, []);

//   // ✅ Submit form
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!title?.trim() || !price || !type?.trim() || !photo?.trim()) {
//       alert("Please fill all fields!");
//       return;
//     }

//     const newService = { title, price, type, description, photo };

//     if (editingId) {
//       updateService(editingId, newService)
//         .then((updatedService) => {
//           setServices(
//             services.map((s) => (s._id === editingId ? updatedService : s))
//           );
//           resetForm();
//         })
//         .catch((err) => console.error("Error updating service:", err));
//     } else {
//       createService(newService)
//         .then((addedService) => {
//           setServices([...services, addedService]);
//           resetForm();
//         })
//         .catch((err) => console.error("Error adding service:", err));
//     }
//   };

//   // ✅ Delete service
//   const handleDelete = (id) => {
//     deleteService(id)
//       .then(() => {
//         setServices(services.filter((s) => s._id !== id));
//       })
//       .catch((err) => console.error("Error deleting service:", err));
//   };

//   // ✅ Edit service + scroll to form
//   const handleEdit = (service) => {
//     setEditingId(service._id);
//     setTitle(service.title);
//     setPrice(service.price);
//     setType(service.type);
//     setDescription(service.description);
//     setPhoto(service.photo);

//     const yOffset = -150;
//     const y =
//       formRef.current.getBoundingClientRect().top +
//       window.pageYOffset +
//       yOffset;

//     window.scrollTo({ top: y, behavior: "smooth" });
//   };

//   // ✅ Reset form
//   const resetForm = () => {
//     setEditingId(null);
//     setTitle("");
//     setPrice("");
//     setType("Wraps");
//     setDescription("");
//     setPhoto("");
//   };

//   // ✅ Filter by title
//   const filteredServices = services.filter((s) =>
//     s.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // ✅ SEO Structured Data
//   const structuredData = {
//     "@context": "https://schema.org/",
//     "@type": "Service",
//     name: "Manage Services | SHOPPER Admin",
//     description:
//       "Admin panel to manage wraps, exhausts, lights, and seats services. Add, update, or delete services.",
//     url: window.location.href,
//     provider: {
//       "@type": "Organization",
//       name: "SHOPPER",
//     },
//   };

//   return (
//     <div className="products-container">
//       {/* 🔎 SEO Helmet */}
//       <Helmet>
//         <title>Manage Services | SHOPPER Admin</title>
//         <meta
//           name="description"
//           content="Admin panel to manage Wraps, Exhausts, Lights, and Seats services at SHOPPER."
//         />
//         <meta
//           name="keywords"
//           content="Admin, Manage Services, SHOPPER, Wraps, Exhausts, Lights, Seats"
//         />

//         <meta property="og:title" content="Manage Services | SHOPPER Admin" />
//         <meta
//           property="og:description"
//           content="Admin panel for managing Wraps, Exhausts, Lights, and Seats services."
//         />
//         <meta property="og:type" content="website" />
//         <meta property="og:url" content={window.location.href} />

//         <link rel="canonical" href={window.location.href} />

//         <script type="application/ld+json">
//           {JSON.stringify(structuredData)}
//         </script>
//       </Helmet>

//       <h2 className="page-title">
//         🚗 Manage Services (Wraps, Exhausts, Lights, Seats)
//       </h2>

//       {/* ✅ Service Form (same style as Product Form) */}
//       <form ref={formRef} onSubmit={handleSubmit} className="product-form">
//         <h3>{editingId ? "✏️ Update Service" : "➕ Add New Service"}</h3>
//         <input
//           type="text"
//           placeholder="Service Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />

//         <input
//           type="number"
//           placeholder="Price"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//         />

//         <select value={type} onChange={(e) => setType(e.target.value)}>
//           <option value="Wraps">🏍️ Wraps</option>
//           <option value="Exhausts">🚘 Exhausts</option>
//           <option value="Lights">💡 Lights</option>
//           <option value="Seats">💺 Seats</option>
//         </select>

//         <textarea
//           placeholder="Service Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />

//         <input
//           type="text"
//           placeholder="Photo URL"
//           value={photo}
//           onChange={(e) => setPhoto(e.target.value)}
//         />

//         <div className="form-buttons">
//           <button type="submit" className="btn btn-primary">
//             {editingId ? "Update Service" : "Add Service"}
//           </button>
//           {editingId && (
//             <button
//               type="button"
//               onClick={resetForm}
//               className="btn btn-cancel"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>

//       {/* 🔍 Search Bar */}
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Search services by title..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* ✅ Service List (Product card style) */}
//       <h3 className="list-name">📋 Available Services</h3>
//       <div className="product-list">
//         {filteredServices.length > 0 ? (
//           filteredServices.map((s) => (
//             <div key={s._id} className="product-card">
//               <img src={s.photo} alt={s.title} className="product-img" />
//               <div className="product-info">
//                 <h4>{s.title}</h4>
//                 <p className="price">💰 ${s.price}</p>
//                 <p className="type">{s.type}</p>
//                 <p className="desc">{s.description}</p>
//                 <div className="card-buttons">
//                   <button
//                     onClick={() => handleEdit(s)}
//                     className="btn btn-edit"
//                   >
//                     ✏️ Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(s._id)}
//                     className="btn btn-delete"
//                   >
//                     🗑️ Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="no-results">No services found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Services;





import {
  createService,
  deleteService,
  getServices,
  updateService,
} from "Services/service";
import { useState, useEffect, useRef } from "react";
import "../Style/Service.css";
import { Helmet } from "react-helmet-async";

function Services() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("Wraps");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");

  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); 
  const formRef = useRef(null);

  // ✅ Load services
  useEffect(() => {
    getServices()
      .then((data) => {
        if (data.error) {
          setServices([]);
        } else {
          setServices(data || []);
        }
      })
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  // ✅ Handle Add / Update
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title?.trim() || !price || !type?.trim() || !photo?.trim()) {
      alert("Please fill all fields!");
      return;
    }

    const newService = { title, price, type, description, photo };

    if (editingId) {
      updateService(editingId, newService)
        .then((updatedService) => {
          setServices(
            services.map((s) => (s._id === editingId ? updatedService : s))
          );
          resetForm();
        })
        .catch((err) => console.error("Error updating service:", err));
    } else {
      createService(newService)
        .then((addedService) => {
          setServices([...services, addedService]);
          resetForm();
        })
        .catch((err) => console.error("Error adding service:", err));
    }
  };

  // ✅ Handle Delete
  const handleDelete = (id) => {
    deleteService(id)
      .then(() => {
        setServices(services.filter((s) => s._id !== id));
      })
      .catch((err) => console.error("Error deleting service:", err));
  };

  // ✅ Handle Edit + Scroll to Form
  const handleEdit = (service) => {
    setEditingId(service._id);
    setTitle(service.title);
    setPrice(service.price);
    setType(service.type);
    setDescription(service.description);
    setPhoto(service.photo);

    // scroll to form smoothly
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        window.scrollBy(0, -150); // offset for header
      }
    }, 100);
  };

  // ✅ Reset form
  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setPrice("");
    setType("Wraps");
    setDescription("");
    setPhoto("");
  };

  // ✅ Filter services by title
  const filteredServices = services.filter((s) =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Service",
    name: "Manage Services | SHOPPER Admin",
    description:
      "Admin panel to manage wraps, exhausts, lights, and seats services. Add, update, or delete services.",
    url: window.location.href,
    provider: {
      "@type": "Organization",
      name: "SHOPPER",
    },
  };

  return (
    <div className="services-container">
      {/* 🔎 SEO Helmet */}
      <Helmet>
        <title>Manage Services | SHOPPER Admin</title>
        <meta
          name="description"
          content="Admin panel to manage Wraps, Exhausts, Lights, and Seats services at SHOPPER."
        />
        <meta
          name="keywords"
          content="Admin, Manage Services, SHOPPER, Wraps, Exhausts, Lights, Seats"
        />

        <meta property="og:title" content="Manage Services | SHOPPER Admin" />
        <meta
          property="og:description"
          content="Admin panel for managing Wraps, Exhausts, Lights, and Seats services."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />

        <link rel="canonical" href={window.location.href} />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <h2 className="page-title">
        🚗 Manage Services (Wraps & Exhausts & Lights & Seats)
      </h2>

      {/* Service Form */}
      <form ref={formRef} onSubmit={handleSubmit} className="product-form">
        <h3>{editingId ? "✏️ Update Service" : "➕ Add New Service"}</h3>
        <input
          type="text"
          placeholder="Service Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Wraps">🏍️ Wraps</option>
          <option value="Exhausts">🚘 Exhausts</option>
          <option value="Lights">💡 Lights</option>
          <option value="Seats">💺 Seats</option>
        </select>

        <textarea
          placeholder="Service Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          placeholder="Photo URL"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
        />

        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">
            {editingId ? "Update Service" : "Add Service"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="btn btn-cancel"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* 🔍 Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search services by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Service List */}
      <h3 className="list-name">📋 Available Services</h3>
      <div className="product-list">
        {filteredServices.length > 0 ? (
          filteredServices.map((s) => (
            <div key={s._id} className="product-card">
              <img src={s.photo} alt={s.title} className="product-img" />
              <div className="product-info">
                <h4>{s.title}</h4>
                <p className="price">💰 ${s.price}</p>
                <p className="type">{s.type}</p>
                <p className="desc">{s.description}</p>
                <div className="card-buttons">
                  <button
                    onClick={() => handleEdit(s)}
                    className="btn btn-edit"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="btn btn-delete"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No services found.</p>
        )}
      </div>
    </div>
  );
}

export default Services;

// import {
//   createService,
//   deleteService,
//   getServices,
//   updateService,
// } from "Services/service";
// import { useState, useEffect,useRef } from "react";
// import "./Service.css";


// function Services() {
//   const [title, setTitle] = useState("");
//   const [price, setPrice] = useState("");
//   const [type, setType] = useState("Bike");
//   const [description, setDescription] = useState("");
//   const [photo, setPhoto] = useState("");

//   const [services, setServices] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//    const formRef = useRef(null);

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

//   const handleDelete = (id) => {
//     deleteService(id)
//       .then(() => {
//         setServices(services.filter((s) => s._id !== id));
//       })
//       .catch((err) => console.error("Error deleting service:", err));
//   };

//   const handleEdit = (service) => {
//     setEditingId(service._id);
//     setTitle(service.title);
//     setPrice(service.price);
//     setType(service.type);
//     setDescription(service.description);
//     setPhoto(service.photo);
//     // formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//      const yOffset = -100; // 👈 adjust this value (negative = stops earlier
//   const y =
//     formRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;

//   window.scrollTo({ top: y, behavior: "smooth" });
//   };

//   const resetForm = () => {
//     setEditingId(null);
//     setTitle("");
//     setPrice("");
//     setType("Bike");
//     setDescription("");
//     setPhoto("");
//   };

//   return (
//     <div className="services-container">
//       <h2 className="page-title">🚗 Manage Services (Bike & Car)</h2>

//       {/* Service Form */}
//       <form ref={formRef} onSubmit={handleSubmit} className="service-form">
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
//           <option value="Bike">🏍️ Bike</option>
//           <option value="Car">🚘 Car</option>
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
//             <button type="button" onClick={resetForm} className="btn btn-cancel">
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>

//       {/* Service List */}
//       <h3 className="list-name">📋 Available Services</h3>
//       <div className="service-list">
//         {services.map((s) => (
//           <div key={s._id} className="service-card">
//             <img src={s.photo} alt={s.name} className="service-img" />
//             <div className="service-info">
//               <h4>{s.title}</h4>
//               <p className="price">💰 ${s.price}</p>
//               <p className="type">{s.type}</p>
//               <p className="desc">{s.description}</p>
//               <div className="card-buttons">
//                 <button onClick={() => handleEdit(s)} className="btn btn-edit">
//                   ✏️ Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(s._id)}
//                   className="btn btn-delete"
//                 >
//                   🗑️ Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
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
  const [type, setType] = useState("Bike");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");

  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ search state
  const formRef = useRef(null);

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

  const handleDelete = (id) => {
    deleteService(id)
      .then(() => {
        setServices(services.filter((s) => s._id !== id));
      })
      .catch((err) => console.error("Error deleting service:", err));
  };

  const handleEdit = (service) => {
    setEditingId(service._id);
    setTitle(service.title);
    setPrice(service.price);
    setType(service.type);
    setDescription(service.description);
    setPhoto(service.photo);

    const yOffset = -100;
    const y =
      formRef.current.getBoundingClientRect().top +
      window.pageYOffset +
      yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setPrice("");
    setType("Bike");
    setDescription("");
    setPhoto("");
  };

  // ✅ Filter services based on search
  const filteredServices = services.filter(
    (s) =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Service",
    name: "Manage Services | SHOPPER Admin",
    description:
      "Admin panel to manage bike and car services. Add, update, or delete services.",
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
          content="Admin panel to manage services (Bike & Car). Add, update, and delete services at SHOPPER."
        />
        <meta name="keywords" content="Admin, Manage Services, SHOPPER" />

        <meta property="og:title" content="Manage Services | SHOPPER Admin" />
        <meta
          property="og:description"
          content="Admin panel for managing Bike & Car services at SHOPPER."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />

        <link rel="canonical" href={window.location.href} />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <h2 className="page-title">🚗 Manage Services (Bike & Car)</h2>

      {/* Service Form */}
      <form ref={formRef} onSubmit={handleSubmit} className="service-form">
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
          <option value="Bike">🏍️ Bike</option>
          <option value="Car">🚘 Car</option>
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
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Service List */}
      <h3 className="list-name">📋 Available Services</h3>
      <div className="service-list">
        {filteredServices.length > 0 ? (
          filteredServices.map((s) => (
            <div key={s._id} className="service-card">
              <img src={s.photo} alt={s.title} className="service-img" />
              <div className="service-info">
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

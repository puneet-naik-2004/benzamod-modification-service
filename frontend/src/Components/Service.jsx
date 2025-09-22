import {
  createService,
  deleteService,
  getServices,
  updateService,
} from "Services/service";
import { useState, useEffect, useRef } from "react";
import "../Style/Service.css";
import { Helmet } from "react-helmet-async";
import { getCategories } from "Services/categories";

function Services() {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [vehicleType, setVehicleType] = useState(""); // New field
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");

  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const formRef = useRef(null);

  // Fetch services
  useEffect(() => {
    getServices()
      .then((data) => setServices(data?.error ? [] : data || []))
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  // Fetch categories for type dropdown
  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data?.error ? [] : data || []))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title?.trim() || !photo?.trim() || !price || !type?.trim() || !vehicleType?.trim()) {
      alert("Please fill all required fields!");
      return;
    }

    const newService = { title, name, price, type, vehicleType, description, photo };

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
      .then(() => setServices(services.filter((s) => s._id !== id)))
      .catch((err) => console.error("Error deleting service:", err));
  };

  const handleEdit = (service) => {
    setEditingId(service._id);
    setTitle(service.title);
    setName(service.name);
    setPrice(service.price);
    setType(service.type);
    setVehicleType(service.vehicleType); // populate vehicleType
    setDescription(service.description);
    setPhoto(service.photo);

    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setName("");
    setPrice("");
    setType("");
    setVehicleType("");
    setDescription("");
    setPhoto("");
  };

  const filteredServices = services.filter(
    (s) =>
      s.title?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      s.description?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  return (
    <div className="services-container">
      <Helmet>
        <title>Manage Services | Admin</title>
        <meta
          name="description"
          content="Admin panel to manage services. Add, update, and delete services."
        />
      </Helmet>

      <h2 className="page-title">🛠️ Manage Services</h2>

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
          type="text"
          placeholder="Service Name (slug)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        {/* New Vehicle Type select */}
        <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
          <option value="">Select Vehicle Type</option>
          <option value="Car">Car</option>
          <option value="Bike">Bike</option>
        </select>

        <textarea
          placeholder="Description"
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

      {/* Search */}
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
                <p>Type: {s.type}</p>
                <p>Vehicle Type: {s.vehicleType}</p> {/* Display Vehicle Type */}
                <p>Price: ${s.price}</p>
                <p className="desc">{s.description}</p>
                <div className="card-buttons">
                  <button onClick={() => handleEdit(s)} className="btn btn-edit">
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

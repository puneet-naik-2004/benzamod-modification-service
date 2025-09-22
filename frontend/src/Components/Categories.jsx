import {
  createCategories,
  deletCategories,
  getCategories,
  updateCategories,
} from "Services/categories";
import { useState, useEffect, useRef } from "react";
import "../Style/Service.css";
import { Helmet } from "react-helmet-async";

function Categories() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");

  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const formRef = useRef(null);

  useEffect(() => {
    getCategories()
      .then((data) => {
        if (data.error) {
          setCategories([]);
        } else {
          setCategories(data || []);
        }
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name?.trim() || !photo?.trim()) {
      alert("Please fill all required fields!");
      return;
    }

    const newCategory = { name, description, photo };

    if (editingId) {
      updateCategories(editingId, newCategory)
        .then((updatedCategory) => {
          setCategories(
            categories.map((c) =>
              c._id === editingId ? updatedCategory : c
            )
          );
          resetForm();
        })
        .catch((err) => console.error("Error updating category:", err));
    } else {
      createCategories(newCategory)
        .then((addedCategory) => {
          setCategories([...categories, addedCategory]);
          resetForm();
        })
        .catch((err) => console.error("Error adding category:", err));
    }
  };

  const handleDelete = (id) => {
    deletCategories(id)
      .then(() => {
        setCategories(categories.filter((c) => c._id !== id));
      })
      .catch((err) => console.error("Error deleting category:", err));
  };

  const handleEdit = (category) => {
    setEditingId(category._id);
    setName(category.name);
    setDescription(category.description);
    setPhoto(category.photo);

    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setDescription("");
    setPhoto("");
  };

  const filteredCategories = categories.filter(
    (c) =>
      c.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      c.description?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Collection",
    name: "Manage Categories | Admin",
    description:
      "Admin panel to manage categories. Add, update, or delete categories.",
    url: window.location.href,
    provider: {
      "@type": "Organization",
      name: "",
    },
  };

  return (
    <div className="services-container">
      <Helmet>
        <title>Manage Categories | Admin</title>
        <meta
          name="description"
          content="Admin panel to manage categories. Add, update, and delete categories."
        />
        <meta name="keywords" content="Admin, Manage Categories" />
        <meta property="og:title" content="Manage Categories | Admin" />
        <meta
          property="og:description"
          content="Admin panel for managing categories."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <link rel="canonical" href={window.location.href} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <h2 className="page-title">📂 Manage Categories</h2>

      <form ref={formRef} onSubmit={handleSubmit} className="service-form">
        <h3>{editingId ? "✏️ Update Category" : "➕ Add New Category"}</h3>
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Category Description"
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
            {editingId ? "Update Category" : "Add Category"}
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

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <h3 className="list-name">📋 Available Categories</h3>
      <div className="service-list">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((c) => (
            <div key={c._id} className="service-card">
              <img src={c.photo} alt={c.name} className="service-img" />
              <div className="service-info">
                <h4>{c.name}</h4>
                <p className="desc">{c.description}</p>
                <div className="card-buttons">
                  <button
                    onClick={() => handleEdit(c)}
                    className="btn btn-edit"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="btn btn-delete"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No categories found.</p>
        )}
      </div>
    </div>
  );
}

export default Categories;

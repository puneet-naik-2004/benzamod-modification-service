import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "Services/category";
import { useState, useEffect, useRef } from "react";
// import "../Style/Category.css";
import { Helmet } from "react-helmet-async";

function Categories() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");

  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ search state
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
      updateCategory(editingId, newCategory)
        .then((updatedCategory) => {
          setCategories(
            categories.map((c) => (c._id === editingId ? updatedCategory : c))
          );
          resetForm();
        })
        .catch((err) => console.error("Error updating category:", err));
    } else {
      createCategory(newCategory)
        .then((addedCategory) => {
          setCategories([...categories, addedCategory]);
          resetForm();
        })
        .catch((err) => console.error("Error adding category:", err));
    }
  };

  const handleDelete = (id) => {
    deleteCategory(id)
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

    const yOffset = -100;
    const y =
      formRef.current.getBoundingClientRect().top +
      window.pageYOffset +
      yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setDescription("");
    setPhoto("");
  };

  // ✅ Filter categories based on search
  const filteredCategories = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Collection",
    name: "Manage Categories | SHOPPER Admin",
    description:
      "Admin panel to manage categories for products and services. Add, update, or delete categories.",
    url: window.location.href,
    provider: {
      "@type": "Organization",
      name: "SHOPPER",
    },
  };

  return (
    <div className="categories-container">
      {/* 🔎 SEO Helmet */}
      <Helmet>
        <title>Manage Categories | SHOPPER Admin</title>
        <meta
          name="description"
          content="Admin panel to manage categories (Products & Services). Add, update, and delete categories at SHOPPER."
        />
        <meta name="keywords" content="Admin, Manage Categories, SHOPPER" />

        <meta property="og:title" content="Manage Categories | SHOPPER Admin" />
        <meta
          property="og:description"
          content="Admin panel for managing categories at SHOPPER."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />

        <link rel="canonical" href={window.location.href} />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <h2 className="page-title">📂 Manage Categories</h2>

      {/* Category Form */}
      <form ref={formRef} onSubmit={handleSubmit} className="category-form">
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

      {/* 🔍 Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category List */}
      <h3 className="list-name">📋 Available Categories</h3>
      <div className="category-list">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((c) => (
            <div key={c._id} className="category-card">
              <img src={c.photo} alt={c.name} className="category-img" />
              <div className="category-info">
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

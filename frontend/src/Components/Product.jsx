import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "Services/product";
import { useState, useEffect, useRef } from "react";
import "../Style/Product.css";
import { Helmet } from "react-helmet-async";

function Products() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("Wraps");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");

  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ search bar state
  const formRef = useRef(null);

  useEffect(() => {
    getProducts()
      .then((data) => {
        if (data.error) {
          setProducts([]);
        } else {
          setProducts(data || []);
        }
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title?.trim() || !price || !type?.trim() || !photo?.trim()) {
      alert("Please fill all fields!");
      return;
    }

    const newProduct = { title, price, type, description, photo };

    if (editingId) {
      updateProduct(editingId, newProduct)
        .then((updatedProduct) => {
          setProducts(
            products.map((p) => (p._id === editingId ? updatedProduct : p))
          );
          resetForm();
        })
        .catch((err) => console.error("Error updating product:", err));
    } else {
      createProduct(newProduct)
        .then((addedProduct) => {
          setProducts([...products, addedProduct]);
          resetForm();
        })
        .catch((err) => console.error("Error adding product:", err));
    }
  };

  const handleDelete = (id) => {
    deleteProduct(id)
      .then(() => {
        setProducts(products.filter((p) => p._id !== id));
      })
      .catch((err) => console.error("Error deleting product:", err));
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setTitle(product.title);
    setPrice(product.price);
    setType(product.type);
    setDescription(product.description);
    setPhoto(product.photo);

    const yOffset = -150;
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
    setType("Wraps");
    setDescription("");
    setPhoto("");
  };

  // ✅ Filter products based only on title
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: "Manage Products | SHOPPER Admin",
    description:
      "Admin panel to manage wraps, exhausts, lights, and seats products. Add, update, or delete products.",
    url: window.location.href,
    brand: {
      "@type": "Organization",
      name: "SHOPPER",
    },
  };

  return (
    <div className="products-container">
      {/* 🔎 SEO Helmet */}
      <Helmet>
        <title>Manage Products | SHOPPER Admin</title>
        <meta
          name="description"
          content="Admin panel to manage Wraps, Exhausts, Lights, and Seats products at SHOPPER."
        />
        <meta
          name="keywords"
          content="Admin, Manage Products, SHOPPER, Wraps, Exhausts, Lights, Seats"
        />

        <meta property="og:title" content="Manage Products | SHOPPER Admin" />
        <meta
          property="og:description"
          content="Admin panel for managing Wraps, Exhausts, Lights, and Seats products."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />

        <link rel="canonical" href={window.location.href} />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <h2 className="page-title">
        🛒 Manage Products (Wraps & Exhausts & Lights & Seats)
      </h2>

      {/* Product Form */}
      <form ref={formRef} onSubmit={handleSubmit} className="product-form">
        <h3>{editingId ? "✏️ Update Product" : "➕ Add New Product"}</h3>
        <input
          type="text"
          placeholder="Product Title"
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
          placeholder="Product Description"
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
            {editingId ? "Update Product" : "Add Product"}
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
          placeholder="Search products by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Product List */}
      <h3 className="list-title">📋 Available Products</h3>
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <div key={p._id} className="product-card">
              <img src={p.photo} alt={p.title} className="product-img" />
              <div className="product-info">
                <h4>{p.title}</h4>
                <p className="price">💰 ${p.price}</p>
                <p className="type">{p.type}</p>
                <p className="desc">{p.description}</p>
                <div className="card-buttons">
                  <button
                    onClick={() => handleEdit(p)}
                    className="btn btn-edit"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="btn btn-delete"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No products found.</p>
        )}
      </div>
    </div>
  );
}

export default Products;

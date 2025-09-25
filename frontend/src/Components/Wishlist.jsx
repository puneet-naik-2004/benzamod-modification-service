import React, { useEffect, useState } from "react";
import { getWishlist, deleteWishlist } from "Services/wishlist"; // ✅ you need wishlist APIs
import "../Style/Wishlist.css";
import { useAuth } from "Context/AuthContext";
import { Link } from "react-router-dom";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    const data = await getWishlist();
    if (!data.error) {
      setWishlist(data.wishlist.filter((each) => each.customer_id === user?._id));
    }
    
  };



  const handleDelete = async (id) => {
    if (window.confirm("Remove this item from wishlist?")) {
      const res = await deleteWishlist(id);
      if (!res.error) {
        setWishlist((prev) => prev.filter((item) => item._id !== id));
      } else {
        alert("Failed to remove wishlist item: " + res.error);
      }
    }
  };

  return (
    <div className="wishlist-container">
      <h2>❤️ My Wishlist</h2>

      <div className="wishlist-list">
        {wishlist.length > 0 ? (
          wishlist.map((item) => (
            <div key={item._id} className="wishlist-card">
              <img src={item.photo} alt={item.title} />
              <div className="wishlist-info">
                <h4>{item.title}</h4>
                <p>💰 ₹{item.price}</p>
                <p>📂 {item.type}</p>
                <p>📝 {item.description}</p>
              </div>

              <div className="wishlist-actions">
                <Link to={`/products/${item._id}`} className="view-btn">
                  View Product
                </Link>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item._id)}
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-msg">Your wishlist is empty ❤️</p>
        )}
      </div>
    </div>
  );
}

export default Wishlist;

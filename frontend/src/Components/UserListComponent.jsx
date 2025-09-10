import React, { useEffect, useState } from "react";
import { getUser, deleteUser } from "Services/user";
import "../Style/UserList.css"
export function UserListComponent() {
  const [users, setUsers] = useState([]);

  // Load registered users
  useEffect(() => {
    getUser().then((data) => {
      if (!data.error) setUsers(data.user || []);
    });
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u._id !== id));
      alert("✅ User deleted successfully!");
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("❌ Failed to delete user");
    }
  };

  return (
    <div className="user-container">
      <h2>🧑‍💻 Registered Users</h2>
      <div className="user-list">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="user-card">
              <div className="user-info">
                <h4>👤 {user.name}</h4>
                <p>📧 {user.email}</p>
                <p>📞 {user.phone || "N/A"}</p>
                <p>🔑 {user.role || "User"}</p>
              </div>
              <div className="user-actions">
                <button
                  className="btn-view"
                  onClick={() =>
                    alert(`
Name: ${user.name}
Email: ${user.email}
Phone: ${user.phone || "N/A"}
Role: ${user.role || "User"}
                    `)
                  }
                >
                  👁 View
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(user._id)}
                >
                  ❌ Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No registered users found.</p>
        )}
      </div>
    </div>
  );
}

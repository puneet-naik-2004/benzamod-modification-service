import React, { useEffect, useState } from "react";
import { getUser, deleteUser } from "Services/user";
import "../Style/UserList.css";

export function UserListComponent() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
      setUsers((prev) => prev.filter((u) => u._id !== id));
      alert("✅ User deleted successfully!");
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("❌ Failed to delete user");
    }
  };

  // 🔎 Filter users
  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      (user.phone && user.phone.toLowerCase().includes(term)) ||
      (user.role && user.role.toLowerCase().includes(term))
    );
  });

  return (
    <div className="user-container">
      <h2 className="page-title">🧑‍💻 Registered Users</h2>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search by name, email, phone, or role..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredUsers.length > 0 ? (
        <table className="user-table">
          <thead>
            <tr>
              <th>👤 Name</th>
              <th>📧 Email</th>
              <th>📞 Phone</th>
              <th>🔑 Role</th>
              <th>⚡ Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone || "N/A"}</td>
                <td>{user.role || "User"}</td>
                <td className="actions">
                  <button
                    className="btn btn-view"
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
                    className="btn btn-delete"
                    onClick={() => handleDelete(user._id)}
                  >
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-results">No registered users found.</p>
      )}
    </div>
  );
}

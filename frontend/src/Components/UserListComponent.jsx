import React, { useEffect, useState } from "react";
import { getUser, deleteUser, createUser } from "Services/user";
import { useAuth } from "Context/AuthContext"; // 🔹 make sure you have user role here
import "../Style/UserList.css";

export function UserListComponent() {
  const { user } = useAuth(); // 🔹 logged-in user info (role included)
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

  // New user form states
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("admin");

  // Load users
  useEffect(() => {
    getUser().then((data) => {
      if (!data.error) setUsers(data.users || []);
    });
  }, []);

  // Create user
  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!newName || !newEmail || !newPassword) {
      alert("⚠️ Please fill all required fields!");
      return;
    }

    const userData = {
      name: newName,
      email: newEmail,
      password: newPassword,
      role: newRole,
    };

    try {
      const res = await createUser(userData);
      if (!res.error) {
        setUsers((prev) => [...prev, res.user]);
        alert("✅ Admin created successfully!");
        setNewName("");
        setNewEmail("");
        setNewPassword("");
        setNewRole("admin");
        setShowForm(false);
      } else {
        alert("❌ Failed to create Admin");
      }
    } catch (err) {
      console.error("Error creating user:", err);
      alert("⚠️ Server error");
    }
  };

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

  // Filter users
  const filteredUsers = users.filter((user) => {
    const term = searchTerm?.toLowerCase();
    return (
      user.name?.toLowerCase()?.includes(term) ||
      user.email?.toLowerCase()?.includes(term) ||
      (user.phone && user.phone?.toLowerCase()?.includes(term)) ||
      (user.role && user.role?.toLowerCase()?.includes(term))
    );
  });

  return (
    <div className="user-container">
      <h2 className="page-title">🧑‍💻 Manage Users</h2>

      {/* 🔹 Show Create Admin option ONLY if logged-in user is superadmin */}
      {user?.role === "super_admin" && (
        <div className="toggle-btn-container">
          <button
            className="toggle-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "✖ Close Form" : "➕ Create New Admin"}
          </button>
        </div>
      )}

      {/* New User Form (SuperAdmin only) */}
      {user?.role === "super_admin" && showForm && (
        <form className="new-user-form" onSubmit={handleCreateUser}>
          <input
            type="text"
            placeholder="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <select value={newRole} onChange={(e) => setNewRole(e.target.value)}>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="btn btn-primary">
            Create Admin
          </button>
        </form>
      )}

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name, email, phone, or role..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* User Table */}
      {filteredUsers.length > 0 ? (
        <table className="user-table">
          <thead>
            <tr>
              <th>👤 Name</th>
              <th>📧 Email</th>
              <th>🔑 Role</th>
              <th>⚡ Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className="role-label">{user.role || "User"}</span>
                </td>
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

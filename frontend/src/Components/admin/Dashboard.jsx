import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "../../Style/AdminDashboard.css";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem("role") === "admin";
    if (!isAdmin) {
      navigate("/login");
    }
  }, [navigate]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className={`admin-dashboard ${isSidebarOpen ? "sidebar-open" : ""}`}>
      {/* 🔹 Navbar */}
      <header className="admin-navbar">
        <button className="menu-btn" onClick={toggleSidebar}>
          {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        <h1 className="navbar-title">Admin Dashboard</h1>
      </header>

      <div className="dashboard-layout">
        {/* 🔹 Sidebar */}
        <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
          <h2 className="logo">⚡ Admin Panel</h2>
          <ul>
            <li onClick={() => navigate("/admin/products")}>📦 Products</li>
            <li onClick={() => navigate("/admin/services")}>🛠 Services</li>
            <li onClick={() => navigate("/admin/contactlist")}>📩 Contact</li>
            <li onClick={() => navigate("/admin/orders")}>🛒 Orders</li>
            <li onClick={() => navigate("/admin/portfolio")}>🎨 Portfolio</li>
            <li onClick={() => navigate("/admin/userlist")}>👥 User List</li>
            <li onClick={() => navigate("/admin/inquiry")}>❓ Inquiries</li>
          </ul>
        </aside>

        {/* 🔹 Main Content */}
        <main className="dashboard-content" onClick={() => isSidebarOpen && toggleSidebar()}>
          <h2>Welcome, Admin 👋</h2>
          <p>Select an option from the sidebar to manage content.</p>
        </main>
      </div>
    </div>
  );
};

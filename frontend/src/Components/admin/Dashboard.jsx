import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Style/AdminDashboard.css";

export const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem("role") === "admin";
    if (!isAdmin) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Admin Panel</h2>
        <ul>
          <li onClick={() => navigate("/admin/products")}>Products</li>
          <li onClick={() => navigate("/admin/services")}>Services</li>
          <li onClick={() => navigate("/admin/contactlist")}>Contact Us</li>
          <li onClick={() => navigate("/admin/orders")}>Orders</li>
          <li onClick={() => navigate("/admin/portfolio")}>Portfolio</li>
          <li onClick={() => navigate("/admin/userlist")}>UserList</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">
        <h2>Welcome to Admin Dashboard</h2>
        <p>Select an option from the sidebar to manage content.</p>
      </main>
    </div>
  );
};


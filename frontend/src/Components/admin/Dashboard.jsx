



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "../../Style/AdminDashboard.css";

// Import your components
import Products from "../../Pages/ProductPage";   // Example: Product management component
import Services from "../Service";   // Example: Service management component
import {ContactListComponent} from "../ContactList.component";
import Portfolio from "../Portfolio";
import {OrdersList} from "../Orders";
import {UserListComponent} from "../UserListComponent";
import InquiryList from "../InquiryList";
// import Categories from "../Service";
// import Admins from "../admin";       // Admin list component

export const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("products"); // default tab

  useEffect(() => {
    const isAdmin = localStorage.getItem("role") === "admin";
    if (!isAdmin) {
      navigate("/login");
    }
  }, [navigate]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // Render main content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "products":
        return <Products />;
      // case "services":
      //   return <Services />;
      case "contacts":
        return <ContactListComponent />;
      case "portfolio":
        return <Portfolio />;
      case "orders":
        return <OrdersList />;
      case "users":
        return <UserListComponent />;
      case "inquiries":
        return <InquiryList />;
      case "services":
        return <Services />;
      default:
        return <h2>Select an option from the sidebar</h2>;
    }
  };

  return (
    <div className="admin-dashboard">
      {/* 🔹 Navbar */}
      <header className="admin-navbar">
        <button className="menu-btn" onClick={toggleSidebar}>
          {isSidebarOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
        <h1 className="navbar-title">Admin Dashboard</h1>
      </header>

      <div className="dashboard-layout">
        {/* 🔹 Sidebar */}
        <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
          <h2 className="logo">⚡ Admin Panel</h2>
          <ul>
            <li
              className={activeTab === "products" ? "active" : ""}
              onClick={() => setActiveTab("products")}
            >
              📦 Products
            </li>
            <li
              className={activeTab === "services" ? "active" : ""}
              onClick={() => setActiveTab("services")}
            >
              🛠 Services
            </li>



            {/* <li
              className={activeTab === "services" ? "active" : ""}
              onClick={() => setActiveTab("services")}
            >
              🛠 Services
            </li> */}
            <li
              className={activeTab === "contacts" ? "active" : ""}
              onClick={() => setActiveTab("contacts")}
            >
              📩 Contacts
            </li>
            <li
              className={activeTab === "orders" ? "active" : ""}
              onClick={() => setActiveTab("orders")}
            >
              🛒 Orders
            </li>
            <li
              className={activeTab === "portfolio" ? "active" : ""}
              onClick={() => setActiveTab("portfolio")}
            >
              🎨 Portfolio
            </li>
            <li
              className={activeTab === "users" ? "active" : ""}
              onClick={() => setActiveTab("users")}
            >
              👥 Users
            </li>
            <li
              className={activeTab === "inquiries" ? "active" : ""}
              onClick={() => setActiveTab("inquiries")}
            >
              ❓ Inquiries
            </li>


           



            {/* <li
              className={activeTab === "admins" ? "active" : ""}
              onClick={() => setActiveTab("admins")}
            >
              🔑 Admins
            </li> */}
          </ul>
        </aside>

        {/* 🔹 Main Content */}
        <main className="dashboard-content">{renderContent()}</main>
      </div>
    </div>
  );
};




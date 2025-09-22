import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react"; // ✅ Import logout icon
import "../../Style/AdminDashboard.css";

// Import your components
import Products from "../../Pages/ProductPage";
import Categories from "../Categories";
import Services from "../Service";
import { ContactListComponent } from "../ContactList.component";
import Portfolio from "../Portfolio";
import { OrdersList } from "../Orders";
import { UserListComponent } from "../UserListComponent";
import InquiryList from "../InquiryList";
import Profile from "../Profile";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("products"); // default tab

  // ✅ Check admin auth
  useEffect(() => {
    const isAdmin = localStorage.getItem("role") === "admin";
    if (!isAdmin) {
      navigate("/login");
    }
  }, [navigate]);

  // ✅ Auto-open sidebar on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.clear(); // remove role
      navigate("/"); // redirect to login
  };

  // ✅ Render content dynamically
  const renderContent = () => {
    switch (activeTab) {
      case "products":
        return <Products />;
      case "services":
        return <Services />;
      case "categories":
        return <Categories />;
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
      case "profile":
        return <Profile />;
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
            <li
              className={activeTab === "categories" ? "active" : ""}
              onClick={() => setActiveTab("categories")}
            >
              🔧 Categories
            </li>
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
            <li
              className={activeTab === "profile" ? "active" : ""}
              onClick={() => setActiveTab("profile")}
            >
              👤 Profile
            </li>

            {/* 🔹 Logout button */}
            <li className="logout-btn" onClick={handleLogout}>
              <LogOut size={18} /> Logout
            </li>
          </ul>
        </aside>

        {/* 🔹 Main Content */}
        <main className="dashboard-content">{renderContent()}</main>
      </div>
    </div>
  );
};

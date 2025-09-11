import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogIn, Shield } from "lucide-react";
import "../Style/Hedder.css";
import { useAuth } from "Context/AuthContext";

const Hedder = () => {
  const [menu, setMenu] = useState("bikes");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedName = localStorage.getItem("userName");
    if (token) {
      setIsLoggedIn(true);
      setUserName(storedName || "User");
    }
  }, []);

  const handleNav = (path, section) => {
    setMenu(section);
    navigate(path);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserName("");
    navigate("/login");
  };

  return (
    <div className="navbar">
      {/* ✅ Left Side: Logo */}
      <div className="logo-container">
        <img
          src="https://cdn.vectorstock.com/i/1000x1000/60/47/bike-motorcycle-rider-logo-design-vector-28706047.webp"
          alt="logo"
          className="logo-img"
        />
        <p className="logo">BENZAMOD</p>
      </div>

      {/* ✅ Hamburger (Mobile) */}
      <div className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <X size={28} /> : <Menu size={28} />}
      </div>

      {/* ✅ Center: Nav Menu */}
      <ul className={`nav-menu ${mobileOpen ? "open" : ""}`}>
        <li onClick={() => handleNav("/service/Bike", "bikes")}>
          Bike
        </li>
        <li onClick={() => handleNav("/service/Car", "cars")}>
          Car 
        </li>
        {/* <li onClick={() => handleNav("/shop", "shop")}>
          Shop {menu === "shop" ? <hr /> : null}
        </li>
        <li onClick={() => handleNav("/parts", "parts")}>
          Parts {menu === "parts" ? <hr /> : null}
        </li> */}
        <li onClick={() => handleNav("/portfolio", "portfolio")}>
          Portfolio 
        </li>
        {/* <li onClick={() => handleNav("/about", "about")}>
          About</li> */}
        <li onClick={() => handleNav("/products", "products")}>
          Product 
        </li>
        <li onClick={() => handleNav("/orders", "orders")}>
          Orders 
        </li>
        <li onClick={() => handleNav("/cart", "cart")}>
          Cart
        </li>
      </ul>

      {/* ✅ Right Side: Login/Admin OR Welcome/Logout/Cart */}
      <div className="nav-login-cart">
        {isLoggedIn ? (
          <>
            <span className="welcome-text">Hi, {userName} 👋</span>
            <button className="btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="btn login-btn">
                <LogIn size={16} /> Login
              </button>
            </Link>
            <Link to="/adminlogin">
              <button className="btn admin-btn">
                <Shield size={16} /> Admin
              </button>
            </Link>
          </>
        )}
        {/* <div className="nav-cart-count">0</div> */}
      </div>
    </div>
  );
};

export default Hedder;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogIn, Shield } from "lucide-react";
import "../Style/Hedder.css";
import { useAuth } from "Context/AuthContext";
import { getCart, deleteCart, buynowCart } from "Services/cart";

const Hedder = () => {
  const [menu, setMenu] = useState("bikes");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
   const [cart, setCart] = useState([])
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
    sessionStorage.removeItem("hasReloaded"); // ✅ reset reload flag
    setIsLoggedIn(false);
    setUserName("");
    window.location.reload()
  };


  
    useEffect(() => {
      loadCart();
    }, []);
  
    const loadCart = async () => {
      const data = await getCart();
      if (!data.error) {
        // ✅ Add quantity field (default 1) to each cart item
        setCart(
          data.cart
            .filter((each) => each.customer_id === user?._id)
            .map((item) => ({ ...item, quantity: item.quantity || 1 }))
        );
      }
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

      {/* ✅ Nav Menu */}
      <ul className={`nav-menu ${mobileOpen ? "open" : ""}`}>
       
         
         <li onClick={() => handleNav("/pages", "pages")}>Home</li>
         <li onClick={() => handleNav("/portfolio", "portfolio")}>Portfolio</li>
        <li onClick={() => handleNav("/products", "products")}>Service</li>
        <li onClick={() => handleNav("/orders", "orders")}>Orders</li>
        <li onClick={() => handleNav("/producttype", "product")}>Product</li>
        <li onClick={() => handleNav("/cart", "cart.length")}>🛒{cart.length}</li>

        {/* ✅ Only show this on MOBILE */}
        <div className="mobile-only">
          {isLoggedIn ? (
            <>
              <li className="mobile-user">Hi, {userName} 👋</li>
              <li>
                <button className=" logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <button className=" login-btn">
                    <LogIn size={16} /> Login
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/adminlogin" onClick={() => setMobileOpen(false)}>
                  <button className=" admin-btn">
                    <Shield size={16} /> Admin
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/profile" onClick={() => setMobileOpen(false)}>
                  <button className="profile-btn">
                    <Shield size={16} /> Profile
                  </button>
                </Link>
              </li>
            </>
          )}
        </div>
      </ul>

      {/* ✅ Right side (Desktop only) */}
      <div className="nav-login-cart desktop-only">
        {isLoggedIn ? (
          <>
            <button className=" logout-btn" onClick={handleLogout}>
              Logout
            </button>
            <Link to="/profile">
              <button className=" admin-btn">
                <Shield size={16} /> Profile
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className=" login-btn">
                <LogIn size={16} /> Login
              </button>
            </Link>
            <Link to="/adminlogin">
              <button className=" admin-btn">
                <Shield size={16} /> Admin
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Hedder;

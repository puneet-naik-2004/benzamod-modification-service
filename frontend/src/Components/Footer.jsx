
import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom"; // ✅ import Link
import "../Style/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Brand */}
        <div className="footer-section">
          <div className="logo-container">
          <img
          src="https://cdn.vectorstock.com/i/1000x1000/60/47/bike-motorcycle-rider-logo-design-vector-28706047.webp"
          alt="logo"
          className="logo-img"
          />
        </div>
           <h2 className="footer-title">BENZAMOD</h2>
          <p className="footer-text">
            Your one-stop shop for amazing products. Quality and trust delivered
            to your doorstep.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-subtitle">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/pages">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/feature-service">Services</Link></li> {/* ✅ navigate services */}
            <li><Link to="/contact">Contact</Link></li> {/* ✅ navigate contact */}
          </ul>
        </div>

        {/* Customer Support */}
        <div className="footer-section">
          <h3 className="footer-subtitle">Support</h3>
          <ul className="footer-links">
            <li><Link to="/+918765432192">+918765432192</Link></li>
            <li><Link to="/banzamod@gmail.com">banzamod@gmail.com</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
            <li><Link to="/help">Help Center</Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="footer-section">
          <h3 className="footer-subtitle">Follow Us</h3>
          <div className="footer-socials">
            <a href="#"><Facebook size={22} /></a>
            <a href="#"><Twitter size={22} /></a>
            <a href="#"><Instagram size={22} /></a>
            <a href="#"><Linkedin size={22} /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} BENZAMOD. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

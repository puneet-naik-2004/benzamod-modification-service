import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import { AuthProvider } from "./Context/AuthContext";

const HomePage = lazy(() => import("./Pages/HomePage"));
const ServiceList = lazy(() => import("./Pages/ServiceList"));
const ServiceDetail = lazy(() => import("./Pages/ServiceDetail"));
const LoginPage = lazy(() => import("./Pages/LoginPage"));
const RegisterPage = lazy(() => import("./Pages/RegisterPage"));
const ProductsList = lazy(() => import("./Pages/ProductList"));
const ProductDetail = lazy(() => import("./Pages/ProductDetail"));
const AdminDashboard = lazy(() => import("./Pages/AdminDashboard"));
const Product = lazy(() => import("./Pages/ProductPage"));
const Service = lazy(() => import("./Pages/ServicePage"));
const ContactList = lazy(() => import("./Pages/ContactList"));
const Orders = lazy(() => import("./Pages/OrderPage"));
const FeatuerService = lazy(() => import("./Pages/FeatuerServicePage"));
const AdminLogin = lazy(() => import("./Pages/AdminLogin"));
const Contact = lazy(() => import("./Pages/ContactPage"));
const Cart = lazy(() => import("./Pages/CartPage"));
const Portfolio = lazy(() => import("./Pages/PortfolioPage"));
const UserList = lazy(() => import("./Pages/UserList"));
const PortfolioList= lazy(() => import("./Pages/PortfolioList"));

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* ✅ Suspense wraps all lazy routes */}
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Routes>
            {/* Normal Website Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/service/:type" element={<ServiceList />} />
            <Route path="/service/:type/:name" element={<ServiceDetail />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/product/:type" element={<ProductsList />} />
            <Route path="/product/:type/:id" element={<ProductDetail />} />

            {/* Admin Routes */}
            <Route path="/admin/products" element={<Product />} />
            <Route path="/admin/services" element={<Service />} />
            <Route path="/admin/contactList" element={<ContactList />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/portfolio" element={<Portfolio />} />
            <Route path="/admin/userlist" element={<UserList />} />
          

            {/* Other Routes */}
            <Route path="/checkout" element={<Orders />} />
            <Route path="/orders" element={<Orders />} />
            {/* <Route path="/cart" element={<Orders />} /> */}
            <Route path="/feature-service" element={<FeatuerService />} />
            <Route path="/products" element={<FeatuerService />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
             <Route path="/portfolio" element={<PortfolioList/>} />
            
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;


import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import { AuthProvider } from "./Context/AuthContext";
import BuynowPage from "Pages/BuynowPage";
import Header from "./Components/Hedder"; 
import Footer from "./Components/Footer"; // ✅ Import Footer

// Lazy-loaded pages
const HomePage = lazy(() => import("./Pages/HomePage"));
// const ServiceList = lazy(() => import("./Pages/ServiceList"));
// const ServiceDetail = lazy(() => import("./Pages/ServiceDetail"));
const LoginPage = lazy(() => import("./Pages/LoginPage"));
const RegisterPage = lazy(() => import("./Pages/RegisterPage"));
const ProductsList = lazy(() => import("./Pages/ProductList"));
const ProductDetail = lazy(() => import("./Pages/ProductDetail"));
const AdminDashboard = lazy(() => import("./Pages/AdminDashboard"));
const Product = lazy(() => import("./Pages/ProductPage"));
// const Service = lazy(() => import("./Pages/ServicePage"));
const ContactList = lazy(() => import("./Pages/ContactList"));
const Orders = lazy(() => import("./Pages/OrderPage"));
const FeatuerService = lazy(() => import("./Pages/FeatuerServicePage"));
const AdminLogin = lazy(() => import("./Pages/AdminLogin"));
const Contact = lazy(() => import("./Pages/ContactPage"));
const Cart = lazy(() => import("./Pages/CartPage"));
const Portfolio = lazy(() => import("./Pages/PortfolioPage"));
const UserList = lazy(() => import("./Pages/UserList"));
const PortfolioList = lazy(() => import("./Pages/PortfolioList"));
const InquiryList = lazy(() => import("./Components/InquiryList"));
const About = lazy(() => import("./Components/About"));
const Home = lazy(() => import("./Components/HeroBanner"));
const Service = lazy(() => import("./Pages/ServicePage"));
const Profile = lazy(() => import("./Pages/ProfilePage"));

function AppContent() {
  const location = useLocation();

  // ❌ Hide header/footer if admin routes
 const hideHeader = location.pathname.startsWith("/admin")  ||
 location.pathname === "/pages" ||
 location.pathname === "/";
 const hideFooter = location.pathname.startsWith("/admin") ||
  location.pathname === "/pages" ||
  location.pathname === "/";


  return (
    <>
      {!hideHeader && <Header />}

      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Routes>
          {/* Normal Website Routes */}
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/service/:type" element={<ServiceList />} />
          <Route path="/service/:type/:name" element={<ServiceDetail />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/product/:type" element={<ProductsList />} />
          <Route path="/product/:type/:id" element={<ProductDetail />} />
          <Route path="/pages" element={<HomePage />} />

          {/* Admin Routes */}
          <Route path="/admin/products" element={<Product />} />
          {/* <Route path="/admin/services" element={<Service />} /> */}
          <Route path="/admin/contactList" element={<ContactList />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/portfolio" element={<Portfolio />} />
          <Route path="/admin/userlist" element={<UserList />} />
          <Route path="/admin/inquiry" element={<InquiryList />} />
           <Route path="/admin/Services" element={<Service />} />


          {/* Other Routes */}
          <Route path="/checkout" element={<Orders />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/feature-service" element={<FeatuerService />} />
          <Route path="/products" element={<FeatuerService />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/portfolio" element={<PortfolioList />} />
          <Route path="/buynow/:id" element={<BuynowPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/pages" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>

      {!hideFooter && <Footer />} {/* ✅ Footer visible on all non-admin pages */}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;

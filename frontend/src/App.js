import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import React, { Suspense, lazy } from "react";
import { AuthProvider } from "./Context/AuthContext";
import BuynowPage from "Pages/BuynowPage";
import Header from "./Components/Hedder";
import Footer from "./Components/Footer"; // ✅ Import Footer

// Lazy-loaded pages
const HomePage = lazy(() => import("./Pages/HomePage"));
const LoginPage = lazy(() => import("./Pages/LoginPage"));
const RegisterPage = lazy(() => import("./Pages/RegisterPage"));
const ProductsList = lazy(() => import("./Pages/ProductList"));
const ServiceList = lazy(() => import("./Pages/ServiceList"));
const ProductDetail = lazy(() => import("./Pages/ProductDetail"));
const ServiceDetail = lazy(() => import("./Pages/ServiceDetail"));
const AdminDashboard = lazy(() => import("./Pages/AdminDashboard"));
const Product = lazy(() => import("./Pages/ProductPage"));
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
const ProductType = lazy(() => import("./Components/ProductType"));
const PortfolioDetail = lazy(() => import("./Components/PortfolioDetail"));
const AdminOrderList = lazy(() => import("./Components/AdminOrderList"));
const ProtectedRoute = lazy(() => import("./Components/admin/ProtectedRoute"));

function AppContent() {
  const location = useLocation();
  const hideHeader =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/pages" ||
    location.pathname === "/";
  const hideFooter =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/pages" ||
    location.pathname === "/";

  return (
    <>
      {!hideHeader && <Header />}
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Routes>
           {/* Normal Website Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/product/:type" element={<ProductsList />} />
          <Route path="/service/:type" element={<ServiceList />} />
          <Route path="/product/:type/:id" element={<ProductDetail />} />
          <Route path="/service/:type/:id" element={<ServiceDetail />} />
          <Route path="/pages" element={<HomePage />} />

          {/* ✅ Protect all admin routes */}
          <Route
            path="/admin"
            element={<ProtectedRoute allowedRoles={["admin", "super_admin"]} />}
          >
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<Product />} />
            <Route path="contactList" element={<ContactList />} />
            <Route path="adminorderlist" element={<AdminOrderList />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="userlist" element={<UserList />} />
            <Route path="inquiry" element={<InquiryList />} />
            <Route path="services" element={<Service />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Admin login stays public */}
          <Route path="/adminlogin" element={<AdminLogin />} />

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
          <Route path="/producttype" element={<ProductType />} />
          <Route path="/portfolio/:id" element={<PortfolioDetail />} />
        </Routes>
      </Suspense>
      {!hideFooter && <Footer />}{" "}
      {/* ✅ Footer visible on all non-admin pages */}
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

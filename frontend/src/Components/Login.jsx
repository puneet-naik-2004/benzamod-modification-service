import React, { useEffect, useState } from "react";
import { loginUser } from "Services/login";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "../Style/LoginPage.css";
import { useAuth } from "Context/AuthContext"; // ✅ use Auth Context

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth(); // ✅ from AuthContext

  const from = location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser({ email, password });

      if (result.token) {
        const role = result.user?.role;
        // Save token in localStorage
        localStorage.setItem("token", result.token);
        localStorage.setItem("userName", result.user?.name || email);
        localStorage.setItem("role", role);

        // Save user data in context
        login(result.user);

        alert("✅ Login Successful");
        if (role === "admin" || role === "super_admin") {
          navigate("/admin/dashboard", { replace: true }); // ✅ go back to previous page
        } else {
          navigate("/", { replace: true }); // ✅ go back to previous page
        }
      } else {
        alert(result.message || "❌ Login Failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("⚠️ Server error");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">🔑 Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="📧 Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="🔒 Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">🚀 Login</button>
        </form>
        <p className="switch-text">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

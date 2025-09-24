import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Style/AdminLogin.css";
import { loginUser } from "Services/login";
import { useAuth } from "Context/AuthContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ from AuthContext

  const handleLogin = async (e) => {
    e.preventDefault();
    const result= await loginUser({ email, password });

    if (result.token) {
      const role = result.user?.role
      // Save token in localStorage
      localStorage.setItem("token", result.token);
      localStorage.setItem("userName", result.user?.name || email);
      localStorage.setItem("role", role);

      // Save user data in context
      login(result.user);
      if(role==="admin" || role === "super_admin"){
        navigate("/admin/dashboard", { replace: true }); // ✅ go back to previous page
      }else{
        navigate("/", { replace: true }); // ✅ go back to previous page
      }
    } else {
      alert(result.message || "❌ Login Failed");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h2>🔐 Admin Login</h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleLogin} className="admin-login-form">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};


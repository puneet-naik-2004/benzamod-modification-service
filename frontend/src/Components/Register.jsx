import React, { useState } from "react";
import { registerUser } from "Services/login";
import { useNavigate, Link } from "react-router-dom";
import "../Style/RegisterPage.css"; 

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await registerUser({ name, email, password });
    if (result.success) {
      alert("Registration Successful");
      navigate("/login");
    } else {
      alert(result.message || "Registration Failed");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <h2 className="register-title">📝 Create Account</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            placeholder="👤 Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="📧 Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="🔒 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">🚀 Register</button>
        </form>
        <p className="switch-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}


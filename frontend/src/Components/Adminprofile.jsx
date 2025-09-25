import React, { useEffect, useState } from "react";
import "../Style/Profile.css";
import { changePassword } from "Services/user";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const [user, setUser] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage("❌ New passwords do not match!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await changePassword(passwords, token);

      if (res.data.success) {
        setMessage("✅ Password changed successfully!");
        setPasswords({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setShowPasswordForm(false);
      }
    } catch (err) {
      setMessage(
        "✅ " + (err.response?.data?.message || "Password changed successfully")
      );
    }
  };

  if (!user) {
    return <p className="loading">Loading profile...</p>;
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <h2>👤 My Profile</h2>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>

        {/* ✅ New Buttons */}
       

        <h3>📍 Addresses</h3>
        <ul className="address-list">
          {user.addresses && user.addresses.length > 0 ? (
            user.addresses.slice(0, 2).map((addr, index) => (
              <li key={index}>
                {addr.street}, {addr.city}, {addr.state}, {addr.zip},{" "}
                {addr.country}
              </li>
            ))
          ) : (
            <li>No addresses saved.</li>
          )}
        </ul>

        {/* Change Password */}
        <div className="password-section">
          <button
            className="btn password-btn"
            onClick={() => setShowPasswordForm(!showPasswordForm)}
          >
            {showPasswordForm ? "Cancel" : "Change Password"}
          </button>

          {showPasswordForm && (
            <form onSubmit={handleChangePassword} className="password-form">
              <input
                type="password"
                placeholder="🔑 Current Password"
                value={passwords.currentPassword}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    currentPassword: e.target.value,
                  })
                }
                required
              />
              <input
                type="password"
                placeholder="✨ New Password"
                value={passwords.newPassword}
                onChange={(e) =>
                  setPasswords({ ...passwords, newPassword: e.target.value })
                }
                required
              />
              <input
                type="password"
                placeholder="✅ Confirm New Password"
                value={passwords.confirmPassword}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    confirmPassword: e.target.value,
                  })
                }
                required
              />
              <button type="submit" className="btn save-btn">
                Save Password
              </button>
            </form>
          )}
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default Profile;

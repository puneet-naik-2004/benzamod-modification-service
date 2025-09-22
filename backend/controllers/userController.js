const User = require("../models/User");

// 🔹 GET /api/users - get all users (admin)
exports.getUser = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).select("-password");
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 🔹 GET /api/users/:id - get single user by ID (admin)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 🔹 POST /api/users - create new user (admin)
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ success: false, message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ success: false, message: "User already exists" });

    const user = await User.create({ name, email, password, role: role || "user" });

    res.status(201).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 🔹 PUT /api/users/:id - update user (admin)
exports.updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password; // hashed in pre-save middleware

    await user.save();
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 🔹 PATCH /api/users/:id/role - update user role (admin)
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (!["user", "admin"].includes(role))
      return res.status(400).json({ success: false, message: "Invalid role" });

    user.role = role;
    await user.save();

    res.json({ success: true, message: "Role updated successfully", user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 🔹 DELETE /api/users/:id - delete user (admin)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 🔹 POST /api/users/change-password - change password (private)
exports.changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // from JWT
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const { currentPassword, newPassword } = req.body;

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch)
      return res.status(400).json({ success: false, message: "Current password is incorrect" });

    user.password = newPassword; // hashed by pre-save middleware
    await user.save();

    res.json({ success: true, message: "Password changed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

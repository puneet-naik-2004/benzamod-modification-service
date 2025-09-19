


const User = require("../models/User");

// GET /api/users - get all users
exports.getUser = async (req, res) => {
  try {
    const user = await User.find().sort({ createdAt: -1 });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// DELETE /api/users/:id - delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// PUT /api/users/change-password - change password (private)
exports.changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // user id from JWT
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    const { currentPassword, newPassword } = req.body;

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Current password is incorrect" });

    user.password = newPassword; // hashed by pre-save middleware
    await user.save();

    res.json({ success: true, message: "Password changed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

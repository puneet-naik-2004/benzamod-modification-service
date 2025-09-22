const express = require("express");
const {
  getUser,
  getUserById,
  createUser,
  updateUser,
  updateUserRole,
  deleteUser,
  changePassword,
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware"); // JWT auth middleware
const router = express.Router();

// 🔹 Public / Admin protected routes
// Get all users (admin)
router.get("/", getUser);

// Get single user by ID (admin)
router.get("/:id", getUserById);

// Create new user (admin)
router.post("/", createUser);

// Update user (admin)
router.put("/:id", updateUser);

// Update only user role (admin)
router.patch("/:id/role", updateUserRole);

// Delete user by ID (admin)
router.delete("/:id", deleteUser);

// 🔹 Authenticated user route
// Change own password
router.post("/change-password", protect, changePassword);

module.exports = router;

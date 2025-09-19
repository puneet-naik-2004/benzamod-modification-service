// const express = require("express");
// const {  getUser,deleteUser} = require("../controllers/userController");
// const router = express.Router();

// // router.post("/",createContact);
// router.get("/",getUser);
// router.delete("/:id",deleteUser);


//  module.exports = router;



const express = require("express");
const { getUser, deleteUser, changePassword } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware"); // JWT auth middleware
const router = express.Router();

// Get all users
router.get("/", getUser);

// Delete a user by ID
router.delete("/:id", deleteUser);

// ✅ Change password route (private)
router.post("/change-password", protect, changePassword);

module.exports = router;

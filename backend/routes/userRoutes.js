const express = require("express");
const {  getUser,deleteUser} = require("../controllers/userController");
const router = express.Router();

// router.post("/",createContact);
router.get("/",getUser);
router.delete("/:id",deleteUser);


 module.exports = router;

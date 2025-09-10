const express = require("express");
const { createContact, getContact,deleteContact} = require("../controllers/contactController");
const router = express.Router();

router.post("/",createContact);
router.get("/",getContact);
router.delete("/:id",deleteContact);


 module.exports = router;

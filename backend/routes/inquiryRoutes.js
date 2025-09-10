// routes/inquiryRoutes.js
const express = require("express");
const {
  createInquiry,
  getInquiry,
  getInquiryById,
  deleteInquiry
} = require("../controllers/inquiryController");

const router = express.Router();

router.post("/", createInquiry);       // submit inquiry
router.get("/", getInquiry);         // get all
router.get("/:id", getInquiryById);    // get one
router.delete("/:id", deleteInquiry);  // delete

module.exports = router;

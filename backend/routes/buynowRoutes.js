const express = require("express");
const {createBuynow,} = require("../controllers/buynowController");

const router = express.Router();

router.post("/", createBuynow);       // submit inquiry

module.exports = router;

const express = require("express");
const {   createPortfolio, getPortfolio,deletePortfolio} = require("../controllers/portfolioController");
const router = express.Router();

// router.post("/",createContact);
router.post("/",createPortfolio);
router.get("/",getPortfolio);
router.delete("/:id",deletePortfolio);




 module.exports = router;

const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

router.get("/", reviewController.getReview);
router.post("/", reviewController.createReview);
// router.put("/:id", reviewController.updateReview);
// router.delete("/:id", reviewController.deleteReview);

module.exports = router;

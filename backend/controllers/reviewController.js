const Review = require("../models/Review");

// GET all products
exports.getReview = async (req, res) => {
  try {
    const review = await Review.find();
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: "Error fetching review" });
  }
};

// CREATE product
exports.createReview = async (req, res) => {
  try {
    const newReview = new Review(req.body);
    await newReview.save();
    res.json(newReview);
  } catch (err) {
    // console.log(err)
    res.status(500).json({ error: "Error adding review" });
  }
};

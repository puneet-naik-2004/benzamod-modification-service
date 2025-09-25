const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, required: true },
    description: { type: String },
    photo: { type: String },
    customer_id: { type: String },   // who added it
    product_id: { type: String },
    service_id: { type: String },
  },
  // { timestamps: true }
  
);

module.exports = mongoose.model("Wishlist", wishlistSchema);

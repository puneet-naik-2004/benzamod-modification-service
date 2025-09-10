const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true },
  description: { type: String },
  photo: { type: String },
  customer_id: { type: String },
  product_id: { type: String },
  service_id: { type: String },
});

module.exports = mongoose.model("Cart", cartSchema);

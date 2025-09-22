// models/Inquiry.js
const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
  service_id: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Inquiry", inquirySchema);

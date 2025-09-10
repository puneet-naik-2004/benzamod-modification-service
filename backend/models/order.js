const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, // or Product model if you have one
  service_id: { type: mongoose.Schema.Types.ObjectId, ref: "Service" }, // or Product model if you have one
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  address_id: { type: mongoose.Schema.Types.ObjectId }, // we’ll manually pull from user
}, { timestamps: true });

module.exports = mongoose.model("Orders", orderSchema);

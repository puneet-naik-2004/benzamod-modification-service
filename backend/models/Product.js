
// models/Service.js
const mongoose = require("mongoose");


 const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true },  // Bike or Car
  description: { type: String },
  photo: { type: String },
});


module.exports = mongoose.model("Product", productSchema);

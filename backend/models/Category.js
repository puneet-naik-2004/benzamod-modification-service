const mongoose = require("mongoose");


 const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  // price: { type: Number, required: true },
  // type: { type: String, required: true },  // Bike or Car
  description: { type: String },
  photo: { type: String },
});


module.exports = mongoose.model("Category", CategorySchema);

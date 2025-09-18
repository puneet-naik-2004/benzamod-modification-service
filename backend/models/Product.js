// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   price: { type: Number, required: true },
//   type: { type: String, required: true },
//   description: { type: String },
//   photo: { type: String },
//  vehicleType: {type: String, required: true},
 
// });

// module.exports = mongoose.model("Product", productSchema);





const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true }, // e.g. Wraps, Exhausts, Lights, Seats
  description: { type: String },
  photo: { type: String },
  vehicleType: { type: String, required: true }, // Bike / Car

  // ✅ New optional fields for brands
  bikeBrand: { type: String, default: null }, 
  carBrand: { type: String, default: null },
});

module.exports = mongoose.model("Product", productSchema);

const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, required: true },       // category
    vehicleType: { type: String, required: true, enum: ["Car", "Bike"] }, // Car or Bike
    description: { type: String },
    photo: { type: String },
  },
  { timestamps: true } // optional, adds createdAt and updatedAt
);

module.exports = mongoose.model("Service", ServiceSchema);
